const userModel = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const jwt = require('jsonwebtoken');

/*
 * - User Register Controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {
    try {
        const { name, email, password, role, phone } = req.body;

        const isExists = await userModel.findOne({ email });

        if (isExists) {
            return res.status(422).json({
                message: 'User already exists with this email',
                status: 'failed'
            });
        }

        const user = await userModel.create({ name, email, password, role, phone });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.cookie('token', token);

        return res.status(201).json({
            message: 'Successfully registered',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - User Login Controller
 * - POST /api/auth/login
 */
async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Email or password is invalid' });
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email or password is invalid' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Your account has been deactivated' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

        res.cookie('token', token);

        return res.status(200).json({
            message: 'Successfully logged in',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - User Logout Controller
 * - POST /api/auth/logout
 */
async function userLogoutController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No token found' });
        }

        await blacklistModel.create({ token });

        res.clearCookie('token');

        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/*
 * - Get Current User Controller
 * - GET /api/auth/me
 */
async function getMeController(req, res) {
    try {
        return res.status(200).json({
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                phone: req.user.phone
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController,
    getMeController
};

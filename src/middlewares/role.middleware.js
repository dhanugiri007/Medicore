function roleMiddleware(...roles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Only ${roles.join(', ')} can access this route`
            });
        }

        next();
    };
}

const isAdmin = roleMiddleware('admin');
const isDoctor = roleMiddleware('doctor');
const isPatient = roleMiddleware('patient');
const isAdminOrDoctor = roleMiddleware('admin', 'doctor');

module.exports = { roleMiddleware, isAdmin, isDoctor, isPatient, isAdminOrDoctor };

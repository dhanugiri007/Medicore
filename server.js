require('dotenv').config();
require('dns').setServers(['8.8.8.8'],['8.8.4.4']);

const app = require('./src/app');
const connectDB = require('./src/config/db');
const port = process.env.PORT;

connectDB();
app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});
const mongoose = require('mongoose');
const config = require('../config/config');

const connectDatabase = async () => {
    // make a mongo connection
    await mongoose.connect(
        config.mongo.url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then(() => {
        console.log('Connected to database');
    });
}

module.exports = connectDatabase;
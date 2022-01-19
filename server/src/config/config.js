const { config } = require("dotenv");

config();

module.exports = {
    port: parseInt(process.env.PORT) || 5000,
    host: process.env.HOST || "localhost",
    origin: process.env.ORIGIN_URL,
    mongo: {
        url: process.env.DB_URL,
    },
    jwt: {},
}

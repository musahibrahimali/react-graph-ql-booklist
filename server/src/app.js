const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require('cors');
const http = require('http');
const config = require("./config/config");
const connectDatabase = require("./database/database");
// the app routes
const appRoutes = require("./routes/app.routes");
const helmet = require('helmet');

// create an http server
const app = express();
// create a server instance
const server = http.createServer(app);

// middleware
app.use(cookieParser());
app.use(cors({
    origin: config.origin,
}));
app.use(helmet());

//routes
app.use(appRoutes);

// connect to database
connectDatabase();

//start server
const port = config.port;
const host = config.host;
const application = server.listen(port, () => {
    const { port } = application.address();
    console.log(`Server is listening at ${host} on port ${port} -> (http://localhost:${port})`);
})

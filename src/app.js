const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')
const port = 3010;
const path = require("path")
const fs = require("fs");

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
var corOptions = {
    origin: "*",
};

app.use(cors(corOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const departmentRouters = require('./routers/departmentRouters');
const employeeRouters = require('./routers/employeeRouters');

const publicPath = path.join(__dirname, '../src/public/');
if (!fs.existsSync(publicPath)) {
    fs.promises.mkdir(publicPath);
}

app.use("/api/v1", departmentRouters, employeeRouters);

app.listen(port, () => {
    return console.log("Server is running on port " + port);
});
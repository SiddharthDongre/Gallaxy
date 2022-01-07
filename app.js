const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config/keys");

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(MONGOURI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

mongoose.connection.on("connected", () => {
    console.log("We are connected");
})

mongoose.connection.on("error", (err) => {
    console.log("mongodb connection error");
})

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,"client","build","index.html"));
    });
}

// Server
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});

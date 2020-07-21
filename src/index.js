//models
require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//routes
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
//middleware
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
    "mongodb+srv://paul:timormortis@cluster0.5nq7f.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (e) => {
    console.log(`Error connecting to MDB ${e}`);
});
app.get("/", requireAuth, (req, res) => {
    res.send(`You email:${req.user.email}`);
});

app.listen(3000, () => {
    console.log("listening on port 3000!");
});

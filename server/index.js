require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { json } = require("body-parser");
const session = require("express-session");
const port = 3000;

const authController = require("./controllers/auth_controller");
const checkSession = require("./middlewares/checkForSession");
const swagController = require("./controllers/swag_controller");
const cartController = require("./controllers/cart_controller");
const search = require("./controllers/search_controller");

app.use(json());
app.use(cors());
app.use(express.static("/build"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkSession);
app.use(express.static("/build"));

app.get("/api/swag", swagController.read);

app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

app.post("/api/cart", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);
app.delete("/api/cart", cartController.delete);

app.get("/api/search", search.search);

app.listen(port, () => {
  console.log(`Hello Daddy I am listening on ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const oauthRouter = require("./routes/oauth/authRoutes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const passport = require("passport");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const session = require("express-session");
require("dotenv").config();
require("./controllers/oauth/passport"); // Import Passport configuration
const app = express();
const commonFeatureRouter = require("./routes/common/feature-routes");
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set true if using HTTPS
  })
);

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect("mongodb://localhost:27017/shopvibe")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));


const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/oauth", oauthRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));

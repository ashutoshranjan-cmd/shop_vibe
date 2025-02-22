const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testemail23mca20049@gmail.com",
    pass: "uizq ljuv sqvg hkqv",
  },
});

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    const result = await newUser.save();
    if (result) {
      const mailOptions = {
        from: ' "shop vibe" testemail23mca20049@gmail.com',
        to: email,
        subject: "Welcome to Shop vibe",
        html: `
             <div style="background-image: url('https://via.placeholder.com/1600x400'); background-size: cover; padding: 40px; text-align: center; color: white;">
  <h1>Welcome to Shop Vibe!</h1>
  <p>Thank you for joining us at Shop Vibe! Your ultimate shopping destination.</p>
</div>

<div style="text-align: center; margin-top: 40px; padding: 20px;">
  <p>At Shop Vibe, we're dedicated to offering the best products and deals for you!</p>
  <img src="cid:unique@shopvibe.image" alt="Shop Vibe Image" style="width: 300px; height: auto; border-radius: 10px;">
</div>

              `,
        // attachments: [
        //   {
        //     filename: 'welcome-image.jpg',
        //     path: result.profile,  // Update with the correct path to your image
        //     cid: 'unique@learnigo.image' // Same as used in the 'img' tag in the HTML
        //   }
        // ]
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      // Send a success response
      // res.status(201).json({ user, token });
      res.status(200).json({
        success: true,
        message: "Registration successful",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };

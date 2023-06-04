const User = require("../model/User");
const {
  validateReg,
  validateSign,
  validateRefreshToken,
  isRefreshTokenAssoWithUser,
} = require("../utility/validator");
const bcrypt = require("bcrypt");
const { isEmpty, get } = require("lodash");
const { getToken } = require("../utility/util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { user_EMAIL, pass_PASS } = require("../utility/key");
const Refresh = require("../model/Refresh");
const jwt = require("jsonwebtoken");

exports.isReady = async (req, res) => {
  res.status(200).json({ data: true });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.cookies;
  const { accessToken } = req.cookies;

  if (refreshToken == null) {
    return res.json({
      err: true,
      msg: null,
    });
  }

  const user = await validateRefreshToken(refreshToken);

  if (!user) {
    return res.json({
      err: true,
      msg: null,
    });
  }

  const isValide = await isRefreshTokenAssoWithUser(refreshToken, user);

  if (!isValide) {
    return res.json({
      err: true,
      msg: "",
    });
  }

  res.json({
    err: false,
    msg: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  const del = await Refresh.deleteOne({ token: refreshToken });

  res.clearCookie("refreshToken", { sameSite: "none", secure: true });
  res.clearCookie("accessToken", { sameSite: "none", secure: true });

  res.json({
    err: false,
    msg: null,
  });
};

exports.signin = (req, res) => {
  let err = {};

  validateSign(err, req).then((err) => {
    if (!isEmpty(err)) {
      res.json({ err: true, msg: err });
    } else {
      User.findOne({
        email: req.body.email,
      }).then(async (user) => {
        const log = await bcrypt.compare(req.body.password, user.password);

        if (log) {
          const { refreshToken, accessToken } = getToken(user);
          res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });

          try {
            const tk = await Refresh.create({
              token: refreshToken,
              userId: user.id,
            });
          } catch (e) {
            err["msg"] = "Error try again later";
            return res.json({ err: true, msg: err });
          }
          res.json({
            err: false,
            msg: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        } else {
          err["msg"] = "invalide password";
          res.json({ err: true, msg: err });
        }
      });
    }
  });
};
exports.check = (req, res) => {
  res.json({ msg: "dhddjdj" });
};
exports.register = async (req, res) => {
  let err = {};
  const salt = await bcrypt.genSalt(10);
  const newpass = await bcrypt.hash(req.body.password, salt);

  validateReg(err, req).then((errr) => {
    if (!isEmpty(err)) {
      res.json({ err: true, msg: err });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: newpass,
      });

      user.save().then((newuser) => {
        if (newuser) {
          res.json({
            err: false,
            msg: {
              id: newuser.id,
              name: newuser.name,
              email: newuser.email,
              token: getToken(user),
            },
          });
        } else {
          err["password"] = "invalide password";
          res.json({ err: true, msg: err });
        }
      });
    }
  });
};

exports.forget = async (req, res) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      res.json({ err: true, msg: "invalide email" });
    } else {
      const token = crypto.randomBytes(20).toString("hex");

      user.update({
        resetToken: token,
        resetDate: Date.now() + 36000,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: user_EMAIL,
          pass: pass_PASS,
        },
      });

      const mailOption = {
        from: user_EMAIL,
        to: `${req.body.email}`,
        subject: "Passward reset link",
        text: `Link\n\n` + `http://localhost:3000/reset/${token}`,
      };

      transporter.sendMail(mailOption, (err, response) => {
        if (err) {
          res.json({ err: true, msg: "Try later" });
        } else {
          res.json({ err: false, msg: "mail send" });
        }
      });
    }
  });
};

exports.verifyToken = async (req, res) => {
  User.findOne({
    resetToken: req.params.token,
    resetDate: {
      $gt: Date.now(),
    },
  }).then((user) => {});
};

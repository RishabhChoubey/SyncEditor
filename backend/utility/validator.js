const { Promise } = require("mongoose");
const { resolve } = require("path");
const validator = require("validator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Refresh = require("../model/Refresh");
const { reject } = require("lodash");

const emailValidate = (err, req) => {
  console.log("email", req.body.email);
  if (!validator.isEmail(req.body.email)) {
    err["email"] = "use valid email";
  }
};

exports.validateReg = async (err, req) => {
  return new Promise((resolve, reject) => {
    emailValidate(err, req);
    userNameValidate(err, req);
    return User.findOne({ email: req.body.email }).then((res) => {
      if (res) {
        err["email"] = "user with email exist";
      }
      resolve(err);
    });
  });
};

exports.validateSign = async (err, req) => {
  return new Promise((resolve, reject) => {
    console.log(req.body);
    emailValidate(err, req);

    return User.findOne({ email: req.body.email }).then((res) => {
      if (!res) {
        err["email"] = "user not exist";
      }
      resolve(err);
    });
  });
};

const userNameValidate = (err, req) => {
  User.findOne({ name: req.body.name }).then((res) => {
    if (res) {
      err["user"] = "username already exit ";
    }
  });
};

exports.validateRefreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    const user = jwt.verify(refreshToken, process.env.REFRESHKEY);
    resolve(user);
  });
};

exports.isRefreshTokenAssoWithUser = async (refreshToken, user) => {
  const isPresent = await Refresh.findOne({
    token: refreshToken,
    userId: user.id,
  });
  console.log(JSON.stringify(isPresent) + "  is valide");
  return isPresent;
};

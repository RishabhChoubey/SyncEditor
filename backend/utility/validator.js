const { Promise } = require("mongoose");
const { resolve } = require("path");
const validator = require("validator");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const Refresh = require("../model/Refresh");
const { reject } = require("lodash");

const emailValidate = (err, req) => {
  if (!validator.isEmail(req.body.email)) {
    err["email"] = "use valide email";
  }
};

exports.validateReg = async (err, req) => {
  return new Promise(async (resolve, reject) => {
    emailValidate(err, req);
    await userNameValidate(err, req);
    return User.findOne({ email: req.body.email }).then((res) => {
      if (res) {
        err["email"] = "user with email exist";
      }
      console.log(err);
      resolve(err);
    });
  });
};

exports.validateSign = async (err, req) => {
  return new Promise((resolve, reject) => {
    emailValidate(err, req);

    return User.findOne({ email: req.body.email }).then((res) => {
      if (!res) {
        err["email"] = "user not exist";
      }
      resolve(err);
    });
  });
};

const userNameValidate = async (err, req) => {
  const user = await User.findOne({ name: req.body.name });
  if (user) err["user"] = "username already exit";
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

  return isPresent;
};

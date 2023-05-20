const jwt = require("jsonwebtoken");
const Document = require("../model/Document");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.SECRETKEY
  );
};
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token.slice(7, token.length),
      process.env.SECRETKEY,
      (err, decode) => {
        if (err) {
          return res.json({ err: true, msg: { token: "invalid token" } });
        }
        req.user = decode;
        next();
        return;
      }
    );
  } else {
    return res.json({ err: true, msg: { token: "login first" } });
  }
};
const isAuthSocket = (token) => {
  let user = null;
  console.log(token, " token");
  if (token) {
    jwt.verify(token, "abcdefghijk", (err, decode) => {
      if (err) {
        return false;
      }
      user = decode;
      console.log(user, " decode");
      return user;
    });
  } else {
    return user;
  }
};


const getUserCreatedDocument = async (documentId) => {
  const document = await Document.findOne({
    _id: documentId,
  });

  return document;
};
const isValide = (document) => {
  console.log(document);
  const curDate = new Date();
  if (document.expireAt < curDate) return false;
  return true;
};
const createOrGetDocument = async (documentId, userid, participant) => {
  console.log(documentId, " doc");
  if (documentId == null) return;

  const document = await Document.findOne({
    _id: documentId,
    guestId: participant,
  });

  if (document) return document;

  return await Document.create({
    _id: documentId,
    data: "",
    userId: userid,
    guestId: participant,
  });
};

module.exports = { getToken, isAuth, isAuthSocket,isValide,createOrGetDocument,getUserCreatedDocument };

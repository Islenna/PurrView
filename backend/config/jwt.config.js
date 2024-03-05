const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    console.log("JWT Token:", req.cookies.usertoken);
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            res.status(401).json({ verified: false });
        } else {
            req.user = payload;
            next();
        }
    });
};
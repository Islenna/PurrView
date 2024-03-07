const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' from the beginning
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                res.status(401).json({ verified: false });
            } else {
                req.user = payload;
                next();
            }
        });
    } else {
        res.status(401).json({ verified: false });
    }
};

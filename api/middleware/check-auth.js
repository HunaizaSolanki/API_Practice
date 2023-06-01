const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token);
        const verify = jwt.verify(token, 'Testing')
        if (verify.userType == 'Admin') {
            next()
        }
        else {
            return res.status(401).json({
                msg: "You're not an admin"
            })
        }
    } 
    catch (error) {
        return res.status(401).json({
            msg: "Invalid Token"
        })
    }
}
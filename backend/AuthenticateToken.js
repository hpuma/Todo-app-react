import jwt from "jsonwebtoken";

// Included in one of the parameters that needs a current valid log in.
function AuthenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user
        next();
    })
}

export default AuthenticateToken;
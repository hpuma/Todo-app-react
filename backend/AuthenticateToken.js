import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "/public-testing-env.js";
// Included in one of the parameters that needs a current valid log in.
export function AuthenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user
        next();
    })
}

export default AuthenticateToken;
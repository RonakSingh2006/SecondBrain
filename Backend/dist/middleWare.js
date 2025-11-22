import jwt, {} from "jsonwebtoken";
export function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(403).send("Not logged In");
    }
    if (auth.split(" ")[0] !== 'Bearer') {
        return res.status(400).send("Invalid Authorization");
    }
    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env["JWT_SECRET"]);
        req.userId = decoded["id"];
        next();
        return;
    }
    catch (err) {
        return res.status(403).send("Invalid Token");
    }
}
//# sourceMappingURL=middleWare.js.map
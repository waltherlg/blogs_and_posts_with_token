import {NextFunction, Request, Response} from "express";


export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send("Unauthorized")
    }
    const authType = authHeader.split(' ')[0]
    if (authType !== 'Basic') return res.sendStatus(401)
    let auth =  Buffer.from(authHeader.split(' ')[1],
        'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];
    if (!(user == 'admin' && pass == 'qwerty')) {
        return res.status(401).send("Unauthorized")
    }
    return next()
}
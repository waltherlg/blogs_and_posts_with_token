import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {RequestWithBody} from "../models/types";
import {userAuthModel} from "../models/users-models";
import {jwtService} from "../application/jwt-service";

export const authRouter = Router({})

authRouter.post('/login',
    async (req: RequestWithBody<userAuthModel>, res: Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if(user){
            const token = await jwtService.createJWT(user)
            res.status(204).send(token)
        }
        else res.sendStatus(401)
    })
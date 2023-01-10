import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {RequestWithBody} from "../models/types";
import {userAuthModel} from "../models/users-models";

export const authRouter = Router({})

authRouter.post('/login',
    async (req: RequestWithBody<userAuthModel>, res: Response) => {
    const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if(checkResult){
            res.sendStatus(204)
        }
        else res.sendStatus(401)
    })
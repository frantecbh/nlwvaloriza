import {Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, respnse: Response, next: NextFunction ){

  const { user_id } = request
 

  const userRepositories = getCustomRepository(UserRepositories)

  const { admin } = await userRepositories.findOne(user_id)

  //const admin =  true;

  if(admin){
    return next()
  }

  return respnse.status(401).json({
    error: "User is not admin"
  })
}
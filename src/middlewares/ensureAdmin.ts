import {Request, Response, NextFunction} from "express"

export function ensureAdmin(request: Request, respnse: Response, next: NextFunction ){
  const admin =  true;

  if(admin){
    return next()
  }

  return respnse.status(401).json({
    error: "User is not admin"
  })
}
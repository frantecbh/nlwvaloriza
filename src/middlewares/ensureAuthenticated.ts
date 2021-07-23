import {Request, Response, NextFunction, response} from "express"
import {verify} from 'jsonwebtoken'

interface Ipayload {
  sub: string;
}
export function ensureAuthenticated(request: Request, respnse: Response, next: NextFunction ){

  //receber o tocken
  const authtoken = request.headers.authorization

  if(!authtoken){
    return response.status(401).end()
  }

  //validar se tocken esta preenchido

  const [,token] = authtoken.split(" ")

  try {
//validar se tocken é valido
    const { sub } =  verify(token, "f039c38150382af2267c0f6249bc6cb8") as Ipayload;
  //recuperar informações do usuario
    request.user_id = sub
    
    return next()
  
    
  } catch (error) {

    return response.status(401).end()
    
  }

 

  



 
}
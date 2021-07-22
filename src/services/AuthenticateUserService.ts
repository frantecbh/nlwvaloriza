import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import { Subject } from "typeorm/persistence/Subject"

interface IAutheticateRequest {
  email: string,
  password: string;
}

class AuthenticateUserService{

  async execute({email, password}: IAutheticateRequest){
  
    //verificar se email existe
    const userRepositories = getCustomRepository(UserRepositories)

    const user = await userRepositories.findOne({
      email
    })

    if(!user){
      throw new Error("Email/Passowrd incorrect!")
    }
    
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Email/Passowrd incorrect!")
    }

    const token = sign({
      email: user.email
    },"f039c38150382af2267c0f6249bc6c",
    {
      subject: user.id,
      expiresIn: "1d"
    })

    return token

  }

}

export { AuthenticateUserService }
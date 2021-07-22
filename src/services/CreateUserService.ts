import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

interface IUserRequest{
    name:string;
    email:string;
    password: string;
    admin?: boolean;
}

class CreateUserService{

    async execute({name, email, admin = false, password}: IUserRequest){
        const usersRepository = getCustomRepository(UserRepositories)

        if(!email){
            throw new Error("Email incorrect")
        }
        const userAlreadyexists = await usersRepository.findOne({
            email
        })

        if(userAlreadyexists){
            throw new Error("User already existis")
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: passwordHash,
            admin
        })

        await usersRepository.save(user)

        return(user)
    }

}

export { CreateUserService }
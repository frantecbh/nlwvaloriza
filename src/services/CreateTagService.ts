import { getCustomRepository } from "typeorm"
import { TagRepositories } from "../repositories/TagsRepositories"



class CreateTagService{

    async execute(name: string){

        const tagsRepositries = getCustomRepository(TagRepositories)

        if(!name){
            throw new Error ("Incorrect name")
        }

        const tagAlreadyExists = await tagsRepositries.findOne({
            name
        })

        if(tagAlreadyExists){
            throw new Error ("tag already exists")
        }

        const tag = tagsRepositries.create({
            name
        })

        await tagsRepositries.save(tag)
        return(tag)

    }
        
}

export { CreateTagService }
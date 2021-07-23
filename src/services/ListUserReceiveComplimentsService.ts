import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"



class ListUserReciveComplimentsService {
  async execute(user_id: string){

    const complientRepositorioes = getCustomRepository(ComplimentsRepositories)

    const compliments =  await complientRepositorioes.find({
      where:{
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag" ]
    })

    return compliments;


  }
}

export { ListUserReciveComplimentsService}
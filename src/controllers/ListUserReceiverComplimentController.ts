import { Request, Response } from "express";
import { ListUserReciveComplimentsService } from "../services/ListUserReceiveComplimentsService";


class ListUserReceiverComplimentsController {

  async handle(request: Request, response: Response){

    const { user_id } = request;

    const listUserRceiveCompliementsServices = new ListUserReciveComplimentsService()

    const compliments = await listUserRceiveCompliementsServices.execute(user_id)
    
    return response.json(compliments)
  }

}

export { ListUserReceiverComplimentsController}
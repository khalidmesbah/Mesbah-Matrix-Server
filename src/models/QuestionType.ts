import { ObjectId } from "mongodb";
export default class QuestionType {
  constructor(public text: string, public _id?: ObjectId) {}
}

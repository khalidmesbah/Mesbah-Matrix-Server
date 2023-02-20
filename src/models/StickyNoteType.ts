import { ObjectId } from "mongodb";
export default class NoteType {
  constructor(public text: string, public _id?: ObjectId) {}
}

import { ObjectId } from "mongodb";
export default class RememberType {
  constructor(
    public text: string,
    public done: boolean,
    public _id?: ObjectId
  ) {}
}

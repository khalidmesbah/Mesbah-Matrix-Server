import { ObjectId } from "mongodb";
export default class DailyTaskType {
  constructor(
    public text: string,
    public done: boolean,
    public _id?: ObjectId
  ) {}
}

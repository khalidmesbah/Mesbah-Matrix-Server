// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class TaskType {
  constructor(
    public name: string,
    public order: number,
    public _id: ObjectId
  ) {}
}

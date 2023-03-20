// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class Bookmark {
  constructor(public name: string, public url: string, public _id: ObjectId) {}
}

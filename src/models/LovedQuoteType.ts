import { ObjectId } from "mongodb";
export default class LovedQuoteType {
  constructor(public text: string, public _id?: ObjectId) {}
}

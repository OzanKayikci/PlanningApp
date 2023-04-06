import { Base } from "../baseAbstracts/Base";
import { Parent } from "../baseAbstracts/Parent";
import { ListBuilder } from "./listBuilder";

export default class List extends Parent {
  constructor(builder: typeof ListBuilder.prototype) {
    super(builder);
  }
}

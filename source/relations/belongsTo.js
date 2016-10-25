import {Api} from "../api";
import {map} from "../map";
import {Avid} from "../avid";

export class BelongsTo {
  constructor(parent, child) {
    this.child = child;
    this.parent = new parent;
    this.api = new Api(this.parent.resource, this.parent.prefix);

    this.relationAccessor = this.parent.constructorName.toLowerCase();
    if (this.child.properties.hasOwnProperty(this.relationAccessor)) {
      this.relationValue = this.child.properties[this.relationAccessor];
    }
  }

  then(callback) {
    var self = this;
    if (typeof this.relationValue !== 'undefined') {
      return map(self.parent, self.relationValue).then(callback);
    }
    var relation = [self.parent.constructorName.toLowerCase(), "id"].join('_');
    return self.api.find(self.child[relation]).then(callback);
  }
}

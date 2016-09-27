export class ModelProxy {

  static get accessibleMethods() {
    return ['all', 'find', 'save'];
  }

  static get accessibleProperties() {
    return ['resource', 'properties', 'constructorName', 'hasChanged'];
  }

  static get accessible() {
    return ModelProxy.accessibleProperties.concat(ModelProxy.accessibleMethods);

  }

  constructor(model) {
    var self = this;
    model.hasChanged = false;
    return new Proxy(model, {
      get: function (target, name, receiver) {
        if (self.isRelation(target, name)) return target[name]();
        if (self.canAccessProperty(name)) return target[name];
        if (name === 'proxify') return receiver;

        return target.properties[name];
      },
      set: function (target, name, value) {
        target.hasChanged = true;
        target.properties[name] = value;
        return true;
      }
    });
  }

  canAccessProperty(name) {
    var self = this;
    return ModelProxy.accessible.indexOf(name) >= 0;
  }

  isRelation(target, name) {
    var self = this;
    return typeof target[name] === 'function' && ModelProxy.accessibleMethods.indexOf(name) === -1;
  }
}

export function modelProxy(model) {
  return new ModelProxy(model);
}

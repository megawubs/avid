import {expect, assert} from 'chai';
import {Avid} from "../../source/avid";
import {User} from "./models/user";

beforeEach(function () {
  Avid.baseUrl = 'http://framework.dev';
  Avid.storage = {}
});
window.avidItems = {};
describe('Prefill ', () => {
  it('should not make a http request ', () => {
    avidItems["user"] = [{
      id: 1,
      name: 'Megawubs',
      email: 'mega@wubs.com'
    }];

    Avid.fill();

    return User.all().then(users => {
      assert.equal(1, users.length);
    });
  });

  it('should not make a http request when requested id is in storage ', () => {
    avidItems["user"] = [{
      id: 600000,
      name: 'Megawubs',
      email: 'mega@wubs.com'
    }];

    Avid.fill();

    return User.find(600000).then(user => {
      assert.equal(user.id, 600000);
    })
  });
});

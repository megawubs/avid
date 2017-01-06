Avid
==========
API consumption on fire, inspired by Laravel's Eloquent

### Installation
For now, this module only works inside a laravel installation.

```Shell
$ yarn install @megawubs/avid
```

### Usage

This wrapper expects a certain api design. The name of the model you create is automatically mapped to an api endpoint.
Let's say we have a `User` model, by default Avid will generate a resource uri of `/api/v1/user`, expecting an json array of all user objects

A Avid model is defined like this:

```JavaScript
import {Avid} from "@megawubs/avid"

export class User extends Avid{
    get _version(){
        return 'v1'
    }
    
    get _name(){
        return 'user'
    }
    
    posts(){
        return this.hasMany(Post, 'posts');
    }
}

export class Post extends Avid{
    get _version(){
        return 'v1'
    }
    
    get _name(){
        return 'post'
    }

    user(){
        return this.belongsTo(User);
    }
}

User.find(1) //model fetched from api
.then(user => user.posts) //fetch relations from api
.then(posts => console.log(posts)); //log relations

Post.find(1) //model fetched from api
.then(post => post.user) //fetch relation from api
.then(post => console.log(post)); //log relation

 let user = new User(); //new up a user

user.name = 'John'
user.email = 'do@john.com'
user.email = 'secret'
 user.save()
 .then(user => console.log(user.id)); //1 (saved user through the API)

 User.find(1).then(user => {
 user.name = 'jane'
 user.email = 'do@jane.com'
 return user.save();
 }).then(updatedUser => console.log(updatedUser.name)); //jane
```

Testing
=======
To run the tests you need to have docker and docker-compose installed. When you have both run `docker-compose up` in the project root and navigate your browser to `http://localhost:8001` to run and see the tests
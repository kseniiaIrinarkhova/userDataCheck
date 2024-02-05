// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };
}

console.log(central(1));


class Company{
    constructor(company){
        if('name' in company) this.name = company.name
        if('catchPhrase' in company) this.catchPhrase = company.catchPhrase
        if('bs' in company) this.bs = company.bs
    }
}
class Geo{
    constructor(lat, lng){
        this.lat = lat
        this.lng = lng
    }
}


class Address{
    constructor(address){
        if ('street' in address) this.street = address.street
        if ('suite' in address)  this.suite = address.suite
        if ('city' in address) this.city = address.city
        if ('zipcode' in address) this.zipcode = address.zipcode
        if ('geo' in address) this.geo = new Geo(address.geo.lat, address.geo.lng)
    }
}

class Person {
    constructor(id, person){
        this.id = id
        if('name' in person) this.name = person.name
        this.username = person.username
        if ('email' in person) this.email = person.email
        if ('address' in person) this.address = new Address(person.address)
        if ('phone' in person) this.phone = person.phone
        if ('website' in person) this.website = person.website
        if ('company' in person) this.company = new Company(person.company)
    }
}

central(1).then((returnedValue) => {
    console.log(returnedValue)
    db1(1).then((userInfo) => {
    let user = new Person(1,userInfo)
    console.log(user)
    })
})
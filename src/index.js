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
        this.name = company.name
        this.catchPhrase = company.catchPhrase
        this.bs = company.bs
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
        this.street = address.street
        this.suite = address.suite
        this.city = address.city
        this.zipcode = address.zipcode
        this.geo = new Geo(address.geo.lat, address.geo.lng)
    }
}

class Person {
    constructor(id, name, username, email, address, phone, website,company){
        this.id = id
        this.name = name
        this.username = username
        this.email = email
        this.address = new Address(address)
        this.phone = phone
        this.website = website
        this.company = new Company(company)
    }
}
// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";
/*********************************************************
 * Classes
 *********************************************************/
class Company {
    constructor(company) {
        if ('name' in company) this.name = company.name
        if ('catchPhrase' in company) this.catchPhrase = company.catchPhrase
        if ('bs' in company) this.bs = company.bs
    }
}
class Geo {
    constructor(lat, lng) {
        this.lat = lat
        this.lng = lng
    }
}


class Address {
    constructor(address) {
        if ('street' in address) this.street = address.street
        if ('suite' in address) this.suite = address.suite
        if ('city' in address) this.city = address.city
        if ('zipcode' in address) this.zipcode = address.zipcode
        if ('geo' in address) this.geo = new Geo(address.geo.lat, address.geo.lng)
    }
}

class Person {
    constructor(id, personalInfo, openInfo) {
        this.id = id
        if (personalInfo) {
            if ('name' in personalInfo) this.name = personalInfo.name
            if ('email' in personalInfo) this.email = personalInfo.email
            if ('address' in personalInfo) this.address = new Address(personalInfo.address)
            if ('phone' in personalInfo) this.phone = personalInfo.phone
        }
        if (openInfo) {
            if ('username' in openInfo) this.username = openInfo.username
            if ('website' in openInfo) this.website = openInfo.website
            if ('company' in openInfo) this.company = new Company(openInfo.company)
        }


    }
    addPersonalInfo(personalInfo) {
        if ('name' in personalInfo) this.name = personalInfo.name
        if ('email' in personalInfo) this.email = personalInfo.email
        if ('address' in personalInfo) this.address = new Address(personalInfo.address)
        if ('phone' in personalInfo) this.phone = personalInfo.phone
    }
    addOpenInfo(openInfo) {
        if ('username' in openInfo) this.username = openInfo.username
        if ('website' in openInfo) this.website = openInfo.website
        if ('company' in openInfo) this.company = new Company(openInfo.company)
    }
}
/**************************************************************** */


/**
 * Function to get information about user with promises
 * @param {number} id 
 * @returns Promise that contain Person object
 */

//getUserData with promises
function getUserData(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    };
    try {
        return central(id)
            .then((dbinfo, reject) => {
                try {
                    return Promise.all([dbs[dbinfo](id), vault(id)])
                }
                catch (err) {
                    console.log("reject 1")
                    reject(err)
                }
            })
            .then((results, reject) => {
                try {
                    const user = new Person(id);
                    user.addOpenInfo(results[0]);
                    user.addPersonalInfo(results[1]);
                    return user;
                }
                catch (err) {
                    console.log("reject 2")
                    reject(err)
                }

            })
            .catch((err) => {
                console.log("reject 3")
                throw `Error for user ID: ${id}: ${err}`;
                //console.log(`Error for user ID: ${id}: ${err}`)

            })
    } catch (error) {
        reject(error)
    }
}


central(1).then((returnedValue) => {
    //console.log(returnedValue)
    db1(1).then((userInfo) => {
        let user = new Person(1, {}, userInfo)
        //console.log(user)

    })
    vault(1).then((userInfo) => {
        let user = new Person(1, userInfo)
        // console.log(user)
    })
})

console.log("****************************************")

getUserData(1).then((user) => { console.log(user) })
    .catch((err) => console.log(err))

getUserData(11).then((user) => { console.log(user) })
    .catch((err) => console.log(err))

getUserData("one").then((user) => { console.log(user) })
    .catch((err) => console.log(err))
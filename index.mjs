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
    //to have an opportunity to get the object or exception message use try/catch
    try {
        //try to get data
        //try  to find id in central db
        return central(id)
        //if id exists do next promises
            .then((dbinfo, reject) => {

                try {
                    //try to get both information from dbs and vault
                    return Promise.all([dbs[dbinfo](id), vault(id)])
                }
                catch (err) {
                    //if any of functions rejects - the whole result would be rejected
                    reject(err)
                }
            })
            //if we find all information about user with id create an object
            .then((results, reject) => {
                try {
                    //try to create an object
                    const user = new Person(id);
                    //add information from db
                    user.addOpenInfo(results[0]);
                    //add information from vault
                    user.addPersonalInfo(results[1]);
                    //return user
                    return user;
                }
                catch (err) {
                    //send the error if it occurs
                    reject(err)
                }

            })
            //if there is some errors occured when we tried to get information - throw the exception
            .catch((err) => {
                throw `Error for user ID: ${id}: ${err}`;
            })
    } catch (error) {
        //if we faced with exception - return reject status, don't create a Person object
        reject(error)
    }
}

//**test code */
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
//**    */

console.log("****************************************")

getUserData(1).then((user) => { console.log(user) })
    .catch((err) => console.log(err))

getUserData(11).then((user) => { console.log(user) })
    .catch((err) => console.log(err))

getUserData("one").then((user) => { console.log(user) })
    .catch((err) => console.log(err))
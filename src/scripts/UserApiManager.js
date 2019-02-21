import contactComponentBuilder from "./Contact.js"


const loginManager = {
    postNewUser: function(userObject) {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(userObject)
        })

    },
    loginUser: function(username) {
        return fetch(`http://localhost:8088/users?username=${username}`)
        .then(response => response.json())
    },
    retrieveUserContacts: function() {
        return fetch(`http://localhost:8088/contacts?${userID}`, {})
        .then(results => results.json())
        .then((parsedResponse) => {
            parsedResponse.forEach(contact => {
                contactComponentBuilder(contact.name, contact.phone, contact.address);
            })

        })

    }
}

export default loginManager;
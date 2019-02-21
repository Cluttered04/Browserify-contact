// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.


import contactManager from "./ContactCollection.js";
import contactComponentBuilder from "./Contact.js";

const printAllContacts = () => {
    const userId = sessionStorage.getItem("userId");
    contactManager.loadContact(userId)
    .then((parsedResponse) => {
        parsedResponse.forEach((contact) => {
            contactComponentBuilder(contact.name, contact.phone, contact.address)
        })
    })
}

export default printAllContacts;
// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component (event listener on submit button).

import contactManager from "./ContactCollection.js"
import printAllContacts from "./ContactList.js";

const contactForm = {
    printsToDom: function() {
        document.querySelector("#contact-form").innerHTML = `<input type="text" id="name-input"><input type="text" id="phone-input"><input type="text" id="address-input"><button id="submit-button">Submit</button>`
    },
    submitClick: function() {
        document.querySelector("#contact-form").addEventListener("click", () => {
            if(event.target.id === "submit-button"){
            const contactName = document.querySelector("#name-input").value;
            const contactPhone = document.querySelector("#phone-input").value;
            const contactAddress = document.querySelector("#address-input").value;

            const contactObject = {
            name: contactName,
            phone: contactPhone,
            address: contactAddress,
            userId: sessionStorage.getItem("userId")
        }

        console.log(contactObject);
            contactManager.saveContact(contactObject);
            document.querySelector("#contact").innerHTML = "";
            printAllContacts();
        }})}

}


export default contactForm;



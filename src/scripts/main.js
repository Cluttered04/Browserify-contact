// In main.js, import the ContactList component and the ContactForm component.

// The user should see the contact form at the top of the view, and the list of contacts underneath it.

import printAllContacts from "./ContactList.js"
import contactForm from "./ContactForm.js";
import buildUserLogin from "./LoginForm.js";
import userClickEvents from "./UserEventListeners.js";

buildUserLogin();
userClickEvents.registerEvent();
userClickEvents.logInEvent();
userClickEvents.logOutEvent();
contactForm.printsToDom();
contactForm.submitClick();
printAllContacts();


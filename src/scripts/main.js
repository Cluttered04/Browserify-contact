// In main.js, import the ContactList component and the ContactForm component.

// The user should see the contact form at the top of the view, and the list of contacts underneath it.

import printAllContacts from "./ContactList.js"
import contactForm from "./ContactForm.js";

contactForm.printsToDom();
contactForm.submitClick();
printAllContacts();


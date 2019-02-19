// A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.

const contactManager = {
    loadContact: () => {
       return fetch("http://localhost:8088/contacts", {})
       .then(response => response.json());
    },
    saveContact: (contact) => {
        return fetch("http://localhost:8088/contacts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contact)
        })
    }
}

export default contactManager;
// A Contact component that displays a person's name, phone number, and address.
const contactComponentBuilder = (name, phone, address) => {
    document.querySelector("#contact").innerHTML += `<h3>${name}</h3><p>${phone}</p><p>${address}</p>`
}

export default contactComponentBuilder;
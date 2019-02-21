const buildUserLogin = () => {
    document.querySelector("#login-form").innerHTML = `<form><input type="text" placeholder="User Name" id="register-user"><input type="text" placeholder="Password" id="register-password"><input type="text" placeholder="email address" id="register-email">
    </form><form><input type="text" placeholder="User Name" id="login-user"><input type="text" placeholder="Password" id="login-password"></form><button id="register-button">Register</button><button id="login-button">Log In</button><button id="logout-button">Log Out</button>`
}

export default buildUserLogin;
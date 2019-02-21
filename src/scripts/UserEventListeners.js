import buildUserObject from "./LoginObject.js"
import loginManager from "./UserApiManager"

const userClickEvents = {
    registerEvent: () => {
        document.querySelector("#register-button").addEventListener("click", () => {
            const userObject = buildUserObject();
            loginManager.postNewUser(userObject);
        })
    },

    logInEvent: () => {
        document.querySelector("#login-button").addEventListener("click", () => {
            const username = document.querySelector("#login-user").value;
            const password = document.querySelector("#login-password").value;
            loginManager.loginUser(username)
            .then((parsedUser) => {
                console.log(parsedUser)
                if(parsedUser[0].userPassword === password) {
                    sessionStorage.setItem("userId", parsedUser[0].id)
                }
            })
        })
    },

    logOutEvent: () => {
        document.querySelector("#logout-button").addEventListener("click", () => {
            sessionStorage.removeItem("userId");
            document.querySelector("#contact").innerHTML = "";
        })
    }
}

export default userClickEvents;


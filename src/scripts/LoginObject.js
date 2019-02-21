const buildUserObject = () => {
    const userName = document.querySelector("#register-user").value;
    const userPass = document.querySelector("#register-password").value;
    const userEmail = document.querySelector("#register-email").value;

    return {
        username: userName,
        userPassword: userPass,
        userEmailAddress: userEmail
    }



}

export default buildUserObject;
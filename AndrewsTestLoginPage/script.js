const loginBtn = document.querySelector("#login");
const signupBtn = document.querySelector("#register");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".register-form");

loginBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "#21264D";
    signupBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    loginForm.style.left = "50%";
    signupForm.style.left = "-50%";

    loginForm.style.opacity = "1";
    signupForm.style.opacity = "0";

    document.querySelector(".col-1").style.borderRadius = "0 30% 20% 0";

})

signupBtn.addEventListener('click', () => {
    loginBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    signupBtn.style.backgroundColor = "#21264D";

    loginForm.style.left = "150%";
    signupForm.style.left = "50%";

    loginForm.style.opacity = "0";
    signupForm.style.opacity = "1";

    document.querySelector(".col-1").style.borderRadius = "0 20% 30% 0";

})


var showpass = document.getElementById('showpass');
var errormessage = document.getElementById('errormessage');
var submitbtn = document.getElementById('submitbtn');
var userInput = document.getElementById('uname');
var passInput = document.getElementById('pass');
var emailInput = document.getElementById('email');
var confirmPassInput = document.getElementById('confirmpass');



var defuname = "admin";
var defpass = "admin1234";

if (showpass) {
    showpass.addEventListener('click', () => {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            confirmPassInput.type = 'text';
            showpass.innerHTML = 'hide password';
        } else {
            passInput.type = 'password';
            confirmPassInput.type = 'password';
            showpass.innerHTML = 'show password';
        }
    });
}



if (submitbtn) {
    submitbtn.addEventListener('click', () => {

        userInput.style.borderColor = '';
        passInput.style.borderColor = '';
        confirmPassInput.style.borderColor = '';
        emailInput.style.borderColor = '';
        errormessage.innerHTML = '';


        if (!userInput.value || userInput.value.trim() === '') {
            errormessage.innerHTML = 'Invalid user';
            errormessage.style.color = 'red';
            userInput.style.borderColor = 'red';
            return;
        }

        if (!emailInput.value || emailInput.value.trim() === '') {
            errormessage.innerHTML = 'Email is required';
            errormessage.style.color = 'red';
            emailInput.style.borderColor = 'red';
            return;
        }

        if (passInput.value !== confirmPassInput.value) {
            errormessage.innerHTML = 'Password not match';
            errormessage.style.color = 'red';
            passInput.style.borderColor = 'red';
            confirmPassInput.style.borderColor = 'red';
            return;
        }

        if (!passInput.value || passInput.value.trim() === '') {
            errormessage.innerHTML = 'Password is required';
            errormessage.style.color = 'red';
            passInput.style.borderColor = 'red';
            return;
        }

       
        localStorage.setItem('username', userInput.value);
        localStorage.setItem('password', passInput.value);
        localStorage.setItem('email', emailInput.value);
        errormessage.innerHTML = 'Registration successful! Redirecting to login...';
        errormessage.style.color = 'green';
        setTimeout(() => {
            window.location.href = '../signin.html';
        }, 2000);
    });
}


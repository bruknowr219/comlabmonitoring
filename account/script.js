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
            if (confirmPassInput) confirmPassInput.type = 'text';
            showpass.innerHTML = 'hide password';
        } else {
            passInput.type = 'password';
            if (confirmPassInput) confirmPassInput.type = 'password';
            showpass.innerHTML = 'show password';
        }
    });
}

if (submitbtn) {
    submitbtn.addEventListener('click', () => {
        
        userInput.style.borderColor = '';
        passInput.style.borderColor = '';
        errormessage.innerHTML = '';

        
        if (!userInput.value || userInput.value.trim() === '') {
            errormessage.innerHTML = 'Invalid user';
            errormessage.style.color = 'red';
            userInput.style.borderColor = 'red';
            return;
        }

        
        if (!passInput.value || passInput.value.trim() === '') {
            errormessage.innerHTML = 'Password is required';
            errormessage.style.color = 'red';
            passInput.style.borderColor = 'red';
            return;
        }

        var storedUsername = localStorage.getItem('username');
        var storedPassword = localStorage.getItem('password');

        if ((storedUsername && userInput.value === storedUsername && passInput.value === storedPassword) || 
            (userInput.value === defuname && passInput.value === defpass)) {
            localStorage.setItem('loggedInUsername', userInput.value);
            window.location.href = '../account/dashboard/dashboard.html';
        } else {
            errormessage.innerHTML = 'Invalid username or password';
            errormessage.style.color = 'red';
            userInput.style.borderColor = 'red';
            passInput.style.borderColor = 'red';
            setTimeout(() => {
                errormessage.innerHTML = '';
                userInput.style.borderColor = '';
                passInput.style.borderColor = '';
            }, 3000);
        }
    });
}


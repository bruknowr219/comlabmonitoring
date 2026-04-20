var submitbtn = document.getElementById('submitbtn');
var errormessage = document.getElementById('errormessage');
var emailInput = document.getElementById('email');
var usernameInput = document.getElementById('uname');

if (submitbtn) {
    submitbtn.addEventListener('click', () => {
    
        errormessage.innerHTML = '';
        emailInput.style.borderColor = '';
        usernameInput.style.borderColor = '';

        
        if (!emailInput.value || emailInput.value.trim() === '') {
            errormessage.innerHTML = 'Email is required';
            errormessage.style.color = 'red';
            emailInput.style.borderColor = 'red';
            return;
        }

        errormessage.innerHTML = 'Reset link sent successfully! Redirecting to sign in...';
        errormessage.style.color = 'green';

        
        setTimeout(() => {
            window.location.href = '../signin.html';
        }, 2000);
    });
}

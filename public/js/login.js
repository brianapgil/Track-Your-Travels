// Function to handle login
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Gets values from the form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both fields have an entry
  if (email && password) {
    try {
      // Sends POST request for login
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to home if logged in
        document.location.replace('/');
      } else {
        const result = await response.json();
        console.error('Login failed:', result);
        alert(result.message || 'Failed to log in.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to log in.');
    }
  }
};

// Event listener
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
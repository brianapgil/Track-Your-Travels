const signupFormHandler = async (event) => {
  event.preventDefault();

  // Receive and trim email and password values
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if email and password are both provided
  if (email && password) {
    try {
      // Send a POST request to sign up
      const response = await fetch('/api/signup', { 
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/'); // Redirect after successful signup
      } else {
        const result = await response.json();
        console.error('Sign-up failed:', result);
        alert(result.message || 'Failed to sign up.');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Failed to sign up.');
    }
  } else {
    alert('Please provide both email and password.');
  }
};

// Event listener
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
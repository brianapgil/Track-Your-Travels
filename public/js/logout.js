// Function to handle logging out
const logout = async () => {
  try {
    // Sends POST request to the logout endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); // Redirect to home page after logout
    } else {
      alert('Failed to log out.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Failed to log out.');
  }
};

// Event listener
document.querySelector('#logout').addEventListener('click', logout);
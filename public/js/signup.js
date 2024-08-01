const signupFormHandler = async function (event) {
    event.preventDefault();
  
    const username = document
      .querySelector("#username-signup")
      .value.trim();
    const password = document
      .querySelector("#password-signup")
      .value.trim();
  
    // Regular expression to check for at least one special character
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (passwordEl.length >= 8 && hasSpecialCharacter && username) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to sign up");
      }
    } else {
      alert(
        "Please include both a username and a password, and make sure your password is at least 8 characters long and contains at least one special character"
      );
    }
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
  

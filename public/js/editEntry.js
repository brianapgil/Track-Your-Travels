// Get the entry ID
const entryId = document.querySelector('input[name="id"]').value;

// Handle form submission for updating
const editFormHandler = async function (event) {
  event.preventDefault();

  // Gets values from form fields
  const title = document.querySelector('input[name="title"]').value;
  const description = document.querySelector('textarea[name="description"]').value;
  const location = document.querySelector('input[name="location"]').value;

  try {
    // Sends a PUT request to update the entry
    const response = await fetch(`/api/entries/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, location }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Redirect to the collection page after successful update
      document.location.replace('/collection');
    } else {
      alert('Failed to update entry.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while updating the entry.');
  }
};

// Handles delete functionality
const deleteClickHandler = async function () {
  try {
    await fetch(`/api/entries/${entryId}`, {
      method: 'DELETE',
    });

    document.location.replace('/collection');
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while deleting the entry.');
  }
};

// Event listeners
document.querySelector('#edit-entry-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-entry-btn').addEventListener('click', deleteClickHandler);
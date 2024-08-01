const entryId = document.querySelector('input[name="entry-id"]').value;

const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="entry-title"]').value;
  const body = document.querySelector('textarea[name="entry-body"]').value;

  await fetch(`/api/entries/${entryId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.location.replace("/dashboard");
};

const deleteClickHandler = async function () {
  await fetch(`/api/entries/${entryId}`, {
    method: "DELETE",
  });

  document.location.replace("/dashboard");
};

document
  .querySelector("#edit-entry-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-entry-btn")
  .addEventListener("click", deleteClickHandler);

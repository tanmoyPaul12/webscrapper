const feed = document.getElementById("feed");

fetch("http://localhost:8000/results")
  .then(res => res.json())
  .then(data => {
    feed.innerHTML = `
      <h2>${data.name}</h2>
      <p><b>${data.role}</b></p>
      <p>${data.email}</p>
      <p>${data.description}</p>
    `;
  })
  .catch(err => {
    feed.innerHTML = "Error loading data";
    console.log(err);
  });

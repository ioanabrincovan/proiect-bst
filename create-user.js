// CREATE USER
function apiButton() {
  console.log("ok");
  var apiUrl = "https://liteproject12.herokuapp.com/user";
  const data = {
    username: document.getElementById("username").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    age: document.getElementById("age").value,
  };
  fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("User creat cu succes!");
      this.data = {
        username: (document.getElementById("username").value = " "),
        firstName: (document.getElementById("firstName").value = " "),
        lastName: (document.getElementById("lastName").value = " "),
        age: (document.getElementById("age").value = " "),
      };
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

//PRIMA METODA CU GET
var apiUrl = "https://liteproject12.herokuapp.com/user";
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    users.sort(function (a, b) {
      return a.id - b.id;
    });
    for (const user of users) {
      const th = document.createElement("th");
      const tdFname = document.createElement("td");
      const tdLname = document.createElement("td");
      const tdUser = document.createElement("td");
      const tdage = document.createElement("td");
      const tdBtn = document.createElement("td");
      const tdBtnE = document.createElement("td");

      const btn = document.createElement("button");
      const btne = document.createElement("button");

      th.scope = "col";
      th.className = "count";

      tdFname.textContent = user.firstName;
      tdLname.textContent = user.lastName;
      tdUser.textContent = user.username;
      tdage.textContent = user.age;

      btn.textContent = "Delete";
      btn.type = "button";
      btn.className = "btn btn-outline-danger";
      btn.onclick = () => {
        deleteButton(user.id);
      };

      btne.textContent = "Edit";
      btne.type = "button";
      btne.className = "btn btn-outline-warning ";
      btne.toggle = "modal";
      btne.onclick = () => {
        document.getElementById("exampleModal").style.display = "block";
        document.getElementById("m-id").innerHTML = user.id;
        document.getElementById("m-firstname").value = user.firstName;
        document.getElementById("m-lastname").value = user.lastName;
        document.getElementById("m-username").value = user.username;
        document.getElementById("m-age").value = user.age;
      };

      tdBtn.appendChild(btn);
      tdBtnE.appendChild(btne);

      const tr = document.createElement("tr");

      tr.appendChild(th);
      tr.appendChild(tdFname);
      tr.appendChild(tdLname);
      tr.appendChild(tdUser);
      tr.appendChild(tdage);
      tr.appendChild(tdBtn);
      tr.appendChild(tdBtnE);

      document.getElementById("t-body").appendChild(tr);
    }
  })
  .catch((err) => {
    console.error(err);
  });

//BTN DELETE
function deleteButton(userId) {
  console.log("delete");
  var apiUrl = "https://liteproject12.herokuapp.com/user/" + userId;

  var d = confirm("Doriti sa-l stergeti?");
  if (!d) return;

  fetch(apiUrl, { method: "DELETE" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) confirm("User-ul are relatii. Nu se poate sterge.");
      else location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

//BTN CLOSE POPUP
function closeModal() {
  document.getElementById("exampleModal").style.display = "none";
}
//BTN SAVE CHANGES POPUP
function saveChanges() {
  console.log("ok");
  const mId = document.getElementById("m-id").textContent;
  var apiUrl = "https://liteproject12.herokuapp.com/user/" + mId;
  const data = {
    username: document.getElementById("m-username").value,
    firstName: document.getElementById("m-firstname").value,
    lastName: document.getElementById("m-lastname").value,
    age: document.getElementById("m-age").value,
  };
  fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("User modificat cu succes!");
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

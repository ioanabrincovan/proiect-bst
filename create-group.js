// CREATE GROUP
function apiButtonG() {
  console.log("ok");
  var apiUrl = "https://liteproject12.herokuapp.com/group";
  const data = {
    name: document.getElementById("name").value,
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
      alert("Grup creat cu succes!");
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

// CREATE TABLE GROUP
var apiUrl = "https://liteproject12.herokuapp.com/group";
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((groups) => {
    for (const group of groups) {
      const th = document.createElement("th");
      const tdName = document.createElement("td");
      const tdBtn = document.createElement("td");
      const tdBtnE = document.createElement("td");
      const btn = document.createElement("button");
      const btne = document.createElement("button");

      th.scope = "col";
      th.className = "count";

      tdName.textContent = group.name;

      btn.textContent = "Delete";
      btn.type = "button";
      btn.className = "btn btn-outline-danger";
      btn.onclick = () => {
        deleteButtonG(group.id);
      };

      btne.textContent = "Edit";
      btne.type = "button";
      btne.className = "btn btn-outline-warning";
      btne.toggle = "modal";
      btne.onclick = () => {
        document.getElementById("exampleModal").style.display = "block";
        document.getElementById("m-idG").innerHTML = group.id;
        document.getElementById("m-name").value = group.name;
      };

      tdBtn.appendChild(btn);
      tdBtnE.appendChild(btne);

      const tr = document.createElement("tr");

      tr.appendChild(th);
      tr.appendChild(tdName);
      tr.appendChild(tdBtn);
      tr.appendChild(tdBtnE);

      document.getElementById("t-body2").appendChild(tr);
    }
  })
  .catch((err) => {
    console.error(err);
  });

function deleteButtonG(groupId) {
  console.log("delete");
  var apiUrl = "https://liteproject12.herokuapp.com/group/" + groupId;
  var d = confirm("Doriti sa-l stergeti?");
  if (!d) return;

  fetch(apiUrl, { method: "DELETE" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

//BTN CLOSE POPUP
function closeModalG() {
  document.getElementById("exampleModal").style.display = "none";
}
//BTN SAVE CHANGES POPUP
function saveChangesG() {
  console.log("ok");
  const mIdG = document.getElementById("m-idG").textContent;
  var apiUrl = "https://liteproject12.herokuapp.com/group/" + mIdG;
  const data = {
    name: document.getElementById("m-name").value,
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
      alert("Grup modificat cu succes!");
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

// CREATE ADD USER TO A GROUP
var apiUrl = "https://liteproject12.herokuapp.com/user";
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    for (const user of users) {
      const option = document.createElement("option");
      option.value = user.id;
      option.text = user.username;
      document.getElementById("group-user").appendChild(option);
    }
  })
  .catch((err) => {
    console.error(error);
  });
var apiUrl = "https://liteproject12.herokuapp.com/group";
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then((groups) => {
    for (const group of groups) {
      const option = document.createElement("option");
      option.value = group.id;
      option.text = group.name;
      document.getElementById("group-name").appendChild(option);
    }
  })
  .catch((err) => {
    console.error(error);
  });

function apiButtonAG() {
  console.log("ok");
  var apiUrl = "https://liteproject12.herokuapp.com/group/rel/user";
  const data = {
    user: document.getElementById("group-user").value,
    group: document.getElementById("group-name").value,
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
      alert("User adaugat cu succes!");
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

// CREATE BTN DELETE ADD

function deleteButtonAGU(groupId) {
  console.log("delete");
  var apiUrl = "https://liteproject12.herokuapp.com/group/rel/user" + groupId;

  var d = confirm("Doriti sa-l stergeti?");
  if (!d) return;

  fetch(apiUrl, { method: "DELETE" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

//CREATE TABLE ADD
var apiUrl = "https://liteproject12.herokuapp.com/group/rel/user";
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then(async (relations) => {
    var apiUrl = "https://liteproject12.herokuapp.com/user/";
    response = await fetch(apiUrl);
    let users;
    if (response.status == 200) {
      users = await response.json();
      for (const user of users) {
        const option = document.createElement("option");
        option.value = user.id;
        option.text = user.username;
        document.getElementById("group-add-user").appendChild(option);
      }
    }

    var apiUrl = "https://liteproject12.herokuapp.com/group/";
    response = await fetch(apiUrl);
    let groups;
    if (response.status == 200) {
      groups = await response.json();
      for (const group of groups) {
        const option = document.createElement("option");
        option.value = group.id;
        option.text = group.name;
        document.getElementById("group-add-group").appendChild(option);
      }
    }

    for (const rel of relations) {
      const th = document.createElement("th");
      const tdGroup = document.createElement("td");
      const tdUser = document.createElement("td");
      const tdBtn = document.createElement("td");
      const tdBtnE = document.createElement("td");

      const btn = document.createElement("button");
      const btne = document.createElement("button");

      th.scope = "col";
      th.className = "count";

      var apiUrl = "https://liteproject12.herokuapp.com/group/" + rel.group;
      let response = await fetch(apiUrl);
      let group;
      if (response.status == 200) {
        group = await response.json();
        tdGroup.textContent = group.name;
      }

      var apiUrl = "https://liteproject12.herokuapp.com/user/" + rel.user;
      response = await fetch(apiUrl);
      let user;
      if (response.status == 200) {
        user = await response.json();
        tdUser.textContent = user.username;
      }

      btn.textContent = "Delete";
      btn.type = "button";
      btn.className = "btn btn-outline-danger";
      btn.onclick = () => {
        deleteButtonAGU(groupId);
      };

      btne.textContent = "Edit";
      btne.type = "button";
      btne.className = "btn btn-outline-warning";
      btne.onclick = async () => {
        document.getElementById("exampleModal").style.display = "block";
        document.getElementById("m-idAG").innerHTML = group.id;
        document.getElementById("group-add-user").value = group.user;
        document.getElementById("group-add-group").value = group.group;
      };

      tdBtn.appendChild(btn);
      tdBtnE.appendChild(btne);

      const tr = document.createElement("tr");

      tr.appendChild(th);
      tr.appendChild(tdGroup);
      tr.appendChild(tdUser);
      tr.appendChild(tdBtn);
      tr.appendChild(tdBtnE);

      document.getElementById("t-body3").appendChild(tr);
    }
  })
  .catch((err) => {
    console.error(err);
  });

//BTN CLOSE POPUP
function closeModalAG() {
  document.getElementById("exampleModal").style.display = "none";
}
//BTN SAVE CHANGES POPUP
function saveChangesAG() {
  console.log("ok");
  const mIdAG = document.getElementById("m-idAG").textContent;
  var apiUrl = "https://liteproject12.herokuapp.com/group/" + mIdAG;
  const data = {
    user: document.getElementById("group-add-user").value,
    group: document.getElementById("group-add-group").value,
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
      alert("Modificat cu succes!");
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}

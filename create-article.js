// CREATE ARTICLE
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
      document.getElementById("author-sel").appendChild(option);
    }
  })
  .catch((err) => {
    console.error(error);
  });

function apiButtonA() {
  console.log("ok");
  var apiUrl = "https://liteproject12.herokuapp.com/article";
  const data = {
    title: document.getElementById("title").value,
    subject: document.getElementById("subject").value,
    content: document.getElementById("content").value,
    author: document.getElementById("author-sel").value,
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
      alert("Articol creat cu succes!");
      this.data = {
        title: (document.getElementById("title").value = " "),
        subject: (document.getElementById("subject").value = " "),
        content: (document.getElementById("content").value = " "),
        author: (document.getElementById("author-sel").value = " "),
      };
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

// TABEL
var apiUrl = "https://liteproject12.herokuapp.com/article";
fetch(apiUrl)
  .then((response) => {
    return response.json();
  })
  .then(async (articles) => {
    var apiUrl = "https://liteproject12.herokuapp.com/user";
    response = await fetch(apiUrl);
    let users;
    if (response.status == 200) {
      users = await response.json();
      for (const user of users) {
        const option = document.createElement("option");
        option.value = user.id;
        option.text = user.username;
        document.getElementById("author-select").appendChild(option);
      }
    }

    for (const article of articles) {
      const th = document.createElement("th");
      const tdTitle = document.createElement("td");
      const tdSubject = document.createElement("td");
      const tdContent = document.createElement("td");
      const tdAuthor = document.createElement("td");
      const tdBtn = document.createElement("td");
      const tdBtnE = document.createElement("td");

      const btn = document.createElement("button");
      const btne = document.createElement("button");

      th.scope = "col";
      th.className = "count";

      tdTitle.textContent = article.title;
      tdSubject.textContent = article.subject;
      tdContent.textContent = article.content;

      var apiUrl = "https://liteproject12.herokuapp.com/user/" + article.author;
      let response = await fetch(apiUrl);
      let user;
      if (response.status == 200) {
        user = await response.json();
        tdAuthor.textContent = user.username;
      }

      btn.textContent = "Delete";
      btn.type = "button";
      btn.className = "btn btn-outline-danger";
      btn.onclick = () => {
        deleteButtonA(article.id);
      };

      btne.textContent = "Edit";
      btne.type = "button";
      btne.className = "btn btn-outline-warning";
      btne.toggle = "modal";
      btne.onclick = async () => {
        document.getElementById("exampleModal").style.display = "block";
        document.getElementById("m-idA").innerHTML = article.id;
        document.getElementById("m-title").value = article.title;
        document.getElementById("m-subject").value = article.subject;
        document.getElementById("m-content").value = article.content;
      };

      tdBtn.appendChild(btn);
      tdBtnE.appendChild(btne);

      const tr = document.createElement("tr");

      tr.appendChild(th);
      tr.appendChild(tdTitle);
      tr.appendChild(tdSubject);
      tr.appendChild(tdContent);
      tr.appendChild(tdAuthor);
      tr.appendChild(tdBtn);
      tr.appendChild(tdBtnE);

      document.getElementById("t-body1").appendChild(tr);
    }
  })
  .catch((err) => {
    console.error(err);
  });

// BTN DELETE
function deleteButtonA(articleId) {
  console.log("delete");
  var apiUrl = "https://liteproject12.herokuapp.com/article/" + articleId;
  var d = confirm("Doriti stergerea articolului?");
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
function closeModalA() {
  document.getElementById("exampleModal").style.display = "none";
}
//BTN SAVE CHANGES POPUP
function saveChangesA() {
  console.log("ok");
  const mIdA = document.getElementById("m-idA").textContent;
  var apiUrl = "https://liteproject12.herokuapp.com/article/" + mIdA;
  const data = {
    title: document.getElementById("m-title").value,
    subject: document.getElementById("m-subject").value,
    content: document.getElementById("m-content").value,
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
      alert("Articol modificat cu succes!");
      location.reload();
    })
    .catch((err) => {
      console.error(error);
    });
}

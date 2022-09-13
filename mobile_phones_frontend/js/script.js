let btnSave = document.getElementById('save');
let firstname = document.getElementById('n');
let email = document.getElementById('e');
let table = document.getElementById('tasks');

let firstname2 = document.querySelector('.nn');
let email2 = document.querySelector('.ee');

let users;

function updateUsers() {
  fetch('http://127.0.0.1:8001/users').then(async (res) => {
    const json = await res.json();
    table.innerHTML = "";
    users = json;

    for (const user of json) {
      $("#tasks").append(`

        <tr id="user${user.id}">;
          <td>${user.id}</td>;
          <td class="name${user.id}">${user.name}</td>;
          <td class="email${user.id}">${user.email}</td>;
          <td>
            <button class="btn btn-success edit-style" onclick="editUser(${user.id})" data-bs-target="#edit" data-bs-toggle="modal"><i class="fa fa-edit"></i></button>
            <button href="" class="btn btn-danger del" onclick="deleteUser(${user.id})"><i class="fa fa-trash-alt"></i></button>
          </td>;
        </tr>;
        `);
    }
  });
}

btnSave.onclick = () => {
  fetch('http://127.0.0.1:8001/add-user',
    {
      method: 'POST',
      body: JSON.stringify({ name: firstname.value, email: email.value }),
      headers: { 'content-type': 'application/json' }
    }).then(async () => {
      updateUsers();
      firstname.value = "";
      email.value = "";
    });
}

function editUser(id) {
  let name = document.querySelector('.name' + id);
  let email = document.querySelector('.email' + id);
  firstname2.value = name.textContent;
  email2.value = email.textContent;

  document.querySelector('.save-btn').onclick = function () {
    fetch(`http://127.0.0.1:8001/edit-user?id=${id}`,
      {
        method: 'POST',
        body: JSON.stringify({ name: firstname2.value, email: email2.value }),
        headers: { 'content-type': 'application/json' }
      }).then(async () => {
        updateUsers();
      });
  }
}

function deleteUser(id) {
  fetch(`http://127.0.0.1:8001/delete-user?id=${id}`,
    {
      method: 'DELETE',
    }).then(async () => {
      updateUsers();
    });
}

function downloadJson() {
  let file = new Blob([JSON.stringify(users)], {type: 'application/json'});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "users.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

updateUsers();
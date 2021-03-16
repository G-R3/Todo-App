const todoList = document.querySelector(".todo-list");
const submitTodo = document.querySelector(".submit-todo-button");

todoList.addEventListener("click", function (e) {
  let target = e.target;
  console.log(target);
  if (e.target.classList.contains("trashcan")) {
    console.log("deleted", target.parentNode);
    // target.parentNode.classList.add("deleted");
    target.parentNode.remove();
  } else if (e.target.classList.contains("checkmark")) {
    console.log("completed", target.parentNode);
    target.parentNode.firstElementChild.classList.toggle("completed");
  }
});

function saveTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    let div = document.createElement("div");
    let li = document.createElement("li");
    let checkmarkBtn = document.createElement("button");
    let trashcanBtn = document.createElement("button");

    li.innerText = todo;
    checkmarkBtn.classList.add("fas", "fa-check", "checkmark");
    trashcanBtn.classList.add("fas", "fa-trash", "trashcan");
    div.append(li);
    div.append(checkmarkBtn);
    div.append(trashcanBtn);
    div.classList.add("todo-item");
    todoList.append(div);
  });
}

function newTodo(e) {
  e.preventDefault();
  let todo = document.querySelector(".todo-input");

  let div = document.createElement("div");
  let li = document.createElement("li");

  let checkmarkBtn = document.createElement("button");
  let trashcanBtn = document.createElement("button");

  li.innerText = todo.value;
  saveTodos(todo.value);
  checkmarkBtn.classList.add("fas", "fa-check", "checkmark");
  trashcanBtn.classList.add("fas", "fa-trash", "trashcan");
  div.append(li);
  div.append(checkmarkBtn);
  div.append(trashcanBtn);
  div.classList.add("todo-item");
  todoList.append(div);

  todo.value = "";
}

submitTodo.addEventListener("click", newTodo);
window.addEventListener("load", loadTodos);

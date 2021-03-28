const todoList = document.querySelector(".todo-list");
const submitTodo = document.querySelector(".submit-todo-button");

// create a todo item template
function createTodoTemplate(todo) {
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
}

// saves todo items to local storage
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

// adds todo items in local storage to list upon window load
function loadTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    createTodoTemplate(todo);
  });
}

// removes a todo item from the list and storage
function removeTodo(todo) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  if (todos.includes(todo.firstElementChild.innerText)) {
    todos.splice(todos.indexOf(todo.firstElementChild.innerText), 1);
    todo.classList.add("deleted");
    setTimeout(function () {
      todo.remove();
    }, 300);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// adds a new todo item to the list
function newTodo(e) {
  e.preventDefault();
  let todo = document.querySelector(".todo-input");
  let error = document.querySelector("#error-display");

  if (todo.value.trim() !== "") {
    error.style.display = "none";
    createTodoTemplate(todo.value.trim());
    saveTodos(todo.value);
    todo.value = "";
  } else {
    error.style.display = "inline";
  }
}

// used to complete or remove a todo item
todoList.addEventListener("click", function (e) {
  let target = e.target;
  if (e.target.classList.contains("trashcan")) {
    removeTodo(target.parentNode);
  } else if (e.target.classList.contains("checkmark")) {
    target.parentNode.firstElementChild.classList.toggle("completed");
  }
});
// used to add new todo items
submitTodo.addEventListener("click", newTodo);
// used to load local storage
window.addEventListener("load", loadTodos);

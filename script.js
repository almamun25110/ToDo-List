let inputBox = document.getElementById("inputBox");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");

let editToDo = null;

//Function to add to do
let addToDo = () => {
  let inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something to do");
    return false;
  }
  if (addBtn.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editToDo.target.previousElementSibling.innerHTML = inputText;
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    //Creating P tag
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //Creating delete button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "deleteBtn");
    li.appendChild(editBtn);

    //Creating edit button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "editBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};
//Function to Update:(Edit/Remove) to do
let updateToDo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);

  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editToDo = e;
  }
};
//Function to save local to do
let saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};
//Function to get local to do
let getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      //Creating P tag
      let li = document.createElement("li");
      let p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      //Creating delete button
      let editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "deleteBtn");
      li.appendChild(editBtn);

      //Creating edit button
      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "editBtn");
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }
};
//Function to remove local to do
let deleteLocalTodos = (todo) => {
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  // Array fuctions : slice / splice
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
// Function to Edit local to do
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
};


document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener("click", addToDo);
todoList.addEventListener("click", updateToDo);

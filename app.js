let todos = JSON.parse(localStorage.getItem("todos")) || [];

function createElement(tag, probs, ...children) {
  const element = document.createElement(tag);
  Object.keys(probs).forEach(key => {
    if (key === "style") {
      Object.keys(probs[key]).forEach(i => {
        element.style[i] = probs.style[i];
      });
    } else {
      element[key] = probs[key];
    }
  });

  children.forEach(item => {
    if (typeof item === "string") {
      element.innerText = item;
    } else {
      element.appendChild(item);
    }
  });

  return element;
}

function createTodoItem(data) {
  const label = createElement(
    "label",
    { className: "my-checkbox" },
    createElement("input", {
      type: "checkbox",
      checked: data.confirm ? true : false
    }),
    createElement("span", {})
  );

  const editInput = createElement("input", {
    className: "text-edit",
    type: "text"
  });
  const span = createElement("span", { className: "task" }, data.title);

  const groupBtn = createElement(
    "div",
    { className: "btn-group" },
    createElement("i", { className: "fas fa-arrow-left menu" }),
    createElement("button", { className: "edit blue-button" }, "Edit"),
    createElement("button", { className: "remove red-button" }, "Remove")
  );

  const li = createElement(
    "li",
    { className: `todos-item ${data.confirm ? "complate" : ""}` },
    label,
    span,
    editInput,
    groupBtn
  );
  li.dataset.id = data.id;

  bindEvents(li);
  return li;
}

document.getElementById("form-add").addEventListener("submit", addTodo);

function menuFunc() {
  const menu = this.parentNode;
  this.classList.toggle("menu-opened");
  menu.classList.toggle("opened");
}

function editTodoItem() {
  const item = this.parentNode.parentNode;
  const task = item.querySelector(".task");
  const editInput = item.querySelector(".text-edit");
	const isEditing = item.classList.contains("editing");
	
	const id = this.parentNode.parentNode.dataset.id;

	const index = todos.find(item => item.id === +id);
	
  if (isEditing) {
		task.innerText = editInput.value;
		index.title = editInput.value;
		this.innerText = "Edit";
		save();
  } else {
    editInput.value = task.innerText;
    this.innerText = "Save";
  }

  item.classList.toggle("editing");
}

function removeTodoItem() {
	const item = this.parentNode.parentNode;
	const id = this.parentNode.parentNode.dataset.id;
	const index = todos.findIndex(item => item.id === +id);
	todos.splice(index, 1);
	save();
  todosList.removeChild(item);
  counItems.innerText = getCountTodos();
}

function toggleTodoItem() {
  const item = this.parentNode.parentNode;
  item.classList.toggle("complate");
}

function bindEvents(todoItem) {
  const menu = todoItem.querySelector(".menu");
  const edit = todoItem.querySelector(".edit");
  const remove = todoItem.querySelector(".remove");
  const checkbox = todoItem.querySelector(".my-checkbox input");

  menu.addEventListener("click", menuFunc);
  edit.addEventListener("click", editTodoItem);
  remove.addEventListener("click", removeTodoItem);
  checkbox.addEventListener("click", toggleTodoItem);
}

function addTodo(e) {
  e.preventDefault();
  const input = document.getElementById("input");
  const data = {
    title: input.value,
    confirm: false,
    id: new Date().getTime()
  };
  todosList.appendChild(createTodoItem(data));
	counItems.innerText = getCountTodos();
	todos.push(data);
	save();
  input.value = "";
}

function findTodoItem(id) {
	return todos.find(item => item.id == id);
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getCountTodos() {
  return document.querySelectorAll(".todos-item").length;
}

function load() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos);

  for (let i in todos) {
    todosList.appendChild(createTodoItem(todos[i]));
  }
  counItems.innerText = getCountTodos();
  return todosList;
}

const todosList = document.getElementById("todos-list");
const counItems = document.getElementById("count-items");
const todoItems = document.querySelectorAll(".todos-item");

function main() {
  todoItems.forEach(item => bindEvents(item));
	counItems.innerText = getCountTodos();
	load();
}
main();

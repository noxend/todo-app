

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// localStorage.removeItem('todos')

console.log(todos.length || "none");

function createElement(tag, probs, ...children) {
  const element = document.createElement(tag);
  Object.keys(probs).forEach(key => {
    if (key === 'style') {
      Object.keys(probs[key]).forEach((i) => {
        element.style[i] = probs.style[i];
      });
    } else {
      element[key] = probs[key];
    }
  });

  children.forEach(item => {
    if (typeof item === 'string') {
      element.innerText = item;
    } else {
      element.appendChild(item);
    }
  });

  return element;
}

function createTodoItem(confirm, title, id) {

  const label = createElement("label", {className: "my-checkbox"}, 
    createElement("input", { type: "checkbox", checked: confirm ? true : false }),
    createElement("span", {}),
  );


  const editInput = createElement("input", { className: "text-edit", type: "text" });
  const span = createElement("span", { className: "task" }, title);

  const groupBtn = createElement("div", { className: "btn-group" },
    createElement('i', {className: "fas fa-arrow-left menu"}),
    createElement("button", { className: "edit blue-button" }, 'Edit'),
    createElement("button", { className: "remove red-button" }, 'Remove'),
  );

  const li = createElement("li", { className: `todos-item ${confirm ? 'complate' : ''}` }, label, span, editInput, groupBtn);

  bindEvents(li);
  return li;
}

document.getElementById('form-add').addEventListener('submit', addTodo);


function menuFunc() {
  const menu = this.parentNode;
  this.classList.toggle('menu-opened');
  menu.classList.toggle('opened');
}


function editTodoItem() {
  const item = this.parentNode.parentNode;
  const task = item.querySelector('.task');
  const editInput = item.querySelector('.text-edit');
  const isEditing = item.classList.contains('editing');

  if (isEditing) {
    task.innerText = editInput.value;
    this.innerText = "Edit";

  } else {
    editInput.value = task.innerText;
    this.innerText = "Save";
  }

  item.classList.toggle("editing");
  
}

function removeTodoItem() {
  const item = this.parentNode.parentNode;
  todosList.removeChild(item);
  counItems.innerText = getCountTodos();
}

function toggleTodoItem() {
  const item = this.parentNode.parentNode;
  item.classList.toggle('complate');
}

function bindEvents(todoItem) {
  const menu = todoItem.querySelector('.menu');
  const edit = todoItem.querySelector('.edit');
  const remove = todoItem.querySelector('.remove');
  const checkbox = todoItem.querySelector('.my-checkbox input');
  
  menu.addEventListener('click', menuFunc);
  edit.addEventListener('click', editTodoItem);
  remove.addEventListener('click', removeTodoItem);
  checkbox.addEventListener('click', toggleTodoItem);
}

function addTodo(e) {
  e.preventDefault();
  const input = document.getElementById('input');
  todosList.appendChild(createTodoItem(false, input.value));
  counItems.innerText = getCountTodos();  
  save({ title: input.value, confirm: false });
  input.value = '';
}

function save(todo) {
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getCountTodos() {
  return document.querySelectorAll(".todos-item").length;
}

function load() {
  let todos = JSON.parse(localStorage.getItem('todos'));
  console.log(todos);

  for (let i in todos) {
    todosList.appendChild(createTodoItem(todos[i].confirm, todos[i].title));
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
}

main();
// load();


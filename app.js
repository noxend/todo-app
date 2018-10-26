

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// localStorage.removeItem('todos')

console.log(todos.length || "none");

const todosList = document.getElementById("todos-list");
const counItems = document.getElementById("count-items");

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

  const span = createElement("span", { className: "task" }, title);

  const groupBtn = createElement("div", { className: "btn-group" },
    createElement("button", { className: "menu" },
      createElement('i', {className: "fas fa-arrow-left"})
    ),
    createElement("button", { className: "edit blue-button" }, 'Edit'),
    createElement("button", { className: "edit red-button" }, 'Remove'),
  );

  const li = createElement("li", { className: `todos-item ${confirm ? 'complate' : ''}` }, label, span, groupBtn);

  return li;
}

document.getElementById('form-add').addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();
  const input = document.getElementById('input');
  todosList.appendChild(createTodoItem(false, input.value));
  counItems.innerText = getCountTodos();  
  save({ title: input.value, confirm: false });
  input.value = '';
}

function removeTodo() {

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


load();


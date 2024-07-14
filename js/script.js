const refs = {
  form: document.querySelector(".js-form"),
  todoList: document.querySelector(".todos-list"),
  select: document.querySelector(".todos-select"),
};

let todos = loadFromLs("todos") || [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todosName = e.currentTarget.elements.todos.value.trim();
  const todosPriority = e.currentTarget.elements.select.value;

  if (!todosName || !todosPriority) {
    alert("Please enter both a task and a priority");
    return;
  }

  const todo = {
    id: Date.now(),
    text: todosName,
    priority: todosPriority,
  };
  todos.push(todo);
  saveToLs("todos", todos);

  refs.todoList.insertAdjacentHTML("beforeend", createTodoMarkup(todo));
  e.currentTarget.reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = loadFromLs("todos");
  if (storedTodos) {
    todos = storedTodos;
    refs.todoList.innerHTML = todos.map(createTodoMarkup).join("");
  }
});

refs.todoList.addEventListener("click", (e) => {
  if (e.target.nodeName !== "BUTTON") return;

  const todoId = Number(e.target.dataset.id);

  if (e.target.id === "delete") {
    todos = todos.filter((item) => item.id !== todoId);
    saveToLs("todos", todos);
    e.target.closest(".todos-item").remove();
  }
});

function createBgColor(priority) {
  switch (priority) {
    case "high":
      return "#F08080";
    case "medium":
      return "#FFFACD";
    case "low":
      return "#D3D3D3";
    default:
      return "#fff";
  }
}

function createTodoMarkup({ text, priority, id }) {
  const bgColor = createBgColor(priority);

  return `
    <li class="todos-item" style="background-color: ${bgColor}">
      <span class="todos-text">${text}</span>
      <span class="todos-info">${priority}</span>
      <div class="btn-wrapper">
        <button id="edit" class="edit" data-id="${id}" type="button">&#9998;</button>
        <button id="done" class="done" data-id="${id}" type="button">&#10003;</button>
        <button id="delete" class="delete" data-id="${id}" type="button">&#10007;</button>
      </div>
    </li>`;
}

function saveToLs(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLs(key) {
  const json = localStorage.getItem(key);
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

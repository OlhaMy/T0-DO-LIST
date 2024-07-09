const refs = {
  form: document.querySelector(".js-form"),
  todoList: document.querySelector(".todos-list"),
};

const currentDate = new Date();
console.log(currentDate);

const todos = [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todosName = e.currentTarget.elements.todos.value.trim();
  const todosPriority = e.currentTarget.elements.priority.value.trim();

  if (!todosName || !todosPriority) {
    alert("Please enter both a task and a priority");
    return;
  }

  const todo = {
    text: todosName,
    priority: todosPriority,
  };
  todos.push(todo);

  refs.todoList.insertAdjacentHTML("beforeend", cteateTodo(todo));
});

function cteateTodo({ text, priority }) {
  return `
  <li class="todos-item">
              <span class="todos-text"> ${text}</span>
              <span class="todos-info">priority: ${priority}</span>
             
              <button type="button">&#9998;</button>
              <button type="button">&#10003;</button>
              <button type="button">&#10007;</button>
            </li>
    `;
}

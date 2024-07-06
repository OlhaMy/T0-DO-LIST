const refs = {
  form: document.querySelector(".js-form"),
  todoList: document.querySelector(".todos-list"),
};

const todos = [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todosName = e.currentTarget.elements.todos.value.trim();

  const todosPriority = e.currentTarget.elements.priority.value.trim();

  const todo = {
    text: todosName,
    priority: todosPriority,
  };
  todos.push(todo);

  refs.todoList.insertAdjacentHTML("beforeend", cteateTodo(todo));
});

function cteateTodo(obj) {
  return `
  <li class="todos-item">
              <span class="todos-text"> ${obj.text}</span>
              <span class="todos-info">priority: ${obj.priority}</span>
              <button type="button">delete</button>
              <button type="button">edit</button>
              <button type="button">complete</button>
            </li>
    `;
}

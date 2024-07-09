const refs = {
  form: document.querySelector(".js-form"),
  todoList: document.querySelector(".todos-list"),
  select: document.querySelector(".todos-select"),
};

const currentDate = new Date();
console.log(currentDate);

let todos = [];

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todosName = e.currentTarget.elements.todos.value.trim();
  const todosPriority = e.currentTarget.elements.select.value.trim();

  console.log(todosPriority);
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

  refs.todoList.insertAdjacentHTML("beforeend", cteateTodo(todo));
});

refs.todoList.addEventListener("click", (e) => {
  if (e.target.nodeName !== "BUTTON") return;

  if (e.target.id === "edit") {
    console.log("edit");
    return;
  }

  if (e.target.id === "done") {
    console.log("done");
    return;
  }

  if (e.target.id === "delete") {
    const todoId = Number(e.target.dataset.id);
    todos = todos.filter((item) => item.id !== todoId);

    const updateMarkup = todos.map((item) => cteateTodo(item)).join();
    refs.todoList.innerHTML = updateMarkup;
  }
});

function cteateTodo({ text, priority, id }) {
  console.log(priority);
  return `
  <li class="todos-item">
              <span class="todos-text"> ${text}</span>
              <span class="todos-info"> ${priority}</span>

          <ul class="btn-wrapper"> <li> 
              <button id='edit' class="edit" data-id='${id}' type="button">&#9998;</button>
              </li>
              <li> 
              <button id='done' class="done" data-id='${id}' 'type="button">&#10003;</button>
              </li>
              <li> 
              <button id='delete' class="delete" data-id='${id}' type="button">&#10007;</button>
              </li>

              </ul>
            </li>
    `;
}

{
  /* <button type="button" data-id="${item.id}" class="done">${
        item.done ? 'Виконано!' : 'Не виконано'
      }</button> */
}

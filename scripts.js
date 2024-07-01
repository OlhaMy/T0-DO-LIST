class ToDoList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.todoList = this.container.querySelector('#todoList');
        this.newTodoInput = this.container.querySelector('#newTodoInput');
        this.addButton = this.container.querySelector('#addButton');
        this.listTitle = this.container.querySelector('#listTitle');
        this.duplicateButton = this.container.querySelector('#duplicateButton');

        this.addButton.addEventListener('click', () => this.addTask());
        this.duplicateButton.addEventListener('click', () => this.duplicateList());

        this.tasks = [];
        this.loadTasks();
    }

    addTask() {
        const taskText = this.newTodoInput.value.trim();
        if (taskText === '') return;

        const task = {
            text: taskText,
            completed: false
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();

        this.newTodoInput.value = '';
    }

    toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    editTask(index, newText) {
        this.tasks[index].text = newText;
        this.saveTasks();
        this.renderTasks();
    }

    duplicateList() {
        const newList = new ToDoList(this.container.id);
        document.body.appendChild(newList.container.cloneNode(true));
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            this.tasks = savedTasks;
            this.renderTasks();
        }
    }

    renderTasks() {
        this.todoList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            const taskInput = document.createElement('input');
            taskInput.type = 'text';
            taskInput.value = task.text;
            taskInput.readOnly = true;
            taskInput.addEventListener('dblclick', () => {
                taskInput.readOnly = false;
                taskInput.focus();
            });
            taskInput.addEventListener('blur', () => {
                taskInput.readOnly = true;
                this.editTask(index, taskInput.value);
            });

            const toggleButton = document.createElement('button');
            toggleButton.textContent = task.completed ? 'Undo' : 'Done';
            toggleButton.addEventListener('click', () => this.toggleTask(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => this.deleteTask(index));

            listItem.appendChild(taskInput);
            listItem.appendChild(toggleButton);
            listItem.appendChild(deleteButton);
            this.todoList.appendChild(listItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ToDoList('container');
});

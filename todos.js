let todos = [];
const TODO_LIST = 'todo-list';
const TODO_STORAGE = 'todo-storage';

const getFreshTodoList = () => {
  window.localStorage.setItem(TODO_STORAGE, JSON.stringify(todos));
  const listAnchor = document.getElementById('todo-root');
  const todoList = document.createElement('ul');
  todoList.id = TODO_LIST;
  const staleList = document.getElementById(TODO_LIST);
  if (staleList) {
    listAnchor.removeChild(staleList);
  }
  return { todoList, listAnchor };
};

const onComplete = (index) => {
  todos[index].complete = !todos[index].complete;
    updateTodos();
}

const createTodoNode = (todo, index) => {
  const element = document.createElement('li');

  element.innerHTML = `
    <div class="todo ${todo.complete ? 'complete' : ''}">
      <p>${todo.text}</p>
      <button onclick="onComplete(${index})">
        ${todo.complete ? 'Uncomplete' : 'Complete'}
      </button>
    </div>
  `;
  return element;
};

const updateTodos = () => {
  const todoFragment = document.createDocumentFragment();
  const { todoList, listAnchor } = getFreshTodoList();

  todos.forEach((todo, index) => {
    const todoElement = createTodoNode(todo, index);
    todoList.appendChild(todoElement);
  });
  todoFragment.appendChild(todoList);
  listAnchor.appendChild(todoFragment);
};

const addTodo = () => {
  const todoText = document.getElementById('new-todo-input');
  todos.push({
    text: todoText.value,
    complete: false,
  });
  todoText.value = '';
  updateTodos();
};

(() => {
  try {
    console.log('getting todos!');
    const storedTodos = window.localStorage.getItem(TODO_STORAGE);
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      todos = parsedTodos;
      updateTodos();
    }
  } catch (error) {
    console.log(error);
    window.localStorage.removeItem(TODO_STORAGE);
  }
})();

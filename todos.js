const test = (arg) => {
  console.log('hello there from todos, ', arg, '!');
}

const todos = [];

const updateTodos = () => {
  const todoElement = document.createElement('div');

};

const addTodo = () => {
  const todoText = document.getElementById('new-todo-input');
  todos.push({
    text: todoText.value,
    complete: false,
  });
  updateTodos();
};

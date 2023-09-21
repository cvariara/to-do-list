export function createTodo() {
  const addTodo = document.querySelector('.add-todo');
  const addTodoModal = document.querySelector('.add-todo-modal');
  const cancelTodo = document.querySelector('.cancel-todo');

  addTodo.addEventListener("click", () => {
    addTodoModal.showModal();
  })

  cancelTodo.addEventListener("click", () => {
    addTodoModal.close();
  })
}
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');
const emptyState = document.querySelector('#empty-state');
const filterButtons = document.querySelectorAll('[id^="filter-"]');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

const renderTodos = () => {
    todoList.innerHTML = '';
    const filteredTodos = todos.filter(todo => 
        currentFilter === 'all' || currentFilter === 'active' && !todo.completed || currentFilter === 'completed' && todo.completed
    );

    emptyState.classList.toggle('d-none', filteredTodos.length > 0);

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', todo.completed && 'completed');
        li.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <div>
                <button class="btn btn-success btn-sm me-2">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-danger btn-sm">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        li.querySelector('.btn-success').addEventListener('click', () => toggleCompleted(todo.id));
        li.querySelector('.btn-danger').addEventListener('click', () => deleteTodo(todo.id));
        todoList.appendChild(li);
    });
};

const addTodo = () => {
    const text = todoInput.value.trim();
    if (!text) return alert('Please enter a task');
    
    todos.push({ id: Date.now(), text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
};

const toggleCompleted = (id) => {
    todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
    saveTodos();
    renderTodos();
};

const deleteTodo = (id) => {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
};

const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos));

const setFilter = (filter) => {
    currentFilter = filter;
    filterButtons.forEach(button => button.classList.toggle('active', button.id === `filter-${filter}`));
    renderTodos();
};

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', e => e.key === 'Enter' && addTodo());
filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.id.split('-')[1])));

renderTodos();

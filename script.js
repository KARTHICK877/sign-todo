const signupPage = document.getElementById('signup-page');
const loginPage = document.getElementById('login-page');
const todoPage = document.getElementById('todo-page');

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const logoutButton = document.getElementById('logout');
const gotoLoginLink = document.getElementById('goto-login');
const gotoSignupLink = document.getElementById('goto-signup');

let currentUser = null;
let todos = [];

gotoLoginLink.addEventListener('click', () => {
    signupPage.style.display = 'none';
    loginPage.style.display = 'block';
    todoPage.style.display = 'none';
});

gotoSignupLink.addEventListener('click', () => {
    signupPage.style.display = 'block';
    loginPage.style.display = 'none';
    todoPage.style.display = 'none';
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value; // Get email input
    const password = document.getElementById('signup-password').value;
    
    // For simplicity, we'll just store the user in memory.
    currentUser = { username,email, password };
    
    signupPage.style.display = 'none';
    loginPage.style.display = 'block';
    todoPage.style.display = 'none';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Validate the login credentials.
    if (currentUser && currentUser.username === username && currentUser.password === password) {
        loginPage.style.display = 'none';
        todoPage.style.display = 'block';
        updateTodoList();
    }
});

logoutButton.addEventListener('click', () => {
    currentUser = null;
    todos = [];
    todoInput.value = '';
    todoList.innerHTML = '';
    loginPage.style.display = 'block';
    todoPage.style.display = 'none';
});

addTodoButton.addEventListener('click', () => {
    const newTodo = todoInput.value;
    if (newTodo.trim() !== '') {
        todos.push(newTodo);
        todoInput.value = '';
        updateTodoList();
    }
});

function updateTodoList() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const updatedTodo = prompt('Edit your todo:', todo);
            if (updatedTodo !== null) {
                todos[index] = updatedTodo;
                updateTodoList();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this todo?')) {
                todos.splice(index, 1);
                updateTodoList();
            }
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}
const taskInput = document.querySelector('.input-text');

const addForm = document.querySelector('.add-form');

const tasksContainer = document.querySelector('.tasks-list');

const deleteAllBtn = document.querySelector('.deleteAll-btn');

//Definir lista de tareas []
let tasksList = JSON.parse(localStorage.getItem('tasks')) || [];

// FUncion que guarda en el localstorage el array de tareas
const saveLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

// Funcion que crea el html de la tarea
const createTask = (task) => {
    const { name, id } = task;
    return `<li>${name}<img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-id="${id}">
    </li> `;
}


//Funcion que renderiza la lista de tareas
const renderTasksList = () => {
    tasksContainer.innerHTML = tasksList.map(task => createTask(task)).join('');
};


//Funcion que oculta o muestra el boton de borrar todas las tareas
const toggleDeleteAllBtn = () => {
    if (!tasksList.length) {
        deleteAllBtn.style.display = 'none';
    return;
    }
    deleteAllBtn.style.display = 'flex';
};




//Funcion que convierte el valor del taskInput en un string sin espacios al principio y al final
const correctInputValue = () => {
    return taskInput.value.trim().replace(/\s+/g, ' ');
};



//Funcion que verifica si la tarea ingresada es valida (no esta vacia y no esta repetida)
const isValidTask = (taskName) => {
    let isValid = true;
    if(!taskName.length) {
        alert('Por favor ingrese una tarea');
        isValid = false;
    } else if(
        tasksList.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
    ) {
        alert('La tarea ya existe');
        isValid = false;
    }
    return isValid;
};



//Funcion que agrega una tarea al array de tareas
const addTask = (e) => {
    e.preventDefault();
    const taskName = correctInputValue();
    if (isValidTask(taskName)) {
        tasksList = [...tasksList, { name: taskName, id: Date.now() }];
        addForm.reset();
        renderTasksList();
        saveLocalStorage();
        toggleDeleteAllBtn();
    }
}

//Funcion que elimina una tarea del array de tareas
const removeTask = (e) => {
    if (!e.target.classList.contains('delete-btn')) return;
    const filterId = Number(e.target.dataset.id);
    //Filtrando todas las tareas que no sean iguales al filterId
    tasksList = tasksList.filter((task) => task.id !== filterId);
    renderTasksList();
    saveLocalStorage();
    toggleDeleteAllBtn();
}



//Funcion que elimina todas las tareas del array de tareas
const removeAll = () => {
    tasksList = [];
    renderTasksList();
    saveLocalStorage();
    toggleDeleteAllBtn();
}


//Funcion que inicializa la app
const init = () => {
    document.addEventListener('DOMContentLoaded', renderTasksList);
    addForm.addEventListener('submit', addTask);
    tasksContainer.addEventListener('click', removeTask);
    deleteAllBtn.addEventListener('click', removeAll);
    document.addEventListener('DOMContentLoaded', toggleDeleteAllBtn);
}

init();
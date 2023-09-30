const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector('#bAdd');
const idTask = document.querySelector('#idTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTask();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (idTask.value != '') {
        createTask(idTask.value);
        idTask.value = "";
        renderTask();
    }
});

function createTask(value) {

    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
        ongoin: false
    }
    tasks.unshift(newTask);
}
function renderTask() {
    const html = tasks.map(task => {
        
        if(!task.ongoin){
            return `
            <div class="task">
                <div class="completed">${task.completed ? `<span class="done">Done</span>` : `<button class="start-button" data-id="${task.id}">start</button>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `;
        }else{
            return `
            <div class="task">
                <div class="completed">${task.ongoin ?  `<button class="start-button ongoin" data-id="${task.id}">In progress...</button>`: `<span class="done">Done</span>`}</div>
                <div class="title">${task.title}</div>
            </div>
        `;
        }
          
     
        
    });

    const taskConteiner = document.querySelector("#task");
    taskConteiner.innerHTML = html.join("");
    const startButtons = document.querySelectorAll('.task .start-button');
 
    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if (!timer) {
                const id = button.getAttribute('data-id');
            
                startButtonHandler(id);
                button.textContent = 'In progress...';
                button.className += " ongoin"
            }
        });
    });
}
function startButtonHandler(id) {


    time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id == id);

    taskName.textContent = tasks[taskIndex].title;
    renderTime();
    markOngoin(current);
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
};

function timeHandler(id) {
    time--;
    renderTime();

    if (time == 0) {
        clearInterval(timer);
        markCompleted(id);
        timer = null;

        renderTask();
        startBreak();

    }
}
function renderTime() {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:
        ${seconds < 10 ? "0" : ""}${seconds}`;
}

function markOngoin(id) {
    const taskIndex = tasks.findIndex((task) => task.id == id);
    console.log(tasks[taskIndex].ongoin = true);

}
function markCompleted(id) {
    const taskIndex = tasks.findIndex((task) => task.id == id);
    tasks[taskIndex].completed = true;

}

function startBreak() {
    time = 25 * 60;
    taskName.textContent = 'Break';
    renderTime();
    timerBreak = setInterval(() => {
        timeBreakHandler();
    }, 1000)
}

function timeBreakHandler() {
    time--;
    renderTime();

    if (time == 0) {
        clearInterval(timerBreak);
        current = null;

        taskName.textContent = "";
        renderTask();


    }
}
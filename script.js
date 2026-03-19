let todoInput = document.getElementById("todoInput");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");

// get saved todos
let todos = localStorage.getItem("todos");

if(todos){
    todos = JSON.parse(todos);
}else{
    todos = [];
}

// click event
addBtn.addEventListener("click", function(){
    addTask();
});

// add task function
function addTask(){

    let taskText = todoInput.value;

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskText,
        id: new Date().getTime()
    };

    todos.push(task);

    saveTasks();

    showTasks();

    todoInput.value = "";
}

// show tasks on screen
function showTasks(){

    todoList.innerHTML = "";

    for(let i = 0; i < todos.length; i++){

        let li = document.createElement("li");

        li.innerText = todos[i].text;

        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";

        deleteBtn.onclick = function(){
            removeTask(todos[i].id);
        };

        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    }
}

// delete task
function removeTask(id){

    let newList = [];

    for(let i = 0; i < todos.length; i++){
        if(todos[i].id !== id){
            newList.push(todos[i]);
        }
    }

    todos = newList;

    saveTasks();

    showTasks();
}

// save to local storage
function saveTasks(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

// load tasks when page opens
showTasks();
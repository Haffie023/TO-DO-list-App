document.addEventListener("DOMContentLoaded", function() {
    loadTasks(); // Load tasks from local storage when the page loads
  });
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      const taskList = document.getElementById("taskList");
      const newTask = document.createElement("li");
      newTask.innerHTML = `
        <span>${taskText}</span>
        <input type="text" class="editTaskInput" style="display:none;">
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
      `;
  
      taskList.appendChild(newTask);
      saveTask(taskText); // Save task to local storage
      taskInput.value = "";
    } else {
      alert("Please enter a task!");
    }
  }
  
  function editTask(button) {
    const listItem = button.parentNode;
    const taskSpan = listItem.querySelector("span");
    const editInput = listItem.querySelector(".editTaskInput");
  
    if (editInput.style.display === "none") {
      taskSpan.style.display = "none";
      editInput.style.display = "inline-block";
      editInput.value = taskSpan.innerText;
    } else {
      taskSpan.innerText = editInput.value;
      taskSpan.style.display = "inline";
      editInput.style.display = "none";
  
      updateTask(taskSpan.innerText, editInput.value); // Update task in local storage
    }
  }
  
  function deleteTask(button) {
    const listItem = button.parentNode;
    const taskText = listItem.querySelector("span").innerText;
    listItem.remove();
    removeTask(taskText); // Remove task from local storage
  }
  
  function saveTask(task) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  function loadTasks() {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      const taskList = document.getElementById("taskList");
      tasks.forEach(task => {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
          <span>${task}</span>
          <input type="text" class="editTaskInput" style="display:none;">
          <button onclick="editTask(this)">Edit</button>
          <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(newTask);
      });
    }
  }
  
  function updateTask(oldTask, newTask) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      const index = tasks.indexOf(oldTask);
      if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  }
  
  function removeTask(taskToRemove) {
    let tasks = [];
    if (localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      const index = tasks.indexOf(taskToRemove);
      if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    }
  }
  
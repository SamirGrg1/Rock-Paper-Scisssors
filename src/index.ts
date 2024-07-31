interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }
  
  class TaskManager {
    tasks: Task[] = [];
  
    constructor() {
        this.loadTasks();
        this.addEventListeners();
    }
  
    addEventListeners() {
        document.getElementById('task-form')?.addEventListener('submit', this.addTask.bind(this));
    }
  
    addTask(event: Event) {
        event.preventDefault();
        const title = (document.getElementById('task-title') as HTMLInputElement).value;
        const description = (document.getElementById('task-desc') as HTMLTextAreaElement).value;
        const dueDate = (document.getElementById('task-date') as HTMLInputElement).value;
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            dueDate,
            completed: false,
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
    }
  
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  
    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
        this.renderTasks();
    }
  
    renderTasks() {
        const taskList = document.getElementById('task-list');
        if (taskList) {
            taskList.innerHTML = this.tasks.map(task => `
                <div class="task ${task.completed ? 'completed' : ''}">
                    <span>${task.title}</span>
                    <button onclick="taskManager.toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="taskManager.deleteTask(${task.id})">Delete</button>
                </div>
            `).join('');
        }
    }
  
    toggleTask(id: number) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }
  
    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
  }
  
  const taskManager = new TaskManager();

  
  
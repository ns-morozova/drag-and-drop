import AppState from "./AppState";
import TaskController from "./TaskController";

export default class CardController {
    constructor(element) {
        this.card = element;
        this.ul = this.card.querySelector('.tasks');
        this.onClickAddTask = this.onClickAddTask.bind(this);
        this.card.querySelector('.task-add-title').addEventListener('click', this.onClickAddTask);
        this.onClickBtnAdd = this.onClickBtnAdd.bind(this);
        this.card.querySelector('.task-add-btn').addEventListener('click', this.onClickBtnAdd);
        this.onClickCloseAdd = this.onClickCloseAdd.bind(this);
        const close = this.card.querySelector('.close-new-task');
        close.addEventListener('click', this.onClickCloseAdd);
        this.tasks = [];
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.card.addEventListener('deleteTask', this.onDeleteTask);
    }

    onClickAddTask(event) {
        event.preventDefault();
        const link = this.card.querySelector('.task-add-new');
        link.classList.add('hidden');
        const newTask = this.card.querySelector('.task-add');
        newTask.classList.remove('hidden');
    }

    onClickBtnAdd(event) {
        event.preventDefault();
        const inp = this.card.querySelector('.task-descr');
        const taskDom = document.querySelector('.templ').cloneNode(true);
        taskDom.classList.remove('templ');
        const taskName = taskDom.querySelector('.task-name');
        taskName.textContent = inp.value;
        inp.value = '';
        this.ul.append(taskDom);
        this.tasks.push(new TaskController(taskDom));

        const link = this.card.querySelector('.task-add-new');
        link.classList.remove('hidden');
        const newTask = this.card.querySelector('.task-add');
        newTask.classList.add('hidden');
        
        AppState.saveState();
    }

    onClickCloseAdd(event) {
        event.preventDefault();
        const link = this.card.querySelector('.task-add-new');
        link.classList.remove('hidden');
        const newTask = this.card.querySelector('.task-add');
        newTask.classList.add('hidden');
    }

    onDeleteTask(event) {
        event.preventDefault();
        event.target.remove();
        AppState.saveState();
    }
}
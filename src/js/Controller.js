import TaskController from "./TaskController";
import AppState from "./AppState";

export default class Controller {
    constructor(cards) {
        this.cards = cards;    //колонки
        this.copy;
        this.task;
        this.shiftX;
        this.shiftY;

        this.onMouseDown = this.onMouseDown.bind(this);
        const cardsDom = document.querySelector('.cards');
        cardsDom.addEventListener('taskmousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        for (let cardObj of this.cards) {
            cardObj.card.addEventListener('mouseover', this.onMouseOver.bind(this));
            //cardObj.card.addEventListener('mouseout', this.onMouseOut.bind(this));
        }

    }

    init() {
        const dataStorage = AppState.loadState();
        if (!dataStorage) {
            return;
        }
        const data = JSON.parse(dataStorage);
        for (let cardData of data) {
            let cardCtrl = this.cards.find((item) => item.card.id === cardData.id);
            const ul = cardCtrl.card.querySelector('.tasks');
            for (let objTask of cardData.tasks) {
                const taskDom = document.querySelector('.templ').cloneNode(true);
                taskDom.classList.remove('templ');
                const taskName = taskDom.querySelector('.task-name');
                taskName.textContent = objTask.descr;
                ul.append(taskDom);
                cardCtrl.tasks.push(new TaskController(taskDom));
            }
        }
    }

    onMouseOver(event) {
        event.preventDefault();
        if (!this.copy) {
            return;
        }

        const ul = event.currentTarget.querySelector('.tasks');
        if (event.target.closest('.card-header')) {
            ul.prepend(this.task);
            return;
        }
        if (event.target.closest('.task-add-new')) {
            ul.append(this.task);
            return;
        }

    }

    onMouseOut(event) {
        event.preventDefault();
        if (!this.copy) {
            return;
        }
        console.log('отведение');

    }

    onMouseDown(event) {
        event.preventDefault();
        this.task = event.detail.target;
        this.copy = this.task.cloneNode(true);
        document.body.classList.add('_grabbing');
        this.task.classList.add('_ghost');
        this.copy.classList.add('_drag');
        document.body.append(this.copy);
        this.shiftX = event.detail.clientX - this.task.getBoundingClientRect().left;
        this.shiftY = event.detail.clientY - this.task.getBoundingClientRect().top;
        this.moveAt(event.detail.pageX, event.detail.pageY);


    }

    onMouseUp(event) {
        event.preventDefault();
        if (this.copy) {
            this.copy.remove();
            this.copy = null;
            this.task.classList.remove('_ghost');
            AppState.saveState();
            document.body.classList.remove('_grabbing');
        }
    }

    onMouseMove(event) {
        event.preventDefault();
        if (!this.copy) {
            return;
        }
        this.moveAt(event.pageX, event.pageY);

        const li = event.target.closest('.task');
        if (li) {
            const coordsMovedCard = li.getBoundingClientRect();
            const coordsAboutCenter = event.pageY - (coordsMovedCard.bottom - coordsMovedCard.height / 2);
            if (coordsAboutCenter < 0) {
                li.insertAdjacentElement('beforeBegin', this.task);
            }
            if (coordsAboutCenter > 0) {
                li.insertAdjacentElement('afterEnd', this.task);
            }
        }


    }

    moveAt(pageX, pageY) {
        this.copy.style.left = pageX - this.shiftX + 'px';
        this.copy.style.top = pageY - this.shiftY + 'px';
    }

}
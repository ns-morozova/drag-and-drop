export default class TaskController {
    constructor(element) {
        this.task = element;
        this.close = this.task.querySelector('.icon-close');
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.task.addEventListener('mouseenter', this.onMouseEnter);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.task.addEventListener('mouseleave', this.onMouseLeave);
        this.onClickClose = this.onClickClose.bind(this);
        const img = this.task.querySelector('.icon-close');
        img.addEventListener('click', this.onClickClose);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.task.addEventListener('mousedown', this.onMouseDown);
        
    }

    onMouseEnter(event) {
        event.preventDefault();
        this.close.classList.remove('hidden');
    }

    onMouseLeave(event) {
        event.preventDefault();
        this.close.classList.add('hidden');
    }

    onClickClose(event) {
        event.preventDefault();
        this.task.dispatchEvent(new CustomEvent("deleteTask", { 'bubbles': true,'cancelable': true}));
    }

    onMouseDown(event) {
        event.preventDefault();
        if(event.target.classList.contains('icon-close')) {
            return;
        }
        this.task.dispatchEvent(new CustomEvent("taskmousedown", { 'bubbles': true, 'cancelable': true,'detail': {'clientX': event.clientX, 'clientY': event.clientY, 'target': event.currentTarget, 'pageX': event.pageX, 'pageY': event.pageY}}));
    }
}
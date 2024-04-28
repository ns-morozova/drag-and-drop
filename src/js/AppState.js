export default class AppState {
    constructor() {

    }

    static loadState() {
        return localStorage.getItem('data');
    }

    static saveState() {
        const state = [];
        const cards = document.querySelectorAll('.card');
        for(let card of cards) {
            let arrTasks = [];
            const tasks = card.querySelectorAll('.task');
            for(let task of tasks) {
                let span = task.querySelector('.task-name');
                arrTasks.push({'descr': span.outerText});
            }
            state.push({'id': card.id, 'tasks': arrTasks});
        }
        
        localStorage.setItem('data', JSON.stringify(state));
    }
}
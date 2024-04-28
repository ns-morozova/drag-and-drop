import Controller from "./Controller";
import CardController from "./CardController";

const cards = [];
cards.push(new CardController(document.getElementById('to-do')));
cards.push(new CardController(document.querySelector('#in-progress')));
cards.push(new CardController(document.querySelector('#done')));

const ctrl = new Controller(cards);
ctrl.init();

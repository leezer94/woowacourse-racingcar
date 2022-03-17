import { Controller } from './Controller/Controller.js';
import { Model } from './Model/Model.js';
import { View } from './View/View.js';

class App {
  constructor() {
    const model = new Model();
    const view = new View();

    new Controller(model, view);
  }
}

new App();

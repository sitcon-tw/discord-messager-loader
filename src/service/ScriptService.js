//@ts-check
import AbstractService from './AbstractService';
import ControllerExecutor from './controller/ControllerExecutor';

export default class extends AbstractService{

    static getName() {
        return "ScriptService";
    }

    constructor() {
        super();
        this.controllers = new Map();
    }

    addScript(id, aClass) {
        this.controllers.set(id, aClass);
    }

    hasScript(id) {
        return this.controllers.has(id);
    }

    getScript(id) {
        return this.controllers.get(id);
    }

    getScriptExecutor(id, parameterMap) {
        let controllerClass = this.getScript(id);
        return new ControllerExecutor(controllerClass, parameterMap);
    }
}
export default class {
    constructor(controllerClass, parameterMap) {
        let controller = new controllerClass();
        this.controllerClass = controllerClass;
        this.controller = controller;
        this.parameterMap = parameterMap;
        this.logger = FOSRequire("LoggerService").buildLogger("ControllerExecutor");
    }

    execute(params) {
        this.logger.info("Starting " + this.controllerClass.getType().toLowerCase() + " executor: " + this.controllerClass.getName());
        return this.controller.run(params);
    }
}
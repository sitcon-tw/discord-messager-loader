//@ts-check
import ControllerService from "./ControllerService";
import ScriptService from "./ScriptService";
import AbstractService from "./AbstractService";

export default class extends AbstractService{

    static getName() {
        return "EndpointService"
    }

    constructor() {
        super();
        /**@type {ControllerService} controllerService */
        this.controllerService = (FOSRequire("ControllerService"));
        /**@type {ScriptService} scriptService */
        this.scriptService = (FOSRequire("ScriptService"));
    }

    /**
     * 
     * @param {string} id script or controller id
     * @param {Map} parameterMap parameters prepared to be placed in the controller
     * @param {string} source endpoint source name
     */
    call(id, parameterMap, source) {
        this.config.session.source = source;
        
        if (id.startsWith("script:")) {
            id = id.substring(7);
            if (this.scriptService.hasScript(id)) {
                let message = "Endpoint called the script: " + id
                if (typeof parameterMap !== "undefined") message += " with parameters -> " + [...parameterMap.entries()]
                this.logger.debug(message);
                return this.scriptService.getScriptExecutor(id, parameterMap).execute();
            }
        } else if (id.startsWith("controller:")) {
            id = id.substring(11);
            if (this.controllerService.hasController(id)) {
                let message = "Endpoint called the script: " + id
                if (typeof parameterMap !== "undefined") message += " with parameters -> " + [...parameterMap.entries()]
                this.logger.debug(message);
                return this.controllerService.getControllerExecutor(id, parameterMap).execute();
            }
        }
    }
}
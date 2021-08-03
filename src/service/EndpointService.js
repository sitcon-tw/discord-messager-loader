//@ts-check
import ScriptService from "./ScriptService";
import AbstractService from "./AbstractService";

export default class extends AbstractService{

    static getName() {
        return "EndpointService"
    }

    constructor() {
        super();
        /**@type {ScriptService} scriptService */
        this.scriptService = (FOSRequire("ScriptService"));
    }

    /**
     * 
     * @param {string} id script or controller id
     * @param {any} params parameters prepared to be placed in the controller
     * @param {string} source endpoint source name
     */
    call(id, params, source) {
        this.config.session.source = source;
        
        if (id.startsWith("script:")) {
            id = id.substring(7);
            if (this.scriptService.hasScript(id)) {
                return this.scriptService.getScriptExecutor(id).execute(params);
            }
        }
    }
}
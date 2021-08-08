// import LoggerService from './service/LoggerService';
import ScriptService from './service/ScriptService';
import EndpointService from './service/EndpointService';

let loggerService = FOSRequire("LoggerService");
let FOSLogger = loggerService.buildLogger("Dependency");
FOSLogger.info("Initializing dependencies");

let requireService = FOSRequire("RequireService");

let modelService = new ModelService();
requireService.addComponent("ModelService", modelService);

let scriptService = new ScriptService();
requireService.addComponent("ScriptService", scriptService);

let endpointService = new EndpointService();
requireService.addComponent("EndpointService", endpointService);


FOSLogger.info("Initializing other dependencies");

let messageLoaderService = new MessageLoaderService();
requireService.addComponent("MessageLoaderService", messageLoaderService);

//Import Dependency Test
import TestService from './service/TestService';
import ModelService from './service/ModelService';
import MessageLoaderService from './service/MessageLoaderService';
let testService = new TestService();

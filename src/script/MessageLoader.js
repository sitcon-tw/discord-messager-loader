const { AbstractScript, Script } = require("./AbstractScript");

@Script
class MessageLoader extends AbstractScript {
    constructor() {
        super();
        this.logger = FOSRequire("LoggerService").buildLogger("TestScript");
    }

    run(params) {
        let messages = FOSRequire("MessageLoaderService").getMessage(params.start[0], params.end[0])
        return ContentService.createTextOutput(JSON.stringify(messages));
    }

    static getName() {
        return "MessageLoader";
    }
}

export { MessageLoader };
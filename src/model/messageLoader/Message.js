//@ts-check

const { AbstractModel, Model } = require("../AbstractModel");

// @Model
class Message extends AbstractModel {

    constructor() {
        super();

        /**@type {string} */
        this.personId = null;
        this.content = null;
        this.noDelay = null;
    }

    static getName() {
        return "TestModel";
    }
}

export {Message}
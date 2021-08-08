//@ts-check

const { AbstractModel, Model } = require("../AbstractModel");

// @Model
class Person extends AbstractModel {

    constructor() {
        super();

        /**@type {string} */
        this.personId = null;
        this.username = null;
        this.avatarUrl = null;
    }

    static getName() {
        return "TestModel";
    }
}

export {Person}
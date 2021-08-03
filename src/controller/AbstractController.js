class AbstractController {
    constructor() {
        if (this.constructor == AbstractController) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    run() {
        throw new Error("Method 'run()' must be implemented.");
    }

    static getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }

    /**
     * @returns {string}
     */
    static getDependencies() {
        return "None";
    }

    /**
     * @returns {string}
     */
    static getType() {
        return "Controller";
    }
}

export {AbstractController}
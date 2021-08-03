//@ts-check
import { customAlphabet } from 'nanoid/non-secure'
import sheetUtil from './util/SheetUtil';

const secret = {
    admin: {
        name: "小知"
    },
    config:{
        sheet: "1PhN_QB1FZ_zimUuhB1VTPyyAzMS3gujxnJWq3FiYrag"
    }
}

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 5);
const session = {
    source: "unknow",
    session: nanoid(),
}

const configSpreadsheet = SpreadsheetApp.openById(secret.config.sheet);
const config = sheetUtil.getAllKeyValue(configSpreadsheet.getSheetByName("global"),
    sheetUtil.prefixAndImportOptions(configSpreadsheet));

/**
 * getLocalConfig
 * @param {string} name service name
 * @returns {(key:string) => string}
 */
const getLocalConfig = (name) => {
    return (key) => {
        return config.get(name + "." + key);
    }
}

/**
 * hasLocalConfig
 * @param {string} name service name
 * @returns {(key:string) => boolean}
 */
const hasLocalConfig = (name) => {
    return (key) => {
        return config.has(name + "." + key);
    }
}

/**
 * @returns {(key:string, value:string) => void}
 */
const createConfig = () => {
    return (key, value) => {
        let sheet = configSpreadsheet.getSheetByName("global");
        if (!config.has(key)) sheetUtil.insertKeyValue(sheet, key, value);
    }
}

/**
 * createLocalConfig
 * @param {string} name service name
 * @returns {(key:string, value:string) => void}
 */
const createLocalConfig = (name) => {
    return (key, value) => {
        if (configSpreadsheet.getSheetByName(name) != null) {
            let sheet = configSpreadsheet.getSheetByName(name);
            if (!config.has(key)) sheetUtil.insertKeyValue(sheet, key, value);
        } else {
            let sheet = configSpreadsheet.getSheetByName("global");
            if (!config.has(key)) sheetUtil.insertKeyValue(sheet, name + "." + key, value);
        }
    }
}

/**
 * @returns {(key:string, value:string) => void}
 */
const updateConfig = () => {
    return (key, value) => {
        let sheet = configSpreadsheet.getSheetByName("global");
        sheetUtil.safeInsertKeyValue(sheet, key, value, true);
    }
}

/**
 * updateLocalConfig
 * @param {string} name service name
 * @returns {(key:string, value:string) => void}
 */
const updateLocalConfig = (name) => {
    return (key, value) => {
        if (configSpreadsheet.getSheetByName(name) != null) {
            let sheet = configSpreadsheet.getSheetByName(name);
            sheetUtil.safeInsertKeyValue(sheet, key, value, true);
        } else {
            let sheet = configSpreadsheet.getSheetByName("global");
            sheetUtil.safeInsertKeyValue(sheet, name + "." + key, value, true);
        }
    }
}

export default {
    secret: secret,
    session: session,
    config: config,
    configSpreadsheet: configSpreadsheet,
    getLocalConfig: getLocalConfig,
    hasLocalConfig: hasLocalConfig,
    createConfig: createConfig,
    createLocalConfig: createLocalConfig,
    updateConfig: updateConfig,
    updateLocalConfig: updateLocalConfig,
}
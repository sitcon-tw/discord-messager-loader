//@ts-check
import { Message } from '../model/messageLoader/Message';
import { Person } from '../model/messageLoader/Person';
import AbstractService from './AbstractService';
import ModelEntitySource from './entity/ModelEntitySource';
import ColumnDefine from './spreadsheet/ColumnDefine';
import SheetDefine from './spreadsheet/SheetDefine';

let _ = require('lodash');

export default class extends AbstractService {

    static getName() {
        return "MessageLoaderService";
    }

    constructor() {
        super();

        this.localConfig = this.config.getLocalConfig("message");
    }

    /**
     * getMessage
     * @param {number} start 
     * @param {number?} end 
     */
    getMessage(start, end) {

        start -= 2;
        end -= 2;

        let spreadsheet = this.loadDefaultSpreadsheet();
        let persons = this.loadPersons(spreadsheet);
        let messages = this.loadMessages(spreadsheet);
        let webhookMessages = this.mappingModel(persons, messages);
        webhookMessages = _.drop(webhookMessages, start);
        webhookMessages = _.dropRight(webhookMessages, webhookMessages.length - (end + 1 - start));
        return webhookMessages;
    }

    /**
     * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet}
     */
    loadDefaultSpreadsheet() {
        return SpreadsheetApp.openById(this.localConfig("spreadsheet.id"));
    }

    /**
     * loadPersons
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet 
     * @returns {Person[]}
     */
    loadPersons(spreadsheet) {
        let columnDefines = [];
        columnDefines.push(new ColumnDefine("人物ID", "personId"));
        columnDefines.push(new ColumnDefine("人物姓名", "username"));
        columnDefines.push(new ColumnDefine("人物頭像", "avatarUrl"));
    
        let sheetDefine = new SheetDefine("Person", 0, 0, 1, columnDefines);
        let sheet = spreadsheet.getSheetByName("人物");
        let range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        let modelEntitySource = new ModelEntitySource(Person, range, sheetDefine);
        
        /** @type {Person[]} */
        let persons = (modelEntitySource.getModels());

        return persons;
    }

    /**
     * loadPersons
     * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet 
     * @returns {Message[]}
     */
    loadMessages(spreadsheet) {
        let columnDefines = [];
        columnDefines.push(new ColumnDefine("人物ID", "personId"));
        columnDefines.push(new ColumnDefine("推送訊息", "content"));
        columnDefines.push(new ColumnDefine("hasDelay", "hasDelay"));
    
        let sheetDefine = new SheetDefine("Message", 0, 0, 1, columnDefines);
        let sheet = spreadsheet.getSheetByName("推送訊息");
        let range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
        let modelEntitySource = new ModelEntitySource(Message, range, sheetDefine);
        
        /** @type {Message[]} */
        let messages = (modelEntitySource.getModels());

        return messages;
    }

    /**
     * 
     * @param {Person[]} persons 
     * @param {Message[]} messages
     */
    mappingModel(persons, messages) {
        let webhookMessages = [];

        messages.forEach((message) => {
            let webhookMessage = {};
            if (message.hasDelay === "" || message.hasDelay === true) {
                webhookMessage.hasDelay = true
            } else {
                webhookMessage.hasDelay = message.hasDelay;
            }

            let person = _.find(persons, { personId: message.personId });
            if (person !== undefined) {
                webhookMessage.username = person.username;
                webhookMessage.avatarUrl = person.avatarUrl;
                webhookMessage.content = message.content;
            } else if (message.personId !== "") {
                webhookMessage.username = message.personId;
                webhookMessage.content = message.content;
            } else {
                webhookMessage.username = "unknow";
                webhookMessage.content = message.content;
            }

            webhookMessages.push(webhookMessage);
        })

        return webhookMessages;
    }

}

/**
 * This callback is displayed as a global member.
 * @callback localConfigMethod
 * @param {string} key
 * @return {?string} value
 */

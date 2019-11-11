const Telegraf = require('telegraf')
const Stage = require('telegraf/stage');
const Markup = require('telegraf/markup');

const {loginWizard} = require('./src/wizards/login')
const {registration} = require('./src/wizards/registration')

module.exports = class CheckBot extends Telegraf {
    constructor() {
        super(...arguments)
    }

    startLog() {
        console.log('yo')
    }
}
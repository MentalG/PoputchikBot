const Telegraf = require('telegraf')
const Stage = require('telegraf/stage');
const session = require('telegraf/session')
const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');
const { leave } = Stage

const { loginWizard } = require('./src/wizards/login')
const { registrationWizard } = require('./src/wizards/registration')

module.exports = class CheckBot extends Telegraf {
    constructor () {
        super(...arguments)
    }

    mount () {
        const test = new WizardScene('test-scene', {},
            new Composer(
                (ctx) => {
                    ctx.replyWithMarkdown('ID?', Markup.keyboard([
                        Markup.callbackButton('Yes', 'login'),
                        Markup.callbackButton('No', 'registration')
                    ]).extra());
                    return ctx.wizard.next();
                }
            ),
            new Composer(
                Composer.hears(/Yes/ , (ctx) => {
                    ctx.wizard.state.type = 'login';
                    ctx.scene.enter('login-wizard')
                }),
                Composer.hears(/No/, (ctx) => {
                    ctx.wizard.state.type = 'registration';
                    ctx.scene.enter('registration-wizard')
                }),
            )
        )



        const stage = new Stage([test, loginWizard, registrationWizard])
        stage.command('cancel', leave())

        this.use(session())
        this.use(stage.middleware())
        this.command('start', (ctx) => ctx.scene.enter('test-scene'))
    }
}
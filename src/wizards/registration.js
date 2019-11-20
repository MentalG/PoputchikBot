const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');

module.exports.registrationWizard = new WizardScene('registration-wizard', {},
    new Composer(
        (ctx) => {
            ctx.wizard.next()
            ctx.replyWithMarkdown('Кто вы??',
                Markup.keyboard([
                    Markup.callbackButton('Водител', 'driver-reg'),
                    Markup.callbackButton('Пассажир', 'passenger-reg')
                ]).extra());
        }
    ),
        
    new Composer(
        Composer.hears('Водител', (ctx) => {
            ctx.wizard.state.type = 'driver-reg';
            ctx.replyWithMarkdown('Модель машины?',
            Markup.keyboard([
                Markup.callbackButton('Подтвердить', 'set-car-model'),
            ]).extra());
            ctx.wizard.next()
        }),
        Composer.hears('Пассажир', (ctx) => {
            ctx.scene.enter('test-scene')
        })
    ),

    new Composer(
        Composer.hears('Подтвердить', (ctx) => {
            ctx.wizard.state.type = 'set-car-model';
            ctx.replyWithMarkdown('Изображение машины?',
            Markup.keyboard([
                Markup.callbackButton('Подтвердить', 'set-car-image'),
            ]).extra());
            ctx.wizard.next()
        }),
        ),
        
        new Composer(
            Composer.hears('Подтвердить', (ctx) => {
                ctx.scene.enter('test-scene')
        })
    )
)
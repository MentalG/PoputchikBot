const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');

module.exports.registrationWizard = new WizardScene('registration-wizard', {},
    new Composer(
        (ctx) => {
            ctx.wizard.next()
            ctx.replyWithMarkdown('Кто вы??',
                Markup.inlineKeyboard([
                    Markup.callbackButton('Водител', 'driver-reg'),
                    Markup.callbackButton('Пассажир', 'passenger-reg')
                ]).extra());
        }
    ),
        
    new Composer(
        Composer.action('driver-reg', (ctx) => {
            ctx.wizard.state.type = 'driver-reg';
            ctx.replyWithMarkdown('Модель машины?',
            Markup.inlineKeyboard([
                Markup.callbackButton('Подтвердить', 'set-car-model'),
            ]).extra());
            ctx.wizard.next()
        }),
        Composer.action('passenger-reg', (ctx) => {
            ctx.scene.enter('test-scene')
        })
    ),

    new Composer(
        Composer.action('set-car-model', (ctx) => {
            ctx.wizard.state.type = 'set-car-model';
            ctx.replyWithMarkdown('Изображение машины?',
            Markup.inlineKeyboard([
                Markup.callbackButton('Подтвердить', 'set-car-image'),
            ]).extra());
            ctx.wizard.next()
        }),
        ),
        
        new Composer(
            Composer.action('set-car-image', (ctx) => {
                ctx.scene.enter('test-scene')
        })
    )
)
const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');

module.exports.loginWizard = new WizardScene('login-wizard', {},
    new Composer(
        (ctx) => {
            ctx.replyWithMarkdown('Кто вы?',
                Markup.inlineKeyboard([
                    Markup.callbackButton('Водитель', 'driver-login'),
                    Markup.callbackButton('Пассажир', 'passenger-login')
                ]).extra());
            return ctx.wizard.next();
        }
    ),

    new Composer(
        Composer.action('driver-login', (ctx) => {
            ctx.replyWithMarkdown('Меню',
                Markup.inlineKeyboard([
                    Markup.callbackButton('Назначить поездку', 'set-drive'),
                    Markup.callbackButton('Изменить изображение автомобиля', 'change-car-image'),
                    Markup.callbackButton('Изменить модель', 'change-car-model'),
                ]).extra());
        }),
        Composer.action('passenger-login', (ctx) => {
            ctx.scene.enter('test-scene')
        }),
    )
)
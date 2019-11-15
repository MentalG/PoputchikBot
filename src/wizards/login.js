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
                ctx.wizard.next()
        }
    ),

    new Composer(
        Composer.action('driver-login', (ctx) => {
            ctx.replyWithMarkdown('Меню',
                Markup.inlineKeyboard([
                    Markup.callbackButton('Назначить поездку', 'set-ride'),
                    Markup.callbackButton('Изменить изображение автомобиля', 'change-car-image'),
                    Markup.callbackButton('Изменить модель', 'change-car-model'),
                ]).extra());
                ctx.wizard.next()
        }),
        Composer.action('passenger-login', (ctx) => {
            ctx.scene.enter('test-scene')
        }),
    ),

    new Composer(
        Composer.action('set-ride', (ctx) => {
            ctx.replyWithMarkdown('Назначить поездку')
            ctx.wizard.next()
        }),
        Composer.action('change-car-image', (ctx) => {
            ctx.replyWithMarkdown('Изменить изображение автомобиля',
                Markup.inlineKeyboard([
                    Markup.callbackButton('Подтвердить', 'driver-login'),
                ]).extra());
            ctx.wizard.back()
        }),
        Composer.action('change-car-model', (ctx) => {
            ctx.replyWithMarkdown('Изменить модель',
                Markup.inlineKeyboard([
                    Markup.callbackButton('Подтвердить', 'driver-login'),
                ]).extra());
            ctx.wizard.back()
        }),
    ),

    new Composer(
        (ctx) => {
            console.log(ctx.message.location);
        }
    )
)
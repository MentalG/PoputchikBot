const Markup = require('telegraf/markup');
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');

module.exports.loginWizard = new WizardScene('login-wizard', {},
    new Composer(
        (ctx) => {
            ctx.replyWithMarkdown('Кто вы?',
                Markup.keyboard([
                    Markup.callbackButton('Водитель', 'driver-login'),
                    Markup.callbackButton('Пассажир', 'passenger-login')
                ]).extra());
                ctx.wizard.next()
        }
    ),

    new Composer(
        Composer.hears(/Водитель|Подтвердить/, (ctx) => {
            ctx.replyWithMarkdown('Меню',
                Markup.keyboard([
                    Markup.callbackButton('Назначить поездку', 'set-ride'),
                    Markup.callbackButton('Изменить изображение автомобиля', 'change-car-image'),
                    Markup.callbackButton('Изменить модель', 'change-car-model'),
                ]).extra());
                ctx.wizard.next()
        }),
        Composer.hears(/Пассажир/, (ctx) => {
            ctx.scene.enter('test-scene')
        }),
    ),

    new Composer(
        Composer.hears(/Назначить поездку/, (ctx) => {
            ctx.replyWithMarkdown('Назначить поездку')
            ctx.wizard.next()
        }),
        Composer.hears(/Изменить изображение автомобиля/, (ctx) => {
            ctx.replyWithMarkdown('Изменить изображение автомобиля',
                Markup.keyboard([
                    Markup.callbackButton('Подтвердить', 'driver-login'),
                ]).extra());
            ctx.wizard.back()
        }),
        Composer.hears(/Изменить модель/, (ctx) => {
            ctx.replyWithMarkdown('Изменить модель',
                Markup.keyboard([
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
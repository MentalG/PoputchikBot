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
            return ctx.wizard.next()
        }
    ),

    new Composer(
        Composer.action('driver-reg', (ctx) => {
            console.log(ctx)
        }),
        Composer.action('passenger-reg', (ctx) => {
            console.log(ctx)
        }),
    )

    // new Composer(
    //     Composer.action('driver-reg', (ctx) => {
    //         ctx.replyWithMarkdown('Модель машины?',
    //             Markup.inlineKeyboard([
    //                 Markup.callbackButton('Подтвердить', 'set-car-model'),
    //             ]).extra());
    //     }),
    //     Composer.action('passenger-reg', (ctx) => {
    //         ctx.scene.enter('test-scene')
    //     })
    // ),

    // new Composer(
    //     Composer.action('set-car-model', (ctx) => {
    //         ctx.wizard.state.type = 'set-car-model';
    //         ctx.wizard.next();
    //     }),
    //     () => 0,
    // ),

    // new Composer(
    //     (ctx) => {
    //         ctx.replyWithMarkdown('Изображение машины?',
    //             Markup.inlineKeyboard([
    //                 Markup.callbackButton('Подтвердить', 'set-car-image'),
    //             ]).extra());
    //         return ctx.wizard.next();
    //     }
    // ),
    // new Composer(
    //     Composer.action('set-car-image', (ctx) => {
    //         ctx.wizard.state.type = 'set-car-image';
    //         ctx.scene.enter('test-scene')
    //     }),
    //     () => 0,
    // )
)
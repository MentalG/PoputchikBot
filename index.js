const CheckBot = require('./checkbot')

const bot = new CheckBot('1008383811:AAHJK82XBr8yhPGr9AHaJqAymMi_f9bxll8')

bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    bot.startLog()
    const ms = new Date() - start
    // console.log('Response time: %sms', ms)
    // ctx.reply(ms)
})


bot.command('start', (ctx) => {})
    // console.log(ctx)})
bot.launch()
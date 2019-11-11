require('dotenv/config')

const CheckBot = require('./checkbot')
const bot = new CheckBot(process.env.API_KEY)

bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    console.log('Yess boosss');
    bot.startLog()
    const ms = new Date() - start
    // console.log('Response time: %sms', ms)
    // ctx.reply(ms)
})


bot.command('start', (ctx) => {})
    // console.log(ctx)})
bot.launch()
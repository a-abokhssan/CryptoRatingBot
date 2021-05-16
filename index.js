const { Telegraf } = require("telegraf");

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "1690572286:AAG60I8zQQcmaQNkE_K1WtMajIDH3Il3zxQ";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply("Welcome to CryptoRating Bot!");
});
bot.startPolling();

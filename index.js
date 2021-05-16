const { Telegraf } = require("telegraf");
const axios = require("axios");

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "1690572286:AAG60I8zQQcmaQNkE_K1WtMajIDH3Il3zxQ";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
  return ctx.reply("Welcome to CryptoRating Bot!");
});

bot.command("rates", async (ctx) => {
  let qs = `?start=1&limit=10&convert=USD`;

  try {
    let res = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest" +
        qs,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "03cd5146-2aff-4715-88ca-0e2acbffe9b7",
        },
      }
    );
    return ctx.reply(
      `${res.data.data
        .map(
          (it) =>
            `${it.symbol} | 🇺🇸 ${it.quote["USD"].price.toFixed(2)} | ${it.quote[
              "USD"
            ]["percent_change_24h"].toFixed(2)}%`
        )
        .join("\n")}`
    );
  } catch (err) {
    console.log(err);
  }
});

bot.startPolling();

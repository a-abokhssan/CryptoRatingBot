const { Telegraf } = require("telegraf");
const axios = require("axios");

require("dotenv").config();

const { BOT_TOKEN } = process.env;
const bot = new Telegraf(BOT_TOKEN);

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

    let data = res.data.data;
    let result = data
      .map((it) => {
        let symb = it.symbol;
        let usdPrice = it.quote["USD"].price.toFixed(2);
        let diffPercent = it.quote["USD"]["percent_change_24h"].toFixed(2);
        let diagram = diffPercent > 0 ? "📈" : "📉";

        return `${symb} | 🇺🇸 ${usdPrice} | ${diagram} ${diffPercent}%`;
      })
      .join("\n");

    return ctx.reply(`${result}`);
  } catch (err) {
    console.log(err);
  }
});

bot.startPolling();

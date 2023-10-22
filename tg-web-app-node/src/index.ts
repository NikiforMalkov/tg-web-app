import * as TelegramBot from 'node-telegram-bot-api';
import * as express from 'express';
import * as cors from 'cors';
import * as i18next from 'i18next';
import './i18n/config';
import 'dotenv/config';

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on("polling_error", console.log);

bot.on('message', async (msg:TelegramBot.Message) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if (msg?.from?.language_code != undefined && ["en", "ru"].includes(msg?.from?.language_code)) {
        i18next.changeLanguage(msg?.from?.language_code)
    }


    if(text === '/start') {
        await bot.sendMessage(chatId, i18next.t("button_fill_form"), {
            reply_markup: {
                keyboard: [
                    [
                        {text: i18next.t("fill_form"), web_app: {url: webAppUrl + '/form'}},
                    ]
                ]
            }
        })

        await bot.sendMessage(chatId, i18next.t("go_to_store"), {
            reply_markup: {
                inline_keyboard: [
                    [{text: i18next.t("make_order"), web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if (text == '/inline') {
        //InlineKeyboardButton
        /*
        let btn = {
            text: "button"
            url?: string | undefined;
            callback_data?: string | undefined;
            web_app?: WebAppInfo;
            login_url?: LoginUrl | undefined;
            switch_inline_query?: string | undefined;
            switch_inline_query_current_chat?: string | undefined;
            callback_game?: CallbackGame | undefined;
            pay?: boolean | undefined;
        }
        */
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            await bot.sendMessage(chatId, i18next.t("thank_you"))
            await bot.sendMessage(chatId, i18next.t("country", {country: data?.country}));
            await bot.sendMessage(chatId, i18next.t("street", {street: data?.street}));

            setTimeout(async () => {
                await bot.sendMessage(chatId, i18next.t("all_info"));
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});

app.post('/web-data', async (req, res) => {
    if (req.acceptsLanguages().length > 0) {
        if (req.query.lang != undefined) {
            i18next.changeLanguage(req.query.lang.toString())
        } else {
            i18next.changeLanguage(req.acceptsLanguages()[0])
        } 
    }
    const {queryId, products = [], totalPrice} = req.body;
    try {
        
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: i18next.t("order_title_complete"),
            input_message_content: {
                message_text: i18next.t("order_text_complete", {totalPrice: totalPrice, products: products.map(item => item.title).join(', ')})
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))

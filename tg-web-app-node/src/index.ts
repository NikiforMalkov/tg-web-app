import * as TelegramBot from 'node-telegram-bot-api';
import * as express from 'express';
import * as cors from 'cors';
import * as i18next from 'i18next';
import 'dotenv/config';

//TODO: move to another file
i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: {
          translation: {
            hello_world: "hello world",
                make_order: "Make order",
                fill_form: "Fill the form",
                all_info: "You will receive all the information in this chat",
                country:"Your country: {{country, string}}",
                street:"Your street: {{street, string}}",
                order_title_complete: "Successful purchase",
                order_text_complete: "Congratulations on your purchase, you have purchased an item worth {{totalPrice, number}}, {{products, string}}",
                go_to_store:"Visit our online store using the button below",
                button_fill_form:"A button will appear below, fill out the form",
                thank_you:"Thanks for your feedback!"
            }
        },
        ru: {
            translation: {
                "make_order": "Сделать заказ",
                "fill_form": "Заполнить форму",
                "all_info": "Всю информацию вы получите в этом чате",
                "country":"Ваша страна: {{country, string}}",
                "street":"Ваша улица: {{street, string}}",
                "order_title_complete": "Успешная покупка",
                "order_text_complete": "Поздравляю с покупкой, вы приобрели товар на сумму {{totalPrice, number}}, {{products, string}}",
                "go_to_store":"Заходи в наш интернет магазин по кнопке ниже",
                "button_fill_form":"Ниже появится кнопка, заполни форму",
                "thank_you":"Спасибо за обратную связь!"
            }
        }
    },
});
const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

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
                        {text: i18next.t("make_order"), web_app: {url: webAppUrl}}
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

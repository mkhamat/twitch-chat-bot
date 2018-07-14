const request = require('request');
const Bot = require('node-telegram-bot-api');
const bot = new Bot(process.env.TOKEN, 
  {
    webHook: {
        port: process.env.PORT
      }
    });
const client = require('tmi.js').client(
  {
    connection: {
        reconnect: true
    },
    channels: ["santiwwwwww"]
}
);
bot.setWebHook(`${process.env.APP_URL}/bot${process.env.TOKEN}`);

let awake;

function interval(){
 if (awake) clearInterval(awake);
  awake = setInterval(function (){
    request('https://twitch-chat-bot.herokuapp.com')
  }, 1500000)
}
  bot.onText(/\/start/ig, (msg) => {
        console.log(msg.from.id+ " from id")
        console.log(msg.chat.id+" chat id")
        if (client.readyState() == 'OPEN' || client.readyState() == 'CONNECTING') return;
        client.connect();
        interval();
        client.on("chat", function (channel, userstate, message, self) {
          if (self) return;
          bot.sendMessage(msg.chat.id, `[${userstate['display-name']}]: ${message}`)
        })
  });
  
  bot.onText(/\/stop/ig, (msg) => {
    clearInterval(awake);
    client.removeAllListeners('chat');
    client.disconnect();
  });
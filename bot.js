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
    // channels: ["santiwwwwww"]
    channels: ["solaryfortnite"]
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
  bot.onText(/zavodi/ig, (msg) => {
        if (msg.from.id != 472396472 || msg.from.id != 386643105) return;
        if (client.readyState() == 'OPEN' || client.readyState() == 'CONNECTING') return;
        client.connect();
        interval();
        client.on("chat", function (channel, userstate, message, self) {
          if (self) return;
          console.log(userstate['display-name']+": " + userstate.badges)
          bot.sendMessage(msg.chat.id, `[${userstate['display-name']}]: ${message}`)
        })
  });

  // var badges = {
    
  // }

  // function getBadges(userstate){
  //   Object.keys(userstate.badges).map()
  // }

  bot.onText(/tormozi/ig, (msg) => {
    clearInterval(awake);
    client.removeAllListeners('chat');
    client.disconnect();
  });
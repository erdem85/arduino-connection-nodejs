const
    five = require("johnny-five"),
    Discord = require("discord.js")
const
    board = new five.Board(),
    client = new Discord.Client()

board.on("ready", () => {
    const led = new five.Led(13);
    const lm35 = new five.Thermometer({controller: "LM35", pin: "A0"});
    const piyano = new five.Piezo(3);
    client.on("message", msg => {
        if(msg.content == "!ledopen") led.on(), msg.channel.send("`OK.`");
        if(msg.content == "!ledclose") led.off(), msg.channel.send("`OK.`");
        if(msg.content == "!roomtemp") msg.channel.send(lm35.celsius+" °C");
        if(msg.content == "!playsong") msg.channel.send("`OK.`"), piyano.play({song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -", beats: 1 / 4, tempo: 50});
    });
});

client.on("ready", () => console.log(`${client.user.tag} joined.`));
client.login("your bot token");

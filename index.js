const
    five = require("johnny-five"),
    Discord = require("discord.js"),
    fetch = require("node-fetch")

const
    board = new five.Board(),
    client = new Discord.Client()

board.on("ready", () => {
    const led = new five.Led(13);
    const lm35 = new five.Thermometer({controller: "LM35", pin: "A0"});
    const piyano = new five.Piezo(3);
    setInterval(function (){
        try{
            fetch(`http://localhost:8080/db?auth=authkey&mod=post&id=${lm35.celsius}`);
        }catch(err){
            console.log("temperature couldnt be send")
            return led.on();
        }
    }, 5000);
});


require('dotenv').config();

const Discord = require('discord.js');

const { Client } = require('discord.js');

const msgEmbed = new Discord.MessageEmbed();

const alexa = require('alexa-bot-api');

const chatBot = new alexa('aw2plm'); // Free access key for Mewtwo Machine channel (provided by CTK WARRIOR)

const client = new Client();

const prefix = '^';

const ID = "811363650539225088";

client.once('ready', _ => {

    console.log('Devis.1.1 is here !');

    client.user.setActivity("with depression", {
        type: "STREAMING",
        url: "https://www.twitch.tv/monstercat"
    });

});

client.on('message', message => { // Discord message
    if(!message.author.bot) {

        if(message.content.startsWith(prefix)) { // BOT USABLE CMDS START

            const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);

            const member = message.mentions.members.first();

            if (CMD_NAME === 'kick') {
                if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You dont have permissions to kick!');
                if(!member) return message.reply('Please mention the member you want to kick');
                if(member) {
                    msgEmbed
                    .setTitle("Action: Kicked")
                    .setDescription(`Kicked ${member} (${member.id})`)
                    .setColor("#ff2050")
                    .setFooter(`Kicked by ${message.author.username}`);
                    member
                    .kick()
                    .then((member) => message.channel.send(msgEmbed))
                    .catch((err) => message.channel.send('I dont have permissions :('));
                } else {
                    message.channel.send('That member wasn\'t found');
                }
            } else if (CMD_NAME === 'ban') {
                if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You dont have permissions to ban!');
                if(!member) return message.reply('Please mention the member you want to ban');
                if(member) {
                    msgEmbed
                    .setTitle("Action: Banned")
                    .setDescription(`Banned ${member} (${member.id})`)
                    .setColor("#ff2050")
                    .setFooter(`Banned by ${message.author.username}`);
                    member
                    .ban()
                    .then(_ => message.channel.send(msgEmbed))
                    .catch((err) => message.channel.send('I dont have permissions :('));
                } else {
                    message.channel.send('That member wasn\'t found');
                }
            } else if(CMD_NAME === 'serverrestart') {
                if(message.member.hasPermission('ADMINISTRATOR')) {
                    message.delete();
                    message.channel.send('SERVER RESTART ! @everyone', {files: ["https://i.imgur.com/gmfm5mj.jpg"]});
                }    
            } else if (CMD_NAME === 'serveronline') {
                if(message.member.hasPermission('ADMINISTRATOR')) {
                    message.delete();
                    message.channel.send('SERVER IS UP ! @everyone', {files: ["https://i.imgur.com/IBZVQVi.jpg"]});
                }
            } else if (CMD_NAME === 'serveroffline') {
                if(message.member.hasPermission('ADMINISTRATOR')) {
                    message.delete();
                    message.channel.send('Server is offline :( @everyone', {files: ["https://i.imgur.com/31qrowo.jpg"]});
                }
            } else if (CMD_NAME === 'ann') {
                if(message.member.hasPermission('ADMINISTRATOR')) {
                    let msg = message.content.substring(5);
                    const title  = args[0];
                    msgEmbed
                    .setColor('#006d21').setTitle(title).setDescription(msg.substring(title.length+1));
                    message.channel.send(msgEmbed);
                }    
            } else if (CMD_NAME === 'adminsay') {
                if(message.member.hasPermission('ADMINISTRATOR')) {
                    let msg = message.content.substring(CMD_NAME.length+1);
                    const title = 'Admin Saying';
                    msgEmbed.setColor('#c0392b').setTitle(title).setDescription(msg);
                    message.channel.send(msgEmbed);
                    message.delete();
                }
            } else if (CMD_NAME === 'say') {
                if(message.member.hasPermission('ADMINISTRATOR')) {
                    let msg = message.content.substring(CMD_NAME.length+1);
                    message.channel.send(msg);
                    message.delete();
                }
            }

            // BOT USABLE CMDS END

        } else if (!message.content.startsWith(prefix) && message.channel.id === ID) { // AI BOT START
        
            if (message.content.includes('who') && message.content.includes('made') && message.content.includes('you')) {
                message.channel.send('My Creative creator is Sconder <3');
            } else if (message.content.includes('server ip') || (message.content.includes('ip') && message.content.includes('server'))) {
                message.channel.send('Our Server IP: 134.255.218.41:7777');
            } else if ((message.content.includes('who')) && (message.content.includes('real owner') || message.content.includes('owner'))) {
                message.channel.send('Sconder is the real Owner of the server :D');
            } else {
                chatBot.getReply(message.content).then(r => message.channel.send(r));
            }
        } // AI BOT END
    }  
});



client.login(process.env.token);
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const fs = require('fs');

if (!fs.existsSync('./config.json')) {
    console.error('Error: config.json not found. Please copy config.example.json to config.json and fill it out.');
    process.exit(1);
}

const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

let currentStatus = 0;

function rotateStatus() {
    if (!config.statuses || config.statuses.length === 0) return;

    const status = config.statuses[currentStatus];
    
    // Map string types to ActivityType enums
    let type = ActivityType.Playing;
    if (status.type) {
        switch(status.type.toUpperCase()) {
            case 'WATCHING': type = ActivityType.Watching; break;
            case 'LISTENING': type = ActivityType.Listening; break;
            case 'COMPETING': type = ActivityType.Competing; break;
            case 'STREAMING': type = ActivityType.Streaming; break;
        }
    }

    client.user.setPresence({
        activities: [{
            name: status.text,
            type: type
        }],
        status: 'online'
    });

    // Use currentStatus index, not object itself
    console.log(`Updated status to: ${status.type} ${status.text}`);
    currentStatus = (currentStatus + 1) % config.statuses.length;
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Loading ${config.statuses.length} statuses...`);
    
    rotateStatus(); // Initial call
    setInterval(rotateStatus, config.interval || 10000);
});

client.login(config.token).catch(err => {
    console.error('Failed to login:', err);
});

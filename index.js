const { Player } = require("discord-music-player");
const { REST, Routes } = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const player = new Player(client, {
  leaveOnEmpty: true,
  leaveOnEnd: true,
});

client.player = player;

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "tako",
    description: "Replies with juarjuar!",
  },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
    throw error;
  }
})();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try {
    console.log("Bocchi is alive!!");
  } catch (error) {
    console.error(error);
    throw error;
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("pong!");
  }

  if (interaction.commandName === "tako") {
    const channel = interaction.member?.voice.channel;
    let queue = client.player.createQueue(interaction.guild.id);
    await queue.join(channel);
    interaction.channel.send("Por favor, se paciente (⊙_⊙;)");
    await interaction.reply(
      "https://media.tenor.com/AfMj1IQE0pMAAAAC/bocchi-the-rock.gif"
    );
    await queue.play(
      "https://open.spotify.com/track/0qjKG2VxquPgZMh2pyxra8?si=1f36d6938928422d"
    );
  }
});

client.login(TOKEN);

const discord = require("discord.js");
const moment = require('moment');
const Agenda = require('./models/Agenda.js');
const ytdl = require("ytdl-core");
// const Client = new Discord.Client; 
// { Client, Intents } = require('discord.js');
const Client = new discord.Client({ intents: 65535 })
const prefix = "$";
var list = [];
Client.on("ready", () => {
    console.log("bot fonctione");
});
Client.on("raw",(v)=>{
    if(v.t=="MESSAGE_CREATE"){
        var message=v.d
        var channel=message.channel_id
        var guild=message.guild_id
        var msg=message.content.toUpperCase()
        //console.log(msg) 
        // if(msg==""){}                // Se message = OBLIGATOIREMENT de ce qu'il y a entre les guillemets
        // if(msg.startsWith("")){}     // Se message commence OBLIGATOIREMENT avec ce qu'il y a entre les guillemets
        if(msg.startsWith("SALUT")){
            Client.channels.fetch(channel).then(temp=>{
                temp.send("Tu vas bien ?\nPrêt a coder ?!?\nLET'S GO !!!")
            })
        }
        if(msg.startsWith(prefix+"PLAY")){
            // TODO: fonction pour la musique a ecrire
        }
        /* a paufine
        if(msg.includes("TENOR")){
            Client.channels.fetch(channel).then(temp=>{
                temp.send("Stop avec t'es putin de GIF")
            }) 
        } //*/
    }
});
Client.on("message", (message) => {
    if (message.content.startsWith(prefix + "agenda")) {
      // Recupérer les arguments de la commande
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
      // Si l'utilisateur ne fournit pas d'arguments, afficher l'aide
      if (args.length === 1) {
        message.channel.send(`Pour utiliser la commande Agenda, utilisez la syntaxe suivante :\n${prefix}agenda <jour> <matin/après-midi> <repos/travail>`);
        return;
      }
  
      // Récupérer le jour de la semaine et vérifier s'il est valide
      const jour = args[1];
      const joursValides = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
      if (!joursValides.includes(jour.toLowerCase())) {
        message.channel.send(`Le jour de la semaine doit être un jour de la semaine valide (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche).`);
        return;
      }
  
      // Récupérer la plage horaire et vérifier qu'elle est valide
      const plage = args[2];
      const plagesValides = ['matin', 'après-midi'];
      if (!plagesValides.includes(plage.toLowerCase())) {
        message.channel.send(`La plage horaire doit être "matin" ou "après-midi".`);
        return;
      }
  
      // Récupérer l'état (repos/travail) et vérifier qu'il est valide
      const etat = args[3];
      const etatsValides = ['repos', 'travail'];
      if (!etatsValides.includes(etat.toLowerCase())) {
        message.channel.send(`L'état doit être "repos" ou "travail".`);
        return;
      }
  
      // Enregistrer l'agenda dans une base de donnees (par exemple, MongoDB)
      // Vous pouvez utiliser une bibliotheque telle que Mongoose pour faciliter l'intégration de MongoDB avec votre bot Discord
      const Agenda = require('../Bot discord CCI/agenda');
      const newAgenda = new Agenda({
        jour: jour,
        plage: plage,
        etat: etat
});
      newAgenda.save()
        .then(() => {
          message.channel.send(`L'agenda pour le ${jour} ${plage} a étété enregistré avec succès.); }) .catch((error) => { message.channel.send(Une erreur s'est produite lors de l'enregistrement de l'agenda : ${error}`);
        });
        }
        });
        
        // Récupérer le channel Discord dans lequel envoyer l'agenda chaque jour à 9h00
        const channelId = '1059759621016911922';
        
        // Configurer le cronjob pour exécuter la tâche tous les jours à 9h00
        cron.schedule('0 9 * * *', async () => {
        // Récupérer l'agenda de la journée actuelle
        const Agenda = require('../Bot discord CCI/agenda');
        const jourActuel = moment().format('dddd').toLowerCase();
        const agenda = await Agenda.findOne({ jour: jourActuel });
        
        // Si aucun agenda n'a été enregistré pour ce jour, envoyer un message indiquant qu'il n'y a pas d'agenda
        if (!agenda) {
        const channel = Client.channels.fetch(channelId);
        channel.send("Il n'y a pas d'agenda pour aujourd'hui.");
        return;
        }
        
        // Envoyer l'agenda au channel Discord
        const channel = Client.channels.fetch(channelId);
        channel.send("Agenda pour aujourd'hui (${jourActuel}):\n${agenda.plage}: ${agenda.etat}");
});
        Client.on("message", (message) => {
          if (message.content.startsWith(prefix + "agenda")) {
            // Récupérer les arguments de la commande
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
        
            // Si l'utilisateur ne fournit pas d'arguments, afficher l'agenda de la semaine entière
            if (args.length === 1) {
              const Agenda = require('../Bot discord CCI/agenda');
              Agenda.find({}, (error, agendas) => {
                if (error) {
                  message.channel.send(`Une erreur s'est produite lors de la récupération de l'agenda : ${error}`);
                  return;
                }
        
                let agendaSemaine = '';
                agendas.forEach((agenda) => {
                  agendaSemaine += `${agenda.jour} ${agenda.plage}: ${agenda.etat}\n`;
                });
                message.channel.send(`Voici l'agenda de la semaine :\n${agendaSemaine}`);
              });
            } else {
              // Si l'utilisateur fournit des arguments, exécuter la commande "agenda" telle que décrite dans ma réponse précédente
            }
          }
});

Client.login("OTM4ODk2MzczNDY4NzYyMTEy.GWdgDl.JwxPSTtivD4bdof9Fe30ZLbpMmVx19LOPnBwrM");
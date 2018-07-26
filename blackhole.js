class blackholeModule {
	constructor(bot) {
		this.bot = bot;
		this.commands = bot.commands;
		this.perms = bot.commands.perms;
	}

	init() {
		this.registerCommands();
	}

	registerCommands() {
		var self = this;
		self.bot.dclient.on("rawMessage", this.blackholeMessage.bind(this));
	}


	blackholeMessage(msg) {
		var self = this;
		var channel = msg.channel;
		var dclient = this.bot.dclient;
		var channels = this.bot.config.moduleConfigs.blackhole.channels;
		var cont = false;
		for(var x in channels) {
			var bchannel = channels[x];
			if (channel.id == bchannel.id) {
				cont = true;
				for (var y in bchannel.voices) {
					var vocal = bchannel.voices[y];
					if (msg.author.id == vocal) {
						cont = false
					}
				}
			}
		}
		if (!cont) {
			return;
		}
		if (msg.author.id == dclient.user.id) {
			return;
		}
		msg.delete({timeout: 1000 }).catch();
	}

}
module.exports = blackholeModule;

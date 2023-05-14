import Discord from 'discord.js';

import { getFilePaths } from "../services/file-system";
import CommandsMap from './map';
import { SlashCommand } from './slash';
import { MessageCommand, UserCommand } from './menu';

/**
 * Main structure for managing commands and interactions.
 */
export class InteractionsHandler {
  /**
   * A map of commands with additional command navigation functions.
   */
  public readonly commands: CommandsMap = new CommandsMap;
  /**
   * Finds matching command and executes it.
   * @param interaction The interaction received
   */
  async handleInteraction(interaction: Discord.Interaction) {
    if(interaction.isChatInputCommand()) {
      const subcommand = interaction.options.getSubcommand(false) || "";
      const subcommandGroup = interaction.options.getSubcommandGroup(false) || "";
      const command = this.commands.getSlashCommand([interaction.commandName, subcommandGroup, subcommand]);
      if (command) await command.execute(interaction);
    }
    if(interaction.isContextMenuCommand()) {
      const command = this.commands.getContextMenuCommand(interaction.commandName);
      if (command) await command.execute(interaction);
    }
  }
  /**
   * Stores commands to commands property.
   * Can be used to reload commands.
   */
  loadCommands(commandsDir: string) {
    this.commands.clear();
    for (let commandPath of getFilePaths(commandsDir)) {
      const command = require(commandPath);
      if(command instanceof SlashCommand || command instanceof UserCommand || command instanceof MessageCommand) {
        this.commands.set(command.name, command);
      }
    }
  }
}
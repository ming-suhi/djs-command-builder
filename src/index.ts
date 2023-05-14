export * from "./structures/slash";
export * from "./structures/menu";
export * from "./structures/field";
export * from "./structures/handler";

import { getFilePaths } from "./services/file-system";
import { MessageCommand, UserCommand } from "./structures/menu";
import { SlashCommand } from "./structures/slash";

export function mapCommands(commandsDir: string) {
  const commands = new Array();
  for(let path of getFilePaths(commandsDir)) {
    const command = require(path);
    if(command instanceof SlashCommand || command instanceof UserCommand || command instanceof MessageCommand) {
      commands.push({...command});
    }
  }
  return commands;
}
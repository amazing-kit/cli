import chalk from "chalk"
import { exec } from 'child_process';
import path from "path"
import { fileURLToPath } from "url"


export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)


export const execute_shell = (command: string) => {
  exec(command, (error, stdout, stderr) => {
    console.log(chalk.green(command));
    console.log(chalk.gray(stdout));

    if (error) {
      console.log(chalk.red(`error in ${command}: ${error.message}`));
      return;
    }

    if (stderr) {
      console.log(chalk.red(`stderr in ${command}: ${stderr}`));
      return;
    }

  });
};
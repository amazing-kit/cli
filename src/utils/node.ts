import { exec } from "child_process";
import path from "path"
import colors from "picocolors"
import { fileURLToPath } from "url"
import CLUI from "clui"

const Spinner = CLUI.Spinner

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)


export const execute_shell = (command: string) => {
  const spinner = new Spinner(colors.yellow(command))
  spinner.start()
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      spinner.stop()

      console.log(colors.cyan(command));
      console.log(colors.gray(stdout));

      if (error) {
        console.log(colors.red(`error in ${command}: ${error.message}`));
        return reject(error);
      }

      if (stderr) {
        console.log(colors.red(`stderr in ${command}: ${stderr}`));
        return reject(stderr);
      }

      return resolve(stdout);
    });
  })
};
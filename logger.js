import chalk from 'chalk';

const logger = {
  info: function(message) {
    console.log(chalk.greenBright.bold('[INFO] ') + message);
  },
  warning: function(message) {
    console.log(chalk.yellowBright.bold('[WARNING] ') + message);
  },
  error: function(message) {
    console.log(chalk.redBright.bold('[ERROR] ') + message);
  },
  socket: function(message) {
    console.log(chalk.yellow.bold('[SOCKET] ') + chalk.red.bold(`{${message.event}} `) + chalk.yellow.bold(JSON.stringify(message.payload)));
  },
  vite: function(message) {
    console.log(chalk.magentaBright.bold('[VITE] ') + message);
  }
};

export default logger;

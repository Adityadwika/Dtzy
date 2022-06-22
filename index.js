const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(`███████ ████████ ██    ██ ███    ███ ██████  ██      ███████         
██         ██    ██    ██ ████  ████ ██   ██ ██      ██           
███████    ██    ██    ██ ██ ████ ██ ██████  ██      █████          
     ██    ██    ██    ██ ██  ██  ██ ██   ██ ██      ██            
███████    ██     ██████  ██      ██ ██████  ███████ ███████
  Trophy And Crown Hack Safe!
By : ${chalk.bold('dtzyy')} - Credit : ${chalk.yellow('Zenn')}
                    ${chalk.bold.white('              Bye : Dtzyy')}
`);

  const auth = rs.question(chalk.bold.gray(`\n[ ${chalk.bold.white('+')} ] ${chalk.bold.white('Auth : ')}`));

   let counter = 0;
  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Authentication Code Not Valid`));
      

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

counter = counter + 1;
console.log(chalk.green(`
[ ${chalk.white(counter)} ]
[ ${chalk.white('Time')} ]: ${moment().format('HH:mm:ss')}
[ ${chalk.white('Username')} ] : ${username}
[ ${chalk.red('Country')} ] : ${country}
[ ${chalk.yellow('Trophy')} ] : ${trophy}
[ ${chalk.blue('Crown')} ] : ${crown}`));
      await sleep(6500);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Your Account has been Banned`));
     break;
    }
  }


})();

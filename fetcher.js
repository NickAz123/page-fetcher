let info = require(`yargs`).argv;
let fs = require('fs');
const request = require('request');
const readline = require('readline');

const domain = info._[0];
const filePath = info._[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getSize = (filePath) => {
  fs.stat(filePath, (err, stats) => {
    if (err){
      console.log(`File Doesn't Exist`);
    } else {
      console.log(stats.size);
    }
  })
}

request(domain, (error, response, body) => {
  if (error) {
    console.log(`Warning! ${error.hostname} is not a valid url!`);
    process.exit();
  }
  fs.readFile(filePath, `utf8`, (err, data) => {
    if (err) {
      console.log("File doesn't exist, writing new file...")
      fs.writeFile(filePath, body, function (err) {
        if (err) return console.log(err);
      })
      process.exit();
    } else {
      rl.question(`A file at ${filePath} already exists...would you like to overwrite it(y/n)?`, (answer) => {
        if (answer === `y`) {
          console.log("Overwriting file...");
          fs.writeFile(filePath, body, function (err) {
            if (err) return console.log(err);
          })
        }
        process.exit();
      })
    }
  })
});
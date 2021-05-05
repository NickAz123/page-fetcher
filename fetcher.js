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

request(domain, (error, response, body) => {
  // Print the error if one occurred
  if (error) {
    console.log(`Warning! ${error.hostname} is not a valid url!`);
    process.exit();
  }
  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode);
  // Print the HTML for the Google homepage.
  console.log('body:', body);

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
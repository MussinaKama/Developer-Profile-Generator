const inquirer = require("inquirer");
//const fs = require("fs");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const path = require("path");
const open = require('open');
//const convertFactory = require("electron-html-to");

var fs = require('fs'),
    convertFactory = require('electron-html-to');
 
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
 
const questions = [
    {
        type: "list",
        name: "color",
        choices: ["red", "green", "blue", "pink"],
        message: "What is your favorite color ?"
    },
    {
        type: "input",
        name: "username",
        message: "Enter your Github username"
    }
];

function promptUser () {
   // inquirer.prompt(questions).then(({ color, username }) => {
    inquirer.prompt(questions).then((answers) => {
        const clientID =  "Iv1.a2b1ad44ef284cfc";
        const clientSecret =  "3d220780c658f368cfea5298c05521c4c6c9514e";
        const queryUrl = `https://api.github.com/users/${answers.username}?client_id=${clientID}&client_secret=${clientSecret}`;

        axios 
        .get(queryUrl)
        .then(function(res){
            let profileImage = res.data.avatar_url;
            let name = res.data.name;
            let location = res.data.location;
            let githubProfile = res.data.html_url;
            let blog = res.data.blog;
            let bio = res.data.bio;
            let publicRepos = res.data.public_repos;
            let followers = res.data.followers;
            let stars = res.data
            let following = res.data.following;
            // color data
            console.log(answers.color)
            res.color = answers.color
    })  
    })
}
promptUser();


function writeToFile(fileName, data) {
    generateHTML(
        profileImage,
   name,
   location,
   githubProfile,
  blog,
   bio,
   publicRepos,            
   followers,
   stars,
   following
      ).then(html => {
      // const conversion = convertFactory({
      //     converterPath: convertFactory.converters.PDF
      // })
      console.log(html);
      conversion({ html}, function(err,result){
          if (err){
              return console.error(err)
          }
          console.log(result.numberOfPages);
          console.log(result.logs);
          result.stream.pipe(
               fs.createWriteStream(path.join(__dirname, "resume.pdf"))
              //fs.createWriteStream("C:\Users\mussi\Desktop\code\homework\developer-profile-generator\resume.pdf")

          );
          conversion.kill();
      });
      open(path.join(process.cwd(), "resume.pdf"))
  })
}

async function init() {
    console.log(data)
    try {
        const answers = await promptUser();
        const html = generateHTML(data);
        
    } catch (err) {
        console.log(err)
    }
}
init();
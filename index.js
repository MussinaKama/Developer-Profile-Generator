const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const path = require("path");
const fs = require('fs');
const pdf = require("html-pdf")

var options = { format: 'Letter', orientation: "portrait"}

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

function promptUser() {
    inquirer.prompt(questions).then((answers) => {
        const queryUrl = `https://api.github.com/users/${answers.username}`;
        
        axios
            .get(queryUrl)
            .then(function (res) {
                console.log(res)
                res.data.avatar_url;
                res.data.name;
                res.data.location;
                res.data.html_url;
                res.data.blog;
                res.data.bio;
                res.data.public_repos;
                res.data.followers;
                res.data.starred_url;
                res.data.following;
                res.data.color = answers.color
                var html = generateHTML(res.data)
                fs.writeFileSync(path.join(__dirname, "profile.html"),html)
            }).then(function() {
                var html1 = fs.readFileSync('./profile.html', 'utf8');
            pdf.create(html1, options).toFile('./profile.pdf', function(err, res) {
                if (err) return console.log(err);
                console.log(res);
            });
        })
})
}
promptUser();
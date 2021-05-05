//jshint esversion:6
const { response, json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
let cat = [];
let lang;
let asp = [];
let type, o, amount;
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("index")
});
app.post("/", function (req, res) {
    // categories 
    if (req.body.z == "on") {
        cat.push("Any");
    }
    if (req.body.a == "on") {
        cat.push("Programming");
    }
    if (req.body.b == "on") {
        cat.push("Miscellaneous");
    }
    if (req.body.c == "on") {
        cat.push("Dark");
    }
    if (req.body.d == "on") {
        cat.push("Pun");
    }
    if (req.body.e == "on") {
        cat.push("Spooky");
    }
    // language
    if (req.body.f == "cs") {
        lang = "cs";
    }
    else if (req.body.f == "de") {
        lang = "de";
    }
    else if (req.body.f == "en") {
        lang = "en";
    }
    else if (req.body.f == "es") {
        lang = "es";
    }
    else if (req.body.f == "fr") {
        lang = "fr";
    }
    else if (req.body.f == "pt") {
        lang = "pt";
    }
    // aspect 
    if (req.body.g == "on") {
        asp.push("nsfw");
    }
    if (req.body.h == "on") {
        asp.push("religious");
    }
    if (req.body.i == "on") {
        asp.push("political");
    }
    if (req.body.j == "on") {
        asp.push("racist");
    }
    if (req.body.k == "on") {
        asp.push("sexist");
    }
    if (req.body.l == "on") {
        asp.push("explicit");
    }
    // joke type 
    if (req.body.m == "on") {
        type = "single";
    }
    else if (req.body.n == "on") {
        type = "twopart";
    }
    //    type a word 
    word = req.body.o;
    // amount 
    // amount = req.body.p;
    // console.log(cat.join(","));
    // console.log(asp.join(","));
    
    const url = "https://v2.jokeapi.dev/joke/" + cat.join(",") + "?" + "lang=" + lang +  "&blacklistFlags=" + asp.join(",") + "&type=" + type  + "&amount=1" +"&contains=" + word;
    // const url="https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark?blacklistFlags=political,racist&type=twopart"
    https.get(url,function(response){
        console.log(response.statusCode); 
        response.on("data",function(data){
            const joker=JSON.parse(data);
            // console.log(joker);
            // console.log(joker.error);
           if(joker.error==false){
            if(joker.type == "single")
            {
                // If type == "single", the joke only has the "joke" property
                // console.log(joker.joke);
                const j1=joker.joke;
                res.render("joke2",{person1:j1})
                // console.log("\n");
            }
            else
            {
                // If type == "twopart", the joke has the "setup" and "delivery" properties
                // console.log(joker.setup);
                const j1=joker.setup;
                const j2=joker.delivery;
                res.render("joke1",{person1:j1,person2:j2}); 
                
            }
           } else if(joker.error==true){
               res.render("err");
           }
           
        })
    });
});












app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});
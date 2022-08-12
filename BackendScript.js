const express = require("express");
const app = express();
const fs = require("fs");

const libRouter = express.Router();

libRouter.use("/jquery-3.6.0.min.js", function(request, response){
    let fileContent = fs.readFileSync("lib//jquery-3.6.0.min.js", "utf8");
    response.send(fileContent);
});

app.use("/lib", libRouter);

const imgRouter = express.Router();

imgRouter.use("/background.jpg", function(request, response){
    let fileContent = fs.readFileSync("img/background.jpg");
    response.send(fileContent);
});

imgRouter.use("/house_main.png", function(request, response){
    let fileContent = fs.readFileSync("img/house_main.png");
    response.send(fileContent);
});

imgRouter.use("/label_big_1.png", function(request, response){
    let fileContent = fs.readFileSync("img/label_big_1.png");
    response.send(fileContent);
});

imgRouter.use("/logo_1.png", function(request, response){
    let fileContent = fs.readFileSync("img/logo_1.png");
    response.send(fileContent);
});

imgRouter.use("/youtube.png", function(request, response){
    let fileContent = fs.readFileSync("img/youtube.png");
    response.send(fileContent);
});

imgRouter.use("/zavod-345.jpg", function(request, response){
    let fileContent = fs.readFileSync("img/zavod-345.jpg");
    response.send(fileContent);
});

app.use("/img",imgRouter);

app.use("/MyPortal.html",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})
app.listen(3000);
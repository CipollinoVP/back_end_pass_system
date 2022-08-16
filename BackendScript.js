const express = require('express'),
    app = express(),
    session = require('express-session'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    flash = require('connect-flash');
const fs = require("fs");
const  { Client } = require("pg");
const urlencodedParser = express.urlencoded({extended: false});

let clients = [new Client({user: 'postgres',
    host: 'localhost',
    database: '345MF',
    password: '11062002',
    port: 5432
})]

function checkAuth() {
    return app.use((req, res, next) => {
        if (req.bodyUsed) next()
        else res.redirect('/login');
    })
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'you secret key' }));
app.use(flash());
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

clients[0].connect();

const libRouter = express.Router();

libRouter.use("/jquery-3.6.0.min.js", function(request, response){
    let fileContent = fs.readFileSync("lib//jquery-3.6.0.min.js", "utf8");
    response.send(fileContent);
});

libRouter.use("/animate.min.css", function(request, response){
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

app.use("/MyJSCode.js",function(request, response){
    let fileContent = fs.readFileSync("MyJSCode.js", "utf-8");
    response.send(fileContent);
})

app.use("/MyFirstCSS.css",function(request, response){
    let fileContent = fs.readFileSync("MyFirstCSS.css", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/RegisterPass.html",function(request, response){
    let fileContent = fs.readFileSync("RegisterPass.html", "utf-8");
    response.send(fileContent);
})

app.use("/ScriptRegister.js",function(request, response){
    let fileContent = fs.readFileSync("ScriptRegister.js", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html!1",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html!2",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html!3",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html!4",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html!5",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/MyPortal.html!6",function(request, response){
    let fileContent = fs.readFileSync("MyPortal.html", "utf-8");
    response.send(fileContent);
})

app.use("/",function(request,response){
    let username = require("os").userInfo().username;
    console.log(username);
})

app.use("/user",async function (request, response) {
    let username = require("os").userInfo().username;
    const buffers = [];   // буфер для получаемых данных

    // получаем данные из запроса в буфер
    for await (const chunk of request) {
        buffers.push(chunk);
    }
    // получаем строковое представление ответа
    let userName = Buffer.concat(buffers).toString();
    response.end(userName);
})

app.post("/search_pass", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let all_search = request.body.all_field;
    let surname_search = request.body.surname;
    let name_search = request.body.name;
    let patronymic_search = request.body.patronymic;
    let document_num_search = request.body.document_num;
    let car_num_search = request.body.car_num;
    let query = "SELECT * FROM single_passes WHERE ((surname LIKE '%" + String(surname_search) +
        "%') AND (name LIKE '%" + String(name_search) + "%') AND (fathername LIKE '%"
        + String(patronymic_search) + "%') AND (number_document LIKE '%" +
        String(document_num_search) + "%') AND (num_auto LIKE '%" + String(car_num_search) + "%'));";
    clients[0].query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    });
    response.redirect("/MyPortal.html");
});

app.post("/create_pass", urlencodedParser, function (request, response) {
    let query = "INSERT INTO single_passes " +
        "(surname,name,fathername,type_document,number_document,organization,date_pass," +
        "time_pass,date_query,time_query,id_director,driver,num_auto,organization_custom,commentary,no_single," +
        "finish_time,mark_car,cargo)" + " VALUES ('" + request.body.surname_input + "','"
        + request.body.name_input + "','" + request.body.fathername_input + "','" +
        request.body.document_type_input + "','" + request.body.document_num_input + "','" +
        request.body.organization_input + "','"+ request.body.date_pass_input + "','" +
        request.body.time_pass_input + "+03:00',now(),now(),289,";
    if (request.body.driver_input){
        query = query + "true,'";
    } else {
        query = query + "false,'";
    }
    query = query + request.body.num_auto_input + "','"
    + "" + "','" + request.body.commentary_input + "',";
    if (request.body.long_time_input){
        query = query + "true,'";
    } else {
        query = query + "false,'";
    }
    query = query + request.body.finish_date_input + "','" + request.body.mark_auto_input +
        "','" + request.body.cargo_input + "');";
    clients[0].query(query);
    response.redirect("/MyPortal.html");
});



app.listen(3000);
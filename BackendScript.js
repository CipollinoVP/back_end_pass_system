const express = require("express");
const app = express();
const fs = require("fs");
const  { Client } = require("pg");
const urlencodedParser = express.urlencoded({extended: false});
const cookieParser = require('cookie-parser');
const libRouter = express.Router();

async function main_MyPortal(main_data) {
    if ((main_data.req.cookies.login === undefined) || (main_data.req.cookies.password === undefined)) {
        main_data.res.redirect("/login.html");
        return;
    }
    main_data.fContent = fs.readFileSync("MyPortal.html", "utf-8");
    main_data.cl = new Client({
        user: main_data.req.cookies.login,
        host: 'localhost',
        database: '345MF',
        password: main_data.req.cookies.password,
        port: 5432,
    })
    main_data.cl.connect();
    let query = "WITH RECURSIVE cte AS (SELECT oid FROM pg_roles WHERE rolname ='" + main_data.req.cookies.login
        + "' UNION ALL SELECT m.roleid FROM" +
        " cte JOIN   pg_auth_members m ON m.member = cte.oid) SELECT oid, oid::regrole::text AS rolename FROM cte";
    const result = await main_data.cl.query({
        rowMode: 'array',
        text: query,
    })
    let type_user = result.rows[1][1];
    let OrderButton = "";
    let PersonalPassButton = "";
    let HistoryPassesButton = "";
    let FuturePassesButton = "";
    let AdmitButton = "";
    let LetButton = "";
    let ApprovalPassesButton = "";
    if ((type_user === "cheif_admin") || (type_user === "most_cheif_admin") || (type_user === "tenant")) {
        OrderButton = "<tr><td><button onclick=\"window.location.href = '/RegisterPass.html';\">\n" +
            "                        Заказать разовый пропуск\n" +
            "                    </button>\n" +
            "                    </td></tr>";
        PersonalPassButton = "<tr><td width=\"100%\"><button name = \"ShowPersonalPassButton\">"
            + "Посмотреть мои заявки </button> </td></tr>";

    }
    if ((type_user === "controller_by_walk") || (type_user === "most_cheif_admin") || (type_user === "controller_car")) {
        HistoryPassesButton = "<tr><td width=\"100%\"><button name = \"HistoryPassesButton\">" +
            " Посмотреть историю пропусков </button> </td></tr>";
        FuturePassesButton = "<tr><td width=\"100%\"><button name = \"FuturePassButton\">" +
            " Предстоящие пропуска </button> </td></tr>";

    }
    if ((type_user === "controller_by_walk") || (type_user === "controller_car")) {
        AdmitButton = "<tr><td width=\"100%\"><button name = \"AdmitButton\"> Впустить </button></td></tr>";
        LetButton = "<tr><td width=\"100%\"><button name = \"LetButton\"> Выпустить </button></td></tr>";
    }
    if (type_user === "most_cheif_admin") {
        ApprovalPassesButton = "<tr><td width=\"100%\"><button name =" +
            " \"ApprovalPassesButton\"> Заявки на утверждение </button></td></tr>";
    }
    main_data.fContent = main_data.fContent.replace("{OrderButton}", OrderButton);
    main_data.fContent = main_data.fContent.replace("{PersonalPassButton}", PersonalPassButton);
    main_data.fContent = main_data.fContent.replace("{HistoryPassesButton}", HistoryPassesButton);
    main_data.fContent = main_data.fContent.replace("{FuturePassesButton}", FuturePassesButton);
    main_data.fContent = main_data.fContent.replace("{AdmitButton}", AdmitButton);
    main_data.fContent = main_data.fContent.replace("{LetButton}", LetButton);
    main_data.fContent = main_data.fContent.replace("{ApprovalPassesButton}", ApprovalPassesButton);
}

libRouter.use("/jquery-3.6.0.min.js", function(request, response){
    let fileContent = fs.readFileSync("lib/jquery-3.6.0.min.js", "utf8");
    response.send(fileContent);
});

libRouter.use("/animate.min.css", function(request, response){
    let fileContent = fs.readFileSync("lib/animate.min.css", "utf8");
    response.send(fileContent);
});

app.use("/lib", libRouter);

app.use(cookieParser());

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

app.get("/MyJSCode.js",function(request, response){
    let fileContent = fs.readFileSync("MyJSCode.js", "utf-8");
    response.send(fileContent);
})


app.get("/MyPortal.html",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    main_data.fContent = main_data.fContent.replace("{ListPasses}","");
    await main_data.cl.end();
    response.send(main_data.fContent);
})

app.get("/RegisterPass.html",function(request, response){
    if ((request.cookies.login === undefined) || (request.cookies.password === undefined)) {
        response.redirect("/login.html");
    }
    let fileContent = fs.readFileSync("RegisterPass.html", "utf-8");
    response.send(fileContent);
})

app.get("/ScriptRegister.js",function(request, response){
    if ((request.cookies.login === undefined) || (request.cookies.password === undefined)) {
        response.redirect("/login.html");
    }
    let fileContent = fs.readFileSync("ScriptRegister.js", "utf-8");
    response.send(fileContent);
})

app.get("/MyPortal.html!1*",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    let listContent = fs.readFileSync("resource.html", "utf-8");
    main_data.fContent = main_data.fContent.replace("{ListPasses}",listContent);
    response.send(main_data.fContent);
})

app.use("/MyPortal.html!2*",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    let listContent = fs.readFileSync("resource.html", "utf-8");
    main_data.fContent = main_data.fContent.replace("{ListPasses}", listContent);
    response.send(main_data.fContent);
})

app.get("/MyPortal.html!3*",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    let listContent = fs.readFileSync("resource.html", "utf-8");
    main_data.fContent = main_data.fContent.replace("{ListPasses}", listContent);
    response.send(main_data.fContent);
})

app.get("/MyPortal.html!4*",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    let listContent = fs.readFileSync("resource.html", "utf-8");
    main_data.fContent = main_data.fContent.replace("{ListPasses}", listContent);
    response.send(main_data.fContent);
})

app.get("/MyPortal.html!5*",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    let listContent = fs.readFileSync("resource.html", "utf-8");
    main_data.fContent = main_data.fContent.replace("{ListPasses}", listContent);
    response.send(main_data.fContent);
})

app.get("/MyPortal.html!6*",async function (request, response) {
    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    let listContent = fs.readFileSync("resource.html", "utf-8");
    main_data.fContent = main_data.fContent.replace("{ListPasses}", listContent);
    response.send(main_data.fContent);
})

app.use("/login.html",function(request, response){
    let fileContent = fs.readFileSync("login.html", "utf-8");
    response.send(fileContent);
})

app.use("/loginERR.html",function(request, response){
    let fileContent = fs.readFileSync("loginERR.html", "utf-8");
    response.send(fileContent);
})

app.use("/logout",function (request,response){
    if (request.cookies.login !== undefined) {
        response.clearCookie("login");
    }
    if (request.cookies.password !== undefined) {
        response.clearCookie("password");
    }
    response.redirect("/login.html");
})

app.post("/MyPortal.html?",urlencodedParser, function (request, response) {
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
    let client = new Client({
        user: request.cookies.login,
        host: 'localhost',
        database: '345MF',
        password: request.cookies.password,
        port: 5432,
    })
    client.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    });
    client.end();
});

app.post("/auth", urlencodedParser, function (request, response) {
    let client = new Client({
        user: request.body.login_input,
        host: 'localhost',
        database: '345MF',
        password: request.body.password_input,
        port: 5432,
    })
    client.connect();
    client.query('SELECT NOW()', (err, res) => {
        if (err === null) {
            response.cookie("login",request.body.login_input,{maxAge: 999999999999999});
            response.cookie("password",request.body.password_input, {maxAge: 999999999999999});
            response.redirect("/MyPortal.html");
        } else {
            response.redirect("/loginERR.html");
        }
        client.end()
    });
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
    let client = new Client({
        user: request.cookies.login,
        host: 'localhost',
        database: '345MF',
        password: request.cookies.password,
        port: 5432,
    })
    client.query(query);
    client.end();
    response.redirect("/MyPortal.html");
});



app.listen(3000);
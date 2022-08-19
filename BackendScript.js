const express = require("express");
const app = express();
const fs = require("fs");
const  { Client } = require("pg");
const urlencodedParser = express.urlencoded({extended: false});
const cookieParser = require('cookie-parser');
const {request} = require("express");
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
        OrderButton = "<tr><td><button onclick=\"window.location.href = '/RegisterPass.html'\">\n" +
            "                        Заказать разовый пропуск\n" +
            "                    </button>\n" +
            "                    </td></tr>";
        PersonalPassButton = "<tr><td width=\"100%\"><button onclick=\"window.location.href = '/MyPortal.html!1'\""
            +" name = \"ShowPersonalPassButton\">"
            + "Посмотреть мои заявки </button> </td></tr>";

    }
    if ((type_user === "controller_by_walk") || (type_user === "most_cheif_admin") || (type_user === "controller_car")) {
        HistoryPassesButton = "<tr><td width=\"100%\"><button name = \"HistoryPassesButton\" "+
            " onclick=\"window.location.href = '/MyPortal.html!4'\">" +
            " Посмотреть историю пропусков </button> </td></tr>";

    }
    if ((type_user === "controller_by_walk") || (type_user === "controller_car")) {
        AdmitButton = "<tr><td width=\"100%\"><button name = \"AdmitButton\" "+
            "onclick=\"window.location.href = '/MyPortal.html!2'\"> " +
            " Впустить </button></td></tr>";
        LetButton = "<tr><td width=\"100%\"><button name = \"LetButton\""
            +" onclick=\"window.location.href = '/MyPortal.html!3'\">"
            +" Выпустить </button></td></tr>";
        FuturePassesButton = "<tr><td width=\"100%\"><button name = \"FuturePassButton\"" +
            " onclick=\"window.location.href = '/MyPortal.html!6'\">" +
            " Предстоящие пропуска </button> </td></tr>";
    }
    if (type_user === "most_cheif_admin") {
        ApprovalPassesButton = "<tr><td width=\"100%\"><button name = \"ApprovalPassesButton\" "
            + "onclick=\"window.location.href = '/MyPortal.html!5'\"" +
            "> Заявки на утверждение </button></td></tr>";
    }
    main_data.fContent = main_data.fContent.replace("{OrderButton}", OrderButton);
    main_data.fContent = main_data.fContent.replace("{PersonalPassButton}", PersonalPassButton);
    main_data.fContent = main_data.fContent.replace("{HistoryPassesButton}", HistoryPassesButton);
    main_data.fContent = main_data.fContent.replace("{FuturePassesButton}", FuturePassesButton);
    main_data.fContent = main_data.fContent.replace("{AdmitButton}", AdmitButton);
    main_data.fContent = main_data.fContent.replace("{LetButton}", LetButton);
    main_data.fContent = main_data.fContent.replace("{ApprovalPassesButton}", ApprovalPassesButton);
}

async function zero_init(main_data){
    main_data.fContent = main_data.fContent.replace("{TextAllField}","");
    main_data.fContent = main_data.fContent.replace("{TextSurnameField}","");
    main_data.fContent = main_data.fContent.replace("{TextNameField}","");
    main_data.fContent = main_data.fContent.replace("{TextDocumentNumField}","");
    main_data.fContent = main_data.fContent.replace("{TextPatronymicField}","");
    main_data.fContent = main_data.fContent.replace("{TextCarNumField}","");
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

imgRouter.use("/ok.png", function(request, response){
    let fileContent = fs.readFileSync("img/ok.png");
    response.send(fileContent);
});

imgRouter.use("/no.png", function(request, response){
    let fileContent = fs.readFileSync("img/no.png");
    response.send(fileContent);
});

imgRouter.use("/date.png", function(request, response){
    let fileContent = fs.readFileSync("img/date.png");
    response.send(fileContent);
});

imgRouter.use("/time.png", function(request, response){
    let fileContent = fs.readFileSync("img/time.png");
    response.send(fileContent);
});

imgRouter.use("/user2.png", function(request, response){
    let fileContent = fs.readFileSync("img/user2.png");
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
    main_data.fContent = main_data.fContent.replace("{ActionSearchUrl}","/MyPortal.html!0Sch");
    await zero_init(main_data);
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

async function refresh(request, response) {
    let all_search = "";
    let surname_search = "";
    let name_search = "";
    let patronymic_search = "";
    let document_num_search = "";
    let car_num_search = "";
    if (request.method === "POST" && (!request.body)){
        return response.sendStatus(400);
    } else if (request.method === "POST") {
        console.log(request.body);
        all_search = request.body.all_field;
        surname_search = request.body.surname;
        name_search = request.body.name;
        patronymic_search = request.body.patronymic;
        document_num_search = request.body.document_num;
        car_num_search = request.body.car_num;
    }
    let client = new Client({
        user: request.cookies.login,
        host: 'localhost',
        database: '345MF',
        password: request.cookies.password,
        port: 5432,
    })
    client.connect();
    let query = "SELECT * FROM single_passes WHERE ((surname LIKE '%" + String(surname_search) +
        "%') AND (name LIKE '%" + String(name_search) + "%') AND (fathername LIKE '%"
        + String(patronymic_search) + "%') AND (number_document LIKE '%" +
        String(document_num_search) + "%') AND (num_auto LIKE '%" + String(car_num_search) + "%') AND ";
    let type_using = Number(request.url[15]);
    let query_id_worker = "SELECT id_workers FROM registers_user WHERE login_database = '"
        + request.cookies.login + "';";
    const result_id_worker = await client.query({
        rowMode: 'array',
        text: query_id_worker,
    });
    let query_type_user = "WITH RECURSIVE cte AS (SELECT oid FROM pg_roles WHERE rolname ='" + request.cookies.login
        + "' UNION ALL SELECT m.roleid FROM" +
        " cte JOIN   pg_auth_members m ON m.member = cte.oid) SELECT oid, oid::regrole::text AS rolename FROM cte";
    const result_type_user = await client.query({
        rowMode: 'array',
        text: query_type_user,
    });
    let type_user = result_type_user.rows[1][1];
    let id_worker = result_id_worker.rows[0][0];
    let single_passes = "";
    switch (type_using) {
        case 1:
            query = query + "(id_director = " + String(id_worker) +
                ") AND (pass_using = false) AND ((date_pass >= current_date) OR"+
                " ((no_single = true) AND (finish_time >= current_date))));";
            const res_1 = await client.query({
                rowMode: 'array',
                text: query,
            });
            let n_1 = res_1.rowCount;
            for (let i = 0; i < n_1; i++){
                if (i % 2 === 0) {
                    single_passes = single_passes + "<tr>\n";
                }
                if (res_1.rows[i][20] === null) {
                    single_passes = single_passes
                        + "<td style=\"min-width:600;\"><table width=\"600\" class=\"waiting_pass\" height=\"200\">\n" +
                        "                <tbody>\n" +
                        "<tr>\n" +
                        "                    <td rowspan=\"6\" width=\"80\"><img src=\"img/user2.png\"></td>\n" +
                        "</tr>\n" +
                        "<tr>\n" +
                        "                    <td colspan=\"4\"><b><font color=\"#999900\" size=\"5\">" +
                        res_1.rows[i][0] +" " +
                        res_1.rows[i][1] +" " +
                        res_1.rows[i][2] +
                        "</font><font\n" +
                        "                            color=\"#079D3C\" size=\"5\"> на рассмотрении</font></b></td>\n" +
                        "                </tr>";
                } else if (res_1.rows[i][20]) {
                    single_passes = single_passes + "<table width=\"600\" class=\"approved_pass\" height=\"200\">\n" +
                        "                <tbody>\n" +
                        "<tr>\n" +
                        "                    <td rowspan=\"6\" width=\"80\"><img src=\"img/user2.png\"></td>\n" +
                        "</tr>\n" +
                        "<tr>\n" +
                        "                    <td colspan=\"4\"><b><font color=\"#0B0BCC\" size=\"5\">" +
                        res_1.rows[i][0] +" " +
                        res_1.rows[i][1] +" " +
                        res_1.rows[i][2] +
                        "</font><font\n" +
                        "                            color=\"#004d00\" size=\"5\"> одобрено</font></b></td>\n" +
                        "                </tr>";
                } else {
                    single_passes = single_passes + "<table width=\"600\" class=\"rejected_pass\" height=\"200\">\n" +
                        "                <tbody>\n" +
                        "<tr>\n" +
                        "                    <td rowspan=\"6\" width=\"80\"><img src=\"img/user2.png\"></td>\n" +
                        "</tr>\n" +
                        "<tr>\n" +
                        "                    <td colspan=\"4\"><b><font color=\"#660000\" size=\"5\">" +
                        res_1.rows[i][0] +" " +
                        res_1.rows[i][1] +" " +
                        res_1.rows[i][2] +
                        "</font><font\n" +
                        "                            color=\"#079D3C\" size=\"5\"> отклонено</font></b></td>\n" +
                        "                </tr>";
                }
                single_passes = single_passes + "<tr><td><label> Тип документа </label></td><td><label>" +
                    res_1.rows[i][6] +"</label></td><td><label> Номер документа </label></td><td><label>" +
                    res_1.rows[i][7] +"</label></td></tr>";
                single_passes = single_passes + "<tr><td><label> Водитель </label></td>";
                if (res_1.rows[i][17]) {
                    single_passes = single_passes + "<td align=\"center\"><img src=\"img/ok.png\"></td></tr>\n" +
                        "<tr><td><label> Номер машины </label></td><td><label>"+res_1.rows[i][18]+"</label></td>" +
                        "<td><label> Марка машины </label></td><td><label>"+res_1.rows[i][24]+"</label></td></tr>\n" +
                        "<tr><td><label> Груз: </label></td><td><label>"+res_1.rows[i][25]+"</label></td></tr>";
                } else {
                    single_passes = single_passes + "<td align=\"center\"><img src=\"img/no.png\"></td></tr>\n";
                }
                single_passes = single_passes + "<tr><td><label> Представитель организации </label></td>" +
                    "<td><label>" + res_1.rows[i][9] +"</label></td></tr>";
                single_passes = single_passes + "<tr><td align=\"center\"><img src=\"img/date.png\"></td>\n" +
                    "<td><label>"+res_1.rows[i][12]+"</label></td>" +
                    "<td align=\"center\"><img src=\"img/time.png\"></td>" +
                    "<td><label>" + res_1.rows[i][13].substring(0,5) + "</label></td></tr>";
                single_passes = single_passes + "<tr><td><label> Долговременный: </label></td>";
                if (res_1.rows[i][22]) {
                    single_passes = single_passes + "<td align=\"center\"><img src=\"img/ok.png\"></td></tr>\n";
                    single_passes = single_passes + "<tr><td><label>Дата окончания:</label></td>" +
                        "<td><label>"+res_1.rows[i][23]+"</label></td></tr>";
                } else {
                    single_passes = single_passes + "<td align=\"center\"><img src=\"img/no.png\"></td></tr>\n";
                }
                single_passes = single_passes + "<tr><td><label>Коммантарий</label></td>" +
                    "<td><label>"+res_1.rows[i][21]+"</label></td></tr>";
                single_passes = single_passes + "</tbody></table></td>"
                if ((i % 2 === 1) || (i === n_1 - 1)) {
                    single_passes = single_passes + "</tr>";
                }
            }
            break;
        case 2:
            if (type_user === "controller_by_walk") {
                query = query + "(((no_single = true) AND (date_pass <= current_date) AND " +
                    "(finish_time >= current_date)) OR ((no_single = false) AND" +
                    " (date_pass = current_date))) AND (status_pass = true) "
                    + "AND (status_factory = false) AND (driver = false));";
            } else if (type_user === "controller_car") {
                query = query + "(((no_single = true) AND (date_pass <= current_date) AND " +
                    "(finish_time >= current_date)) OR ((no_single = false) AND" +
                    " (date_pass = current_date))) AND (status_pass = true) "
                    + "AND (status_factory = false) AND (driver = true));";
            }
            const res_2 = await client.query({
                rowMode: 'array',
                text: query,
            });
            let n_2 = res_2.rowCount;
            for (let i = 0; i < n_2; i++){

            }
            break;
        case 3:
            if (type_user === "controller_by_walk") {
                query = query + "(no_single = false) AND (status_factory = true) AND (driver = false));";
            } else if (type_user === "controller_car") {
                query = query + "(no_single = false) AND (status_factory = true) AND (driver = true));";
            }
            const res_3 = await client.query({
                rowMode: 'array',
                text: query,
            });
            let n_3 = res_3.rowCount;
            for (let i = 0; i < n_3; i++){

            }
            break;
        case 4:
            query = query + "((no_single = false) AND ((pass_using = true) OR (current_date > date_pass))));";
            const res_4 = await client.query({
                rowMode: 'array',
                text: query,
            });
            let n_4 = res_4.rowCount;
            for (let i = 0; i < n_4; i++){

            }
            break;
        case 5:
            query = query + "(((status_appology = true) OR (status_appology IS NULL)) AND ((date_pass = current_date)"
                + " OR (date_pass > current_date))));";
            const res_5 = await client.query({
                rowMode: 'array',
                text: query,
            });
            let n_5 = res_5.rowCount;
            for (let i = 0; i < n_5; i++){

            }
            break;
        case 6:
            if (type_user === "controller_by_walk") {
                query = query + "((status_pass = true) AND ((date_pass > current_date)"
                    + " OR ((no_single = true) AND (finish_time > current_date)))"
                    + " AND (driver = false)));";
            } else if (type_user === "controller_car") {
                query = query + "((status_pass = true) AND ((date_pass > current_date)"
                    + " OR ((no_single = true) AND (finish_time > current_date)))"
                    + " AND (driver = true)));";
            }
            const res_6 = await client.query({
                rowMode: 'array',
                text: query,
            });
            let n_6 = res_6.rowCount;
            for (let i = 0; i < n_6; i++){

            }
            break;
    }

    let main_data = {
        req: request,
        res: response,
        fContent: undefined,
        cl: undefined,
    }
    await main_MyPortal(main_data);
    client.end();
    main_data.fContent = main_data.fContent.replace("{TextAllField}",all_search);
    main_data.fContent = main_data.fContent.replace("{TextSurnameField}",surname_search);
    main_data.fContent = main_data.fContent.replace("{TextNameField}",name_search);
    main_data.fContent = main_data.fContent.replace("{TextDocumentNumField}",document_num_search);
    main_data.fContent = main_data.fContent.replace("{TextPatronymicField}",patronymic_search);
    main_data.fContent = main_data.fContent.replace("{TextCarNumField}",car_num_search);
    let fCon2 = fs.readFileSync("resource.html", "utf-8");
    fCon2 = fCon2.replace("{PassesList}",single_passes);
    main_data.fContent = main_data.fContent.replace("{ListPasses}",fCon2);
    main_data.fContent = main_data.fContent.replace("{ActionSearchUrl}",request.url);
    response.send(main_data.fContent);
    response.end();
}

app.get("/MyPortal.html!*",refresh);

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

app.post("/MyPortal.html!*Sch",urlencodedParser, refresh);

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

app.post("/create_pass", urlencodedParser, async function (request, response) {
    let client = new Client({
        user: request.cookies.login,
        host: 'localhost',
        database: '345MF',
        password: request.cookies.password,
        port: 5432,
    })
    client.connect(err => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });
    let query_id_worker = "SELECT id_workers FROM registers_user WHERE login_database = '"
        + request.cookies.login + "';";
    const result_id_worker = await client.query({
        rowMode: 'array',
        text: query_id_worker,
    });
    let id_worker = result_id_worker.rows[0][0];
    let query = "INSERT INTO single_passes " +
        "(surname,name,fathername,type_document,number_document,organization,date_pass," +
        "time_pass,date_query,time_query,id_director,driver,num_auto,organization_custom,commentary,no_single," +
        "finish_time,mark_car,cargo)" + " VALUES ('" + request.body.surname_input + "','"
        + request.body.name_input + "','" + request.body.fathername_input + "','" +
        request.body.document_type_input + "','" + request.body.document_num_input + "','" +
        request.body.organization_input + "','" + request.body.date_pass_input + "','" +
        request.body.time_pass_input + "+03:00',now(),now(),"+String(id_worker)+",";
    if (request.body.driver_input) {
        query = query + "true,'";
    } else {
        query = query + "false,'";
    }
    query = query + request.body.num_auto_input + "','"
        + "" + "','" + request.body.commentary_input + "',";
    if (request.body.long_time_input) {
        query = query + "true,'";
    } else {
        query = query + "false,'";
    }
    query = query + request.body.finish_date_input + "','" + request.body.mark_auto_input +
        "','" + request.body.cargo_input + "');";
    client
        .query(query)
        .catch(e => console.error(e.stack));
    response.redirect("/MyPortal.html");
});



app.listen(3000);
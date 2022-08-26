function decline_fun(id) {
    let form = document.getElementById("decline" + String(id));
    let str = prompt("Опишите причину отказа:");
    form.method = "post";
    form.action = "/zbdecline?id="+String(id)+"&commentary="+encodeURIComponent(str);
    form.submit();
}
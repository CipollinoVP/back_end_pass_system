const user = "student";

const xhr = new XMLHttpRequest();
// POST-запрос к ресурсу /user
xhr.open("POST", "/user");

// обработчик получения ответа сервера
xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    } else {
        console.log("Server response: ", xhr.statusText);
    }
};
xhr.send(user);     // отправляем значение user в методе send
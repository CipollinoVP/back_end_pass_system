function confirm_add_pass() {
    let message_confirm = "Фамилия: " + document.FormRegister.surname_input.value + "\n Имя: " +
        document.FormRegister.name_input.value + "\n Отчество: " + document.FormRegister.fathername_input.value
        + "\n Тип документа: " + document.FormRegister.document_type_input.value + "\n Номер документа: " +
        document.FormRegister.document_num_input.value + "\n Организация: " +
        document.FormRegister.organization_input.value + "\n Дата: " +
        document.FormRegister.date_pass_input.value + "\n Время: " +
        document.FormRegister.time_pass_input.value + "\n Комментарий: " +
        document.FormRegister.commentary_input.value + "\n";
    if (document.FormRegister.driver_input.checked) {
        message_confirm = message_confirm + "Водитель: да\n Номер авто: " + document.FormRegister.num_auto_input.value
            + "\n Марка и цвет машины: " + document.FormRegister.mark_auto_input.value
            + "\n Груз: " + document.FormRegister.cargo_input.value;
    } else {
        message_confirm = message_confirm + "Водитель: нет";
    }
    if (document.FormRegister.long_time_input.checked) {
        message_confirm = message_confirm + "\n Договременный, дата окончания: "
            + document.FormRegister.finish_date_input.value;
    }
    let admit = confirm(message_confirm);
    if (admit) {
        document.FormRegister.method = "post";
        document.FormRegister.action = "/edit_pass"+document.documentURI.substring(document.documentURI.indexOf("edit")
            + 4, document.documentURI.length);
        document.FormRegister.submit();
    } else {

    }
}
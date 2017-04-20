/**
 * Created by mmushko on 11/04/17.
 */

var Yandex_mail_page = function() {
	this.new_massage = "//a[contains(@title, 'Написать')]";
	this.recipient_field = "//*[contains(text(),'Кому')]/parent::label/div[3]/div";
	this.subject_field = "//*[contains(text(),'Тема')]/parent::label//input";
	this.content_field = "//*[@id = 'cke_editor1']//textarea";
	this.send_button = "//button[contains(@title, 'Отправить письмо')]";
};

module.exports = Yandex_mail_page;
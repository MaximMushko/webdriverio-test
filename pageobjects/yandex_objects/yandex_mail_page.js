/**
 * Created by mmushko on 11/04/17.
 */

var Yandex_mail_page = Object.create(null, {

	new_massage: {get: function() {
		return browser.element("//a[contains(@title, 'Написать')]");
	}},

	recipient_field: {get: function() {
		return browser.element("//*[contains(text(),'Кому')]/parent::label/div[3]/div");
	}},

	subject_field: {get: function() {
		return browser.element("//*[contains(text(),'Тема')]/parent::label//input");
	}},

	content_field: {get: function() {
		return browser.element("//*[@id = 'cke_editor1']//textarea");
	}},

	send_button: {get: function() {
		return browser.element("//button[contains(@title, 'Отправить письмо')]");
	}}
});

module.exports = Yandex_mail_page;
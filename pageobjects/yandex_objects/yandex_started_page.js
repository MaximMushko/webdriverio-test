/**
 * Created by mmushko on 11/04/17.
 */

var Yandex_started_page = function() {
	this.login_input = "//input[@name='login']";
	this.password_input = "//input[@name='passwd']";
	this.sing_in_button = "//span[contains(text(),'Войти')]/parent::button";
};

Yandex_started_page.base_url =  "http://mail.yandex.ru";

module.exports = Yandex_started_page;
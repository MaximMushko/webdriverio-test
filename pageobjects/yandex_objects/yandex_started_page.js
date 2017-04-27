/**
 * Created by mmushko on 11/04/17.
 */

var Yandex_started_page = Object.create(null, {
	username_input: {
	 	get: function() {
	 		return browser.element("//input[@name='login']");
	 	}
	},
	password_input: {
		get: function() {
			return browser.element("//input[@name='passwd']");
		}
	},
	sing_in_button: {
		get: function() {
			return browser.element("//span[contains(text(),'Войти')]/parent::button");
		}
	}
});

Yandex_started_page.base_url = "http://mail.yandex.ru";

module.exports = Yandex_started_page;
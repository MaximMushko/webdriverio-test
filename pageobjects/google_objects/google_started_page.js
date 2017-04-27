/**
 * Created by mmushko on 11/04/17.
 */

var Google_started_page = Object.create(null,{
	google_components: {get: function() {
		return browser.element("//*[@id='gbwa']");
	}},
	mail_component_button: {get: function() {
		return browser.element("//*[@id='gb23']");
	}},
	sing_in_button: {get: function() {
		return browser.element("//*[contains(text(),'Sign In')]");
	}},
	login_input: {get: function() {
		return browser.element("//*[@id= 'identifierId']");
	}},
	password_input: {get: function() {
		return browser.element("//*[@id='password']//input");
	}},
	next: {get: function() {
		return browser.element("//*[@id = 'identifierNext']")
	}},
	sign: {get: function() {
		return browser.element("//*[@id = 'passwordNext']")
	}}
});

Google_started_page.base_url =  "https://www.google.ru/";

module.exports = Google_started_page;
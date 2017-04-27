/**
 * Created by mmushko on 11/04/17.
 */

var Google_mail_page =  Object.create(null,{
	compose_button: {get: function() {
		return browser.element("//*[contains(text(),'COMPOSE')]");
	}},
	recipient_field: {get: function() {
		return browser.element("//textarea[@name = 'to']");
	}},
	subject_field: {get: function() {
		return browser.element("//input[@name = 'subjectbox']");
	}},
	content_field: {get: function() {
		return browser.element("//div[@aria-label='Message Body']");
	}},
	send_button: {get: function() {
		return browser.element("//*[contains(text(),'Send')]");
	}}
});

module.exports = Google_mail_page;
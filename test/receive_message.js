/**
 * Created by mmushko on 11/04/17.
 */

var webdriverio = require('webdriverio');
var webdrivercss = require('webdrivercss');
var assert = require('assert');
var Yandex_started_page = require('../pageobjects/yandex_objects/yandex_started_page');
var Yandex_mail_page = require('../pageobjects/yandex_objects/yandex_mail_page');
var Google_started_page = require('../pageobjects/google_objects/google_started_page');
var Google_mail_page = require('../pageobjects/google_objects/google_mail_page');
var config = require('../test_properties.json');

describe('test yandex mail receive', function() {
	beforeEach(function(callback) {
		browser.url(Yandex_started_page.base_url);
	});

	it('receive mail test', function() {
		var login = config.yandex.username;
		var password = config.yandex.password;
		var recipient = config.recipients;
		var subject = config.subject;
		var message = config.message;

		Yandex_started_page.username_input.setValue(login);
		Yandex_started_page.password_input.setValue(password);
		Yandex_started_page.sing_in_button.click();

		Yandex_mail_page.new_massage.waitForVisible();
		Yandex_mail_page.new_massage.click();
		Yandex_mail_page.send_button.waitForVisible();
		Yandex_mail_page.recipient_field.setValue(recipient[0]);
		Yandex_mail_page.subject_field.setValue(subject);
		Yandex_mail_page.content_field.setValue(message);
		browser.webdrivercss("message page", [{
			elem:"//*[@id = 'cke_editor1']//textarea",
			name: "message_content"
		}]);
		Yandex_mail_page.send_button.doubleClick();
	});
});

describe('test google mail receive', function() {
	beforeEach(function(callback) {
		browser.url(Google_started_page.base_url);
	});

	xit('receive mail test', function() {
		var login = config.google.username;
		var password = config.google.password;
		var recipients = config.recipients;
		var subject = config.subject;
		var content = config.message;

		Google_started_page.google_components.click();
		Google_started_page.mail_component_button.waitForVisible();
		Google_started_page.mail_component_button.click();
		Google_started_page.sing_in_button.waitForVisible();
		Google_started_page.sing_in_button.click();
		Google_started_page.login_input.waitForVisible();
		Google_started_page.login_input.setValue(login);
		Google_started_page.next.click();
		Google_started_page.password_input.waitForVisible();
		Google_started_page.password_input.setValue(password);
		Google_started_page.sign.click();

		Google_mail_page.compose_button.waitForVisible();
		Google_mail_page.compose_button.click();
		Google_mail_page.send_button.waitForVisible();
		Google_mail_page.recipient_field.setValue(recipients);
		Google_mail_page.subject_field.setValue(subject);
		Google_mail_page.content_field.setValue(content);
		Google_mail_page.send_button.click();

	});
});
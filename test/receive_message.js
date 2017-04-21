/**
 * Created by mmushko on 11/04/17.
 */

var webdriverio = require('webdriverio');
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

		var yandex_started_page = new Yandex_started_page();
		var yandex_mail_page = new Yandex_mail_page();
		
		var login_field = browser.element(yandex_started_page.login_input);
		var password_field = browser.element(yandex_started_page.password_input);
		var sing_in_button = browser.element(yandex_started_page.sing_in_button);
		
		login_field.setValue(login);
		password_field.setValue(password);
		sing_in_button.doubleClick();

		browser.waitForEnabled(yandex_mail_page.new_massage);
		var new_message_button = browser.element(yandex_mail_page.new_massage);
		new_message_button.click();

		browser.waitForEnabled(yandex_mail_page.send_button);
		var recipient_field = browser.element(yandex_mail_page.recipient_field);
		var subject_field = browser.element(yandex_mail_page.subject_field);
		var message_field = browser.element(yandex_mail_page.content_field);
		var send_button = browser.element(yandex_mail_page.send_button);

		recipient_field.setValue(recipient[0]);
		subject_field.setValue(subject);
		message_field.setValue(message);
		send_button.doubleClick();
	});
});

describe('test google mail receive', function() {
	beforeEach(function(callback) {
		browser.url(Google_started_page.base_url);
	});

	it('receive mail test', function() {
		var login = config.google.username;
		var password = config.google.password;
		var recipients = config.recipients;
		var subject = config.subject;
		var content = config.message;
		var google_started_page = new Google_started_page();
		var google_mail_page = new Google_mail_page();

		var google_components_button = browser.element(google_started_page.google_components);
		google_components_button.click();

		browser.waitForVisible(google_started_page.mail_component_button);
		var mail_component_button = browser.element(google_started_page.mail_component_button);
		mail_component_button.click();

		browser.waitForVisible(google_started_page.sing_in_button);
		var sing_in_button = browser.element(google_started_page.sing_in_button);
		sing_in_button.click();

		browser.waitForVisible(google_started_page.login_input);
		var login_input = browser.element(google_started_page.login_input);
		var next_button = browser.element(google_started_page.next);
		login_input.setValue(login);
		next_button.click();

		browser.waitForVisible(google_started_page.password_input);
		var password_input = browser.element(google_started_page.password_input);
		var sign_in = browser.element(google_started_page.sign);
		password_input.setValue(password);
		sign_in.click();

		console.log(google_mail_page.compose_button);
		browser.waitForVisible(google_mail_page.compose_button);
		var compose_button = browser.element(google_mail_page.compose_button);
		compose_button.click();

		browser.waitForVisible(google_mail_page.send_button);
		var recipient_field = browser.element(google_mail_page.recipient_field);
		var subject_field =  browser.element(google_mail_page.subject_field);
		var content_field = browser.element(google_mail_page.content_field);
		var send_button = browser.element(google_mail_page.send_button);

		recipient_field.setValue(recipients);
		subject_field.setValue(subject);
		content_field.setValue(content);
		send_button.click();
	});
});
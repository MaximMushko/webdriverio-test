/**
 * Created by mmushko on 11/04/17.
 */

var Google_started_page = function() {
	this.google_components = "//*[@id='gbwa']";
	this.mail_component_button = "//*[@id='gb23']";
	this.sing_in_button = "//*[contains(text(),'Sign In')]";
	this.login_input = "//*[@id='Email']";
	this.password_input = "//*[@id='Passwd']";
	this.next = "//*[@id = 'next']";
	this.sign = "//*[@id = 'signIn']";
};

Google_started_page.base_url =  "https://www.google.ru/";

module.exports = Google_started_page;
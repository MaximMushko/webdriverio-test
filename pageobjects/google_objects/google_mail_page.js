/**
 * Created by mmushko on 11/04/17.
 */

var Google_mail_page = function() {
	this.compose_button = "//*[contains(text(),'COMPOSE')]";
	this.recipient_field = "//textarea[@name = 'to']";
	this.subject_field = "//input[@name = 'subjectbox']";
	this.content_field = "//div[@aria-label='Message Body']";
	this.send_button = "//*[contains(text(),'Send')]";
};



module.exports = Google_mail_page;
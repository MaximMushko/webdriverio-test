# webdriverio-test
Here you can find step by step instruction to create webdiverIO project.
All documentation you can find in [webdriverIO official website](http://webdriver.io/)

## Download and setup
First of all, you need to install npm and nodeJS into you local machine.

1. Create new repository or clone repository from gitub


2. Install webdriverIO npm package
```bash
$ npm install webdriverio --save-dev
```

3. After installation you should see dependence in package.json
```JSON
"devDependencies": {
    "webdriverio": "^4.6.2"
  },
```
4. Also you should see wdio script
```JSON
"scripts": {
    "test": "wdio"
  },
```

5. Run wdio script in terminal and you can see wdio config.
    1. "Where do you want execute your test?". - on my local machine
    2. "What framework do you want to use?" - mocha
    3. "Shall i install framework udapter to you?" - Yes
    4. "Where are you test specs located?" - ./test
    5. "Which report do you want to use?" - spec
    6. "Shall i install reporter framework?"  - yes
    7. "Do you want to add a service to your test setup?" - selenium-standalone
    8. "Shall i install a service?" - yes
    9. "Level of logging?" - command
    10. "In which directory should screenshots gets saved if a command falls?" - ./errorShots
    11. "What is a base url?" - www.google.com

7. When you put all setting you should see wdio.conf.js file. This file contains all setting for webdriverIO.

## Look at wdio.conf.js file
Open your wdio.conf.js file. Please, make attention on points below:

8. Make sure, that selenium-standalone services added in services.

```javasctipt
services: ['selenium-standalone']
```

9. Plase, add timeout property into mocha setting, because by default mocha give you 10000 ms for each test.

```javascript
 mochaOpts: {
        ui: 'bdd',
        timeout: 100000
    },
```

10. Make sure, that you use webdriver io in synchonize mode. In synchonize mode you can't use promises.
```javascript
sync: true,
```

11. Add waitforTimeout property. This property was used by webdriverIO when you use any waitFor* function.
```javascript
waitforTimeout: 20000,
```

## Sample test example
Now you can create a new test via webdriverio and run it via mocha.

12. Create new js files in test specs folder.
13. Code example:
```javascript
var expect = require('chai').expect;
describe('webdriver.io api page', function() {
    it('should be able to filter for commands', function () {
        browser.url('http://webdriver.io/api.html');
        // filtering property commands
        $('.searchbar input').setValue('getT');
        // get all results that are displayed
        var results = $$('.commands.property a').filter(function (link) {
            return link.isVisible();
        });
        // assert number of results
        expect(results.length).to.be.equal(3);
        // check out second result
        results[1].click();
        expect($('.doc h1').getText()).to.be.equal('GETTEXT');
    });
});
```

13. describe block - it's a block to collect cases for one function/functionality.

14. it block - it's a separate test into describe.

## Pageobject pattern with webdriverIO

The most concern with webdriverIO - we can't realise pageobject pattern, because all new instances of classes created async.
You can create new page object as object with selectors for particular page. Example:

```javascript
var Yandex_mail_page = function() {
	this.new_massage = "//a[contains(@title, 'Написать')]";
	this.recipient_field = "//*[contains(text(),'Кому')]/parent::label/div[3]/div";
	this.subject_field = "//*[contains(text(),'Тема')]/parent::label//input";
	this.content_field = "//*[@id = 'cke_editor1']//textarea";
	this.send_button = "//button[contains(@title, 'Отправить письмо')]";
};

module.exports = Yandex_mail_page;
```
Here you can see selectors for yandex mail page's object.

In your test you can require you class, create a instance. But be careful, you need create instance only when webpage with objects will be open on browser. Test example with page object

```javascript
var webdriverio = require('webdriverio');
var Yandex_started_page = require('../pageobjects/yandex_objects/yandex_started_page');
var Yandex_mail_page = require('../pageobjects/yandex_objects/yandex_mail_page');
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
```
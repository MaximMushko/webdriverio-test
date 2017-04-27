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
    - "Where do you want execute your test?". - on my local machine
    - "What framework do you want to use?" - mocha
    - "Shall i install framework udapter to you?" - Yes
    - "Where are you test specs located?" - ./test
    - "Which report do you want to use?" - spec
    - "Shall i install reporter framework?"  - yes
    - "Do you want to add a service to your test setup?" - selenium-standalone
    - "Shall i install a service?" - yes
    - "Level of logging?" - command
    - "In which directory should screenshots gets saved if a command falls?" - ./errorShots
    - "What is a base url?" - www.google.com

7. When you put all setting you should see wdio.conf.js file. This file contains all setting for webdriverIO.

## Look at wdio.conf.js file
Open your wdio.conf.js file. Please, make attention on points below:

8. Make sure, that selenium-standalone services added in services.

```javasctipt
services: ['selenium-standalone']
```

9. Please, add timeout property into mocha setting, because by default mocha give you 10000 ms for each test.

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

You can implement pageobject pattern with WebDriverIO. For this you should a new page object as object with getters for each component on particular page. Example:

```javascript
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
```
Here you can see components for yandex mail page's object.

In your test you can require you page object. But be careful, you need to call your component only when webpage with objects will be open on browser. Test example with page object

```javascript
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

		Yandex_started_page.username_input.setValue(login);
		Yandex_started_page.password_input.setValue(password);
		Yandex_started_page.sing_in_button.click();

		Yandex_mail_page.new_massage.waitForVisible();
		Yandex_mail_page.new_massage.click();
		Yandex_mail_page.send_button.waitForVisible();
		Yandex_mail_page.recipient_field.setValue(recipient[0]);
		Yandex_mail_page.subject_field.setValue(subject);
		Yandex_mail_page.content_field.setValue(message);
		Yandex_mail_page.send_button.doubleClick();
	});
});
```

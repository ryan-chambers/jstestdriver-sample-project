TestCase("validateAlphaNumeric", {
	"test validateAlphaNumeric valid" : function() {
        /*:DOC input = <input type="text" id="test_field" value="aB1" /> */
		var field = $(this.input),
			isValid;
		isValid = validation.validateAlphaNumeric(field);
		assertEquals("aB1 should be valid", true, isValid);
	},
	"test validateAlphaNumeric invalid" : function() {
        /*:DOC input = <input type="text" id="test_field" value="!" /> */
		var field = $(this.input),
			isValid;
		isValid = validation.validateAlphaNumeric(field);
		assertEquals("! should not be a valid alphanumeric value", false, isValid);
	}
});

function createFakeResponse(responseCode) {
    return [
	 	200,
	 	{ "Content-Type": "text/xml" },
	 	'<?xml version="1.0" encoding="UTF-8"?><result>' + responseCode + '</result>'
	];
}

function callValidation(field, server) {
	validation.validateUsername(field);

	server.respond();

	return validation.isUsernameValid();
}

TestCase("validateUsername", sinon.testCase({
	setUp : function() {
		validation.reset();
	    this.server = sinon.fakeServerWithClock.create();
	    /*:DOC input = <input type="text" id="test_field" value="!" /> */
	},

	tearDown: function() {
	    this.server.restore();
	},

	"test validateUsername user name already used" : function() {
		var field = $(this.input),
			isValid;

		this.server.respondWith(createFakeResponse('error : username already used'));

		isValid = callValidation(field, this.server);

		assertEquals("should have got username already used error", isValid, false);
	},

	"test validateUsername valid" : function() {
        /*:DOC input = <input type="text" id="test_field" value="chuck_norris" /> */
		var field = $(this.input),
			isValid;

		this.server.respondWith(createFakeResponse('valid'));

		isValid = callValidation(field, this.server);

		assertEquals("username should be valid", isValid, true);
	}
}));
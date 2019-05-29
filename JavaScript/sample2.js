

"use strict";
var mpns = window.mpns || {};
mpns.subns = mpns.subns || {};

(function () {
	this.functionB = function (primaryControl) {
		debugger;
		var accountName = primaryControl.getAttribute('customerid').getValue();
		var splitsmessageObj = {
					text: "hello world!"
				};
		Xrm.Navigation.openAlertDialog(splitsmessageObj);

		var confirmOptions = {
			height: 200,
			width: 450
		};
		var messageObj = {
				text: "hello World"
			};
		Xrm.Navigation.openAlertDialog(messageObj, confirmOptions);
		primaryControl.data.entity.save();
	}

	////private functions

	function checkAttribute(primaryControl, attribute, message, newText) {
		//debugger;
		var returnValue = null;
		var testAttribute = primaryControl.getAttribute(attribute);
		if (!isNull(testAttribute)) {
			var attributeValue = testAttribute.getValue();
			if (isNullOrUndefined(attributeValue)) {
				returnValue = formatMessage(message, newText);
			}
		} else {
			console.error(attribute + " field is missing.");
		}
		return returnValue;
	}

	function isNull(obj) {
		if (obj === null) {
			return true;
		}
		return false;
	}

	function isUndefined(obj) {
		if (typeof obj === "undefined") {
			return true;
		}
		return false;
	}

	function isNullOrUndefined(obj) {
		if (isNull(obj) || isUndefined(obj)) {
			return true;
		}
		return false;
	}

	function formatMessage(message, newString) {
		if (message === "") {
			message += messageIntro;
		}

		if (message.length > messageIntro.length) {
			message += ",\n";
		}

		message += newString;
		return message;
	}
}
.call(mpns.subns));

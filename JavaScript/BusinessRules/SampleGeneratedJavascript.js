//this is a sample of the javascript that gets generated when you create a business rule.
//a pbl is a portable business language implementation
function pbl_92b5bc1d93d1e811a967000d3a30d5db(eventContext) {
	try {
		var v0 = (!Mscrm.BusinessRules.Utility.isNull(eventContext) && typeof eventContext.getFormContext === "function") ? eventContext.getFormContext().data.entity : Xrm.Page.data.entity;
		var v1 = v0.attributes.get('activitiescomplete');
		var v2 = v0.attributes.get('followupby');
		var v3 = v0.attributes.get('modifiedon');
		var v4 = v0.attributes.get('my_specicialfieldcode');
		var v7 = '';
		if (((v1) == undefined || (v1) == null || (v1) === "") || ((v2) == undefined || (v2) == null || (v2) === "") || ((v3) == undefined || (v3) == null || (v3) === "") || ((v4) == undefined || (v4) == null || (v4) === "")) {
			return;
		}
		var v5 = (v1) ? v1.getValue() : null;
		var v6 = (v4) ? v4.getValue() : null;
		if ((v5) == (true) || ((v5) == true && (true) == '1') || ((v5) == false && (true) == '0') || ((v5) == '1' && (true) == true) || ((v5) == '0' && (true) == false)) {
			v2.setUtcValue((v3) ? v3.getUtcValue() : null);
		} else if ((v6) == (true) || ((v6) == true && (true) == '1') || ((v6) == false && (true) == '0') || ((v6) == '1' && (true) == true) || ((v6) == '0' && (true) == false)) {
			v1.controls.forEach(function (c, i) {
				c.setNotification(Mscrm.BusinessRulesScript.GetResourceString('31826f1b-47b4-4ffe-93c8-878bfad8ccd2', 'You need to mark activities complete'), '92b5bc1d-93d1-e811-a967-000d3a30d5dbSetMessageStep2');
			});
			v7 = v7 + '92b5bc1d-93d1-e811-a967-000d3a30d5dbSetMessageStep2\x3b';
		}
		var v8 = [{
				'CId': 'activitiescomplete',
				'SId': '92b5bc1d-93d1-e811-a967-000d3a30d5dbSetMessageStep2'
			}
		];
		for (var i = 0; i < v8.length; i++) {
			var l1 = v8[i];
			if (v7.indexOf(l1.SId + '\x3b') === -1) {
				var v0 = (l1.RId) ? v0.relatedEntities.get(l1.RId) : v0;
				var attributeObject = (v0) ? v0.attributes.get(l1.CId) : null;
				(attributeObject) && attributeObject.controls.forEach(function (c, i) {
					c.clearNotification(l1.SId);
				});
			}
		}
	} catch (e) {
		Mscrm.BusinessRules.ErrorHandlerFactory.getHandler(e, arguments.callee).handleError();
	}
}

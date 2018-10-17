//represents a complex business rule. See the BR at: https://github.com/rajrao/CRM-Tools/blob/master/JavaScript/BusinessRules/New%20business%20rule.png
function pbl_e5831ee218d2e811a96c000d3a3099e5(eventContext) {
	try {
		var v0 = (!Mscrm.BusinessRules.Utility.isNull(eventContext) && typeof eventContext.getFormContext === "function") ? eventContext.getFormContext().data.entity : Xrm.Page.data.entity;
		var v1 = v0.attributes.get('caseorigincode');
		var v2 = v0.attributes.get('checkemail');
		var v3 = v0.attributes.get('casetypecode');
		var v4 = v0.attributes.get('msdyn_incidenttype');
		var v5 = v0.attributes.get('isescalated');
		var v6 = v0.attributes.get('customerid');
		var v7 = v0.attributes.get('escalatedon');
		var v8 = v0.attributes.get('modifiedon');
		var v9 = v0.attributes.get('description');
		var v10 = v0.attributes.get('socialprofileid');
		var v11 = v0.attributes.get('emailaddress');
		var v13 = v0.attributes.get('title');
		var v14 = {
			message: Mscrm.BusinessRulesScript.GetResourceString('c301a11d-7151-44dc-a849-0b27d41c70f1', 'Check your email'),
			actions: null
		};
		var v15 = '';
		var v17 = function (op1, op2, e) {
			return e(op1, op2);
		};
		if (((v1) == undefined || (v1) == null || (v1) === "") || ((v2) == undefined || (v2) == null || (v2) === "") || ((v3) == undefined || (v3) == null || (v3) === "") || ((v4) == undefined || (v4) == null || (v4) === "") || ((v5) == undefined || (v5) == null || (v5) === "") || ((v6) == undefined || (v6) == null || (v6) === "") || ((v7) == undefined || (v7) == null || (v7) === "") || ((v8) == undefined || (v8) == null || (v8) === "") || ((v9) == undefined || (v9) == null || (v9) === "") || ((v10) == undefined || (v10) == null || (v10) === "") || ((v11) == undefined || (v11) == null || (v11) === "")) {
			return;
		}
		var v12 = (v1) ? v1.getValue() : null;
		var v16 = (v3) ? v3.getValue() : null;
		var v18 = (v9) ? v9.getValue() : null;
		if ((v12) === (1)) {
			(Xrm.Page.ui.getFormType() == 1 && (v13 != null && (typeof v13.getValue() === 'boolean' || (v13.getValue() === null || (typeof v13.getValue() === 'string' && v13.getValue().trim.length === 0)))) ? v13.setValue('Origin is phone') : null);
		} else if ((v12) === (2)) {
			v14.actions = [function () {
					v11.setValue('this is a recommendation');
				}
			];
			v2.controls.forEach(function (c, i) {
				c.addNotification({
					messages: [Mscrm.BusinessRulesScript.GetResourceString('aeea14f7-231f-4f9f-92c3-2faeac40a124', 'Check email')],
					notificationLevel: Xrm.NotificationLevel.recommendation,
					uniqueId: 'e5831ee2-18d2-e811-a96c-000d3a3099e5SetMessageStep3',
					actions: [v14]
				});
			});
			v15 = v15 + 'e5831ee2-18d2-e811-a96c-000d3a3099e5SetMessageStep3\x3b';
		} else if ((v16) === (1)) {
			v4.controls.forEach(function (c, i) {
				c.setDisabled(true);
			});
		} else if ((v16) === (2)) {
			v1.controls.forEach(function (c, i) {
				c.setNotification(Mscrm.BusinessRulesScript.GetResourceString('bbeec792-00eb-40bc-886b-f5045e2073e7', 'This is a test error message'), 'e5831ee2-18d2-e811-a96c-000d3a3099e5SetMessageStep7');
			});
			v15 = v15 + 'e5831ee2-18d2-e811-a96c-000d3a3099e5SetMessageStep7\x3b';
		} else if ((v16) === (3)) {
			v5.setValue(true);
			v6.setValue([{
						id: '\x7bc302470e-6dcb-e811-a974-000d3a1be90a\x7d',
						entityType: 'account',
						name: '1'
					}
				]);
			v7.setValue(v17((v8) ? v8.getUtcValue() : null, 0, function (op1, op2) {
					if ((op1) == undefined || (op1) == null || (op1) === "" || (op2) == undefined || (op2) == null || (op2) === "") {
						return null;
					}
					var result = op1;
					result.setDate(op1.getDate() + op2);
					return result;
				}));
		} else if (v17((v18), ('Help'), function (op1, op2) {
				if ((op1) == undefined || (op1) == null || (op1) === "") {
					return false;
				}
				return op1.toUpperCase().indexOf(op2.toUpperCase()) == 0;
			})) {
			v10.controls.forEach(function (c, i) {
				c.setVisible(false);
			});
		} else if (true) {
			v11.setRequiredLevel('required');
		}
		var v19 = [{
				'CId': 'checkemail',
				'SId': 'e5831ee2-18d2-e811-a96c-000d3a3099e5SetMessageStep3'
			}, {
				'CId': 'caseorigincode',
				'SId': 'e5831ee2-18d2-e811-a96c-000d3a3099e5SetMessageStep7'
			}
		];
		for (var i = 0; i < v19.length; i++) {
			var l1 = v19[i];
			if (v15.indexOf(l1.SId + '\x3b') === -1) {
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

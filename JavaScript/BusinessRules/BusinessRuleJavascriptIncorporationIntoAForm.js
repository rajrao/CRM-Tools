//The following shows how the business rule gets injected into a form
//the business rule itself, just copies the contents from one field into the other. (my_specialfield to name)
//The unique-id used by the function is the ID of the process record in Dynamics ie, in this the process record id is 8465872f-76d1-e811-a966-000d3a30d0ca
Mscrm.BusinessRulesScript.Initialize = function() {
    Mscrm.BusinessRulesScript.AttributesOnChangeHandlers = {};
    Mscrm.BusinessRulesScript.ControlsOnClickHandlers = {};
    (function() {
        var onchangehandler = function() {
            pbl_8465872f76d1e811a966000d3a30d0ca();
        };
        Mscrm.BusinessRulesScript.AttributesOnChangeHandlers['my_specialfield'] = onchangehandler;
        var entityObject = Xrm.Page.data.entity;
        var attributeObject = entityObject.attributes.get('my_specialfield');
        if (attributeObject != null && attributeObject != undefined) {
            attributeObject.addOnChange(onchangehandler);
        }
    }
    )();
    pbl_8465872f76d1e811a966000d3a30d0ca();
}
;

function pbl_8465872f76d1e811a966000d3a30d0ca(eventContext) {
	try {
		var v0 = (!Mscrm.BusinessRules.Utility.isNull(eventContext) && typeof eventContext.getFormContext === "function") ? eventContext.getFormContext().data.entity : Xrm.Page.data.entity;
		var v1 = v0.attributes.get('my_specialfield');
		var v2 = v0.attributes.get('name');
		if (((v1) == undefined || (v1) == null || (v1) === "") || ((v2) == undefined || (v2) == null || (v2) === "")) {
			return;
		}
		var v3 = (v1) ? v1.getValue() : null;
		if (((v3)) != undefined && ((v3)) != null && ((v3)) !== "") {
			v2.setValue((v1) ? v1.getValue() : null);
		}
	} catch (e) {
		Mscrm.BusinessRules.ErrorHandlerFactory.getHandler(e, arguments.callee).handleError();
	}
}

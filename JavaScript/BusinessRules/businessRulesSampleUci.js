function pbl_36105587a349e911a957000d3a3b9825(eventContext) {
    try {
        var v0 = (!Mscrm.BusinessRules.Utility.isNull(eventContext) && typeof eventContext.getFormContext === "function") ? eventContext.getFormContext().data.entity : Xrm.Page.data.entity;
        var v1 = v0.attributes.get('cmp_startdate');
        var v2 = v0.attributes.get('cmp_enddate');
        var v9 = '';
        if (((v1) == undefined || (v1) == null || (v1) === "") || ((v2) == undefined || (v2) == null || (v2) === "")) {
            return;
        }
        var v3 = (v1) ? v1.getUtcValue() : null;
        var v4 = (v2) ? v2.getUtcValue() : null;
        var v5 = (v2) ? v2.getValue() : null;
        var v6 = (((v5) != undefined && (v5) != null && (v5) !== "") ? new Date((v5).getFullYear(),(v5).getMonth(),(v5).getDate(),0,0,0) : null);
        var v7 = (v1) ? v1.getValue() : null;
        var v8 = (((v7) != undefined && (v7) != null && (v7) !== "") ? new Date((v7).getFullYear(),(v7).getMonth(),(v7).getDate(),0,0,0) : null);
        if (((((v3)) != undefined && ((v3)) != null && ((v3)) !== "") && (((v4)) != undefined && ((v4)) != null && ((v4)) !== "")) && ((v6) < (v8))) {
            v2.controls.forEach(function(c, i) {
                c.setNotification(Mscrm.BusinessRulesScript.GetResourceString('2ac19cc1-946c-4412-bbd6-8e8929fc6253', 'The end date cannot be before the start date\x21 Please pick an end date after the start date.'), '36105587-a349-e911-a957-000d3a3b9825SetMessageStep1');
            });
            v9 = v9 + '36105587-a349-e911-a957-000d3a3b9825SetMessageStep1\x3b';
        }
        var v10 = [{
            'CId': 'cmp_enddate',
            'SId': '36105587-a349-e911-a957-000d3a3b9825SetMessageStep1'
        }];
        for (var i = 0; i < v10.length; i++) {
            var l1 = v10[i];
            if (v9.indexOf(l1.SId + '\x3b') === -1) {
                var v0 = (l1.RId) ? v0.relatedEntities.get(l1.RId) : v0;
                var attributeObject = (v0) ? v0.attributes.get(l1.CId) : null;
                (attributeObject) && attributeObject.controls.forEach(function(c, i) {
                    c.clearNotification(l1.SId);
                });
            }
        }
    } catch (e) {
        Mscrm.BusinessRules.ErrorHandlerFactory.getHandler(e, arguments.callee).handleError();
    }
}

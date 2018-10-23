"use strict";

var ai = window.ai || {};
ai.EmailApi = ai.EmailApi || {};

(function () {
    //update the following to real ids (or get them at run time, if thats what you need).
    var queueId = "00000000-0000-0000-0000-000000000000";
    var accountIdTo1 = "00000000-0000-0000-0000-000000000000";
    var accountIdTo2 = "00000000-0000-0000-0000-000000000000";

    this.createEmailMain = function (templateId, objectType, objectId) {
        Xrm.Utility.showProgressIndicator("creating email");
        instantiateEmailTemplate(templateId, objectType, objectId)
            .then(createEmailRequest.bind(null,objectId))
            .then(createEmail)
            .then(function loadEmail(result) {
                Xrm.Utility.closeProgressIndicator();
                var entityFormOptions = {};
                entityFormOptions["entityName"] = result.entityType;
                entityFormOptions["entityId"] = result.id;
                Xrm.Navigation.openForm(entityFormOptions);
            })
            .catch(function f(error) {
                debugger;
                Xrm.Utility.closeProgressIndicator();
                Xrm.Utility.alertDialog(error.message);
            });
    };

    var createEmailRequest = function(incidentId, emailTemplate) {
        var activityParties = [];
        activityParties.push({
            participationtypemask : participationTypeMasks.From,
            "partyid_queue@odata.bind" : "/queues("+ queueId+ ")"
        });
        //setup 2 send-to addresses
        activityParties.push({
            participationtypemask : participationTypeMasks.To,
            "partyid_account@odata.bind" : "/accounts(" + accountIdTo1 + ")"
        });
        activityParties.push({
            participationtypemask : participationTypeMasks.To,
            "partyid_account@odata.bind" : "/accounts(" + accountIdTo2 + ")"
        });
        
        //examples of using contacts        
        // activityParties.push({
        //     participationtypemask : participationTypeMasks.To,
        //      "partyid_contact@odata.bind" : "/contacts(00000000-0000-0000-0000-000000000000)"
        //  });
         
        //examples of using the current user as the from address
        //  var currentUserId = Xrm.Page.context.getUserId().replace("}", "").replace("{", "");
        //  activityParties.push({
        //     participationtypemask : participationTypeMasks.From,
        //      "partyid_systemuser@odata.bind" : "/systemusers("+currentUserId+")"
        //  });
        
        var email = {
            subject: emailTemplate.subject,
            description: emailTemplate.description,
            email_activity_parties: activityParties,
            "regardingobjectid_incident@odata.bind" : "/incidents(" + incidentId + ")"
        };

        return email;
    }

    var createEmail = function (emailRequest) {
        return new Promise(function (resolve, reject) {
            Xrm.WebApi.online.createRecord("email", emailRequest).then(function success(result) {
                resolve(result);
            })
            .fail(function failure(result) {
                reject(result);
            });
        });
    }

    var instantiateEmailTemplate = function(templateId, objectType, objectId) {
        var instantiateTemplateRequest = {
            TemplateId: templateId,
            ObjectType: objectType,
            ObjectId: objectId,

            getMetadata: function () {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        "TemplateId": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "ObjectType": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        },
                        "ObjectId": {
                            "typeName": "Edm.String",
                            "structuralProperty": 1
                        }
                    },
                    operationType: 0,
                    operationName: "InstantiateTemplate"
                };
            }
        };

        return new Promise(function (resolve, reject) {
            Xrm.WebApi.online.execute(instantiateTemplateRequest).then(function success(result) {
                    if (result.ok) {
                        var results = JSON.parse(result.responseText);
                        var emailTemplate = results.value[0];
                        resolve(emailTemplate);
                    }
                })
                .fail(function failure(result) {
                    reject(result);
                }); //needed otherwise it doesnt bubble it up
        });

    };

    var participationTypeMasks = {
        From: 1,
        To: 2,
        Cc: 3,
        Bcc: 4,
        Regarding: 8,
        Owner: 9,
        Customer: 11
    };

}).call(ai.EmailApi);

//example of how to call it
//var templateId = "00000000-0000-0000-0000-000000000000";
//var incidentId = "00000000-0000-0000-0000-000000000000";
//ai.EmailApi.createEmailMain(templateId,"incident",incidentId);

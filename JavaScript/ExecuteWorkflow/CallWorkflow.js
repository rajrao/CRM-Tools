"use strict";

var ai = window.ai || {};
ai.WebAPI = ai.WebAPI || {};

(function() {
  /** @description Execute a workflow on a given entity
   * @param {string} workflowId The id of the workflow to run.
   * @param {string} entityId the id of the entity on which to run the workflow.
   */
  this.executeWorkflow = function(workflowId, entityId) {
    /// <summary>Execute a workflow</summary>
    /// <param name="workflowId" type="String">.</param>
    /// <param name="entityId" type="String">.</param>
    if (!isString(workflowId)) {
      throw new Error(
        "ai.WebAPI.executeWorkflow workflowId parameter must be a string."
      );
    }
    if (!isString(entityId)) {
      throw new Error(
        "ai.WebAPI.executeWorkflow entityId parameter must be a string."
      );
    }

    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      var query =
        "workflows(" +
        workflowId.replace("}", "").replace("{", "") +
        ")/Microsoft.Dynamics.CRM.ExecuteWorkflow";
      req.open("POST", encodeURI(getWebAPIPath() + query), true);
      req.setRequestHeader("Accept", "application/json");
      req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      req.setRequestHeader("OData-MaxVersion", "4.0");
      req.setRequestHeader("OData-Version", "4.0");

      req.onreadystatechange = function() {
        if (this.readyState == 4 /* complete */) {
          req.onreadystatechange = null;
          if (this.status == 200 || this.status == 204) {
            resolve(req.response);
          } else {
            reject(ai.WebAPI.errorHandler(req.response));
          }
        }
      };
      entityId = entityId.replace("}", "").replace("{", "");
      var data = {
        EntityId: entityId
      };

      req.send(JSON.stringify(data));
    });
  };

  //Internal supporting functions
  function getClientUrl() {
    //Get the organization URL
    if (
      typeof GetGlobalContext == "function" &&
      typeof GetGlobalContext().getClientUrl == "function"
    ) {
      return GetGlobalContext().getClientUrl();
    } else {
      //If GetGlobalContext is not defined check for Xrm.Page.context;
      if (
        typeof Xrm != "undefined" &&
        typeof Xrm.Page != "undefined" &&
        typeof Xrm.Page.context != "undefined" &&
        typeof Xrm.Page.context.getClientUrl == "function"
      ) {
        try {
          return Xrm.Page.context.getClientUrl();
        } catch (e) {
          throw new Error("Xrm.Page.context.getClientUrl is not available.");
        }
      } else {
        throw new Error("Context is not available.");
      }
    }
  }

  function getWebAPIPath() {
    return getClientUrl() + "/api/data/v9.0/";
  }

  //Internal validation functions
  function isString(obj) {
    if (typeof obj === "string") {
      return true;
    }
    return false;
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

  function isFunction(obj) {
    if (typeof obj === "function") {
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

  function isFunctionOrNull(obj) {
    if (isNull(obj)) {
      return true;
    }
    if (isFunction(obj)) {
      return true;
    }
    return false;
  }

  // This function is called when an error callback parses the JSON response.
  // It is a public function because the error callback occurs in the onreadystatechange
  // event handler and an internal function wouldn’t be in scope.
  this.errorHandler = function(resp) {
    try {
      return JSON.parse(resp).error;
    } catch (e) {
      return new Error("Unexpected Error");
    }
  };

  this.showErrorMessage = function(error) {
    console.log(error.message);
    var alertStrings = {
      text: "Error: " + error.message
    };
    var alertOptions = {
      height: 200,
      width: 450
    };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
  };
}.call(ai.WebAPI));

//This is the function you would call from the ribbon or from the form event
function ExecuteWorkflow(executionContext) {
  debugger;
  var formContext = executionContext.getFormContext();
  //guid of the workflow you wish to run
  var workflowId = "00000000-0000-0000-0000-000000000000";
  var entityId = formContext.data.entity.getId();

  ai.WebAPI.executeWorkflow(workflowId, entityId)
    .then(function() {
      //lets reload the form
      var entityFormOptions = {};
      entityFormOptions["entityName"] = "entityName"; //name of the entity to open eg: account
      entityFormOptions["entityId"] = entityId;
      Xrm.Navigation.openForm(entityFormOptions);
    })
    .catch(function(error) {
      ai.WebAPI.showErrorMessage(error);
    });
}

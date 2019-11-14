**Sample 1**

    var parameters = {};
    parameters.EntityName = "account";

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/RetrieveEntityChanges()", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function() {
       if (this.readyState === 4) {
           req.onreadystatechange = null;
           if (this.status === 200) {
               var results = JSON.parse(this.response);
           } else {
               Xrm.Utility.alertDialog(this.statusText);
           }
       }
    };
    req.send(JSON.stringify(parameters));
 
 **Sample 2**
 
    https://[yourOrganizationName].crm.dynamics.com/api/data/v8.2/accounts
    Prefer: odata.track-changes

    https:/[yourOrganizationName].crm.dynamics.com/api/data/v8.2/accounts?$deltatoken=<token>

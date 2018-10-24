var loadData = function (incidentId, consolidatedData) {
        var promise = Xrm.WebApi.online.retrieveRecord("incident",
                incidentId,
                "?$select=_customerid_value")
            .then(function (result) {
                consolidatedData.incidentData = result;
                var theaterId = result["_customerid_value"];
                return Xrm.WebApi.online.retrieveRecord("account", theaterId, "?$select=name");
            })
            .then(function (result) {
                consolidatedData.accountData = result;
                var assetId = consolidatedData.incidentData["msdyn_customerassetid"];
                return Xrm.WebApi.online.retrieveRecord("msdyn_customerasset", assetId, "?$select=msdyn_name&$expand=msdyn_product($select=name)");
            })
            .then(function (result) {
                consolidatedData.assetData = result;
                return consolidatedData;
            })
            .fail(function (error) {
                var message = {
                    text: error.message
                };
                var alertOptions = {
                    height: 350,
                    width: 480
                };
                Xrm.Navigation.openAlertDialog(message, alertOptions);
            });
        return promise;
}

///calling it:
var consolidatedData = {};

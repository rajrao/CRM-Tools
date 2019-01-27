//https://docs.microsoft.com/en-us/dynamics365/customer-engagement/web-api/organization?view=dynamics-ce-odata-9
//shows how to set enableunifiedinterfaceshellrefresh value as an example of the organization value.
var entity = {};
entity.enableunifiedinterfaceshellrefresh = true;

Xrm.WebApi.online.retrieveMultipleRecords("organization", null).then(
    function success(results) {
        var organizationid = results.entities[0].organizationid;
		//console.log(JSON.stringify(results.entities[0]));
		console.log(results.entities[0].enableunifiedinterfaceshellrefresh);
		if (results.entities[0].enableunifiedinterfaceshellrefresh == false)
		{
			console.log("updating organization " + organizationid);
                        //console.log(`updating organization ${organizationid}`); //interpolation - does not work in ie11
			Xrm.WebApi.online.updateRecord("organization", organizationid, entity).then(
				function success(result) {
					console.log("successfully updated organization " + organizationid);
					var updatedEntityId = result.id;
				},
				function(error) {
					Xrm.Utility.alertDialog(error.message);
				}
			);
		}
		else
		{
			console.log("organization enableunifiedinterfaceshellrefresh is already set " + results.entities[0].enableunifiedinterfaceshellrefresh);
		}
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);

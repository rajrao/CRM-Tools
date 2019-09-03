//demonstrates sample for using fetchXml to get data about an account.

var fetchXml = "<fetch top='1'><entity name='account'><attribute name='name'/><filter><condition attribute='accountid' operator='eq' value='67A690AE-39B5-E911-A95E-000D3A3B9825'/></filter><link-entity name='territory' from='territoryid' to='territoryid' link-type='outer'><attribute name='parentterritoryid'/><attribute name='ncm_typecode'/><attribute name='parentterritoryidname'/><attribute name='ncm_typecodename'/><attribute name='name'/></link-entity></entity></fetch>";
var encodedFetchXml = encodeURIComponent(fetchXml);

Xrm.WebApi
	.retrieveMultipleRecords('account','fetchXml='+encodedFetchXml)
	.then(function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
            console.log(result.entities[i]);
        }
    },
    function (error) {
        console.log(error.message);
    }
);

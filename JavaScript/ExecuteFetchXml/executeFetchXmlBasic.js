//demonstrates sample for using fetchXml to get data about an account.
//this sample uses Xrm.WebApi.retrieveMultipleRecords (good), but has an issue with the length of the url.
//if you are going to use a long fetchXml, please look at the code for 
//https://github.com/rajrao/CRM-Tools/blob/master/JavaScript/ExecuteFetchXml/executefetchxmlUsingPost.js
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

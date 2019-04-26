//this sample shows you how to execute fetchxml.
//it uses a post instead of get, so it doesnt suffer from the URL size limitations and one
//doesnt have to uri-encode the fetchxml.
//the sample is for accounts
//the sample uses promises
//this code has been tested with Dynamics v9.2 and in Chrome and IE11


function executeFetchXml(entityPluralName, fetchXml) {
	var promise = new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();
			req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/$batch", true);
			req.setRequestHeader("OData-MaxVersion", "4.0");
			req.setRequestHeader("OData-Version", "4.0");
			req.setRequestHeader("Accept", "application/json");
			req.setRequestHeader("Content-Type", "multipart/mixed;boundary=batch_thisismyboundary");
			req.onreadystatechange = function () {
				if (this.readyState === 4) {
					req.onreadystatechange = null;
					if (this.status == 200 || this.status == 204) {
						var response = JSON.parse(this.response.substring(this.response.indexOf('{'), this.response.lastIndexOf('}') + 1));
						resolve(response.value);
					} else {
						reject(req.response);
					}
				}
			};

			var body = '--batch_thisismyboundary\n'
				body += 'Content-Type: application/http\n'
				body += 'Content-Transfer-Encoding: binary\n'
				body += '\n'
				body += 'GET ' + Xrm.Page.context.getClientUrl() + '/api/data/v9.1/' + entityPluralName + '?fetchXml=' + fetchXml + ' HTTP/1.1\n'
				body += 'Content-Type: application/json\n'
				body += 'OData-Version: 4.0\n'
				body += 'OData-MaxVersion: 4.0\n'
				body += '\n'
				body += '--batch_thisismyboundary--'

				req.send(body);
		});
	return promise;
}

//////////////
//example of how to Call executeFetchXml
var fetchXml = '<fetch><entity name="account"><attribute name="accountid"/><attribute name="name"/><filter><condition attribute="accountid" operator="in"><value>79A6FC2D-0C44-E911-A957-000D3A3B9825</value><value>89A6FC2D-0C44-E911-A957-000D3A3B9825</value></condition></filter></entity></fetch>';
executeFetchXml('accounts',fetchXml)
.then(function (responseData) {
	console.log("then!");
	console.log(responseData[0].accountid);
})
.catch(function (error) {
	console.log("error!");
	console.log(error);
});

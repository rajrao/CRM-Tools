var parameters = {};
parameters.Line1 = "";
parameters.City = "Centennial";
parameters.StateOrProvince = "CO";
parameters.PostalCode = "80112";
parameters.Country = "";

var msdyn_GeocodeAddressRequest = {
    Line1: parameters.Line1,
    City: parameters.City,
    StateOrProvince: parameters.StateOrProvince,
    PostalCode: parameters.PostalCode,
    Country: parameters.Country,

    getMetadata: function() {
        return {
            boundParameter: null,
            parameterTypes: {
                "Line1": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                },
                "City": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                },
                "StateOrProvince": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                },
                "PostalCode": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                },
                "Country": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                }
            },
            operationType: 0,
            operationName: "msdyn_GeocodeAddress"
        };
    }
};

Xrm.WebApi.online.execute(msdyn_GeocodeAddressRequest).then(
    function success(result) {
        if (result.ok) {
            var results = JSON.parse(result.responseText);
        }
    },
    function(error) {
        Xrm.Utility.alertDialog(error.message);
    }
);

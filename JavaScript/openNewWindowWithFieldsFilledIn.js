//see: https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/set-field-values-using-parameters-passed-form#example-use-xrmnavigationopenform-to-open-a-new-window
//and: https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openform
function OpenNewForm(ribbonExecutionContext)
{
	debugger;
	console.log("OpenNewForm called");
	var form = ribbonExecutionContext;
	var entityFormOptions = {};
	entityFormOptions["entityName"] = "myEntityName";

	var formParameters = {};
	var entityRef = form.getAttribute("accountid").getValue();
	if (entityRef !== null && entityRef.length > 0)
	{
    entityRef = entityRef[0];
		formParameters["accountid"] = entityRef.id.replace('{','').replace('}',''); //UCI works fine without the replace, but legacy form doesnt
    formParameters["entityRef"] = entityRef.name;
    //formParameters["ncm_opportunityidtype"] = entityRef.entityType; //legacy doesnt like this, but UCI doesnt mind it
		// Open the form.
		Xrm.Navigation.openForm(entityFormOptions, formParameters).then(
			function (success) {
				console.log(success);
			},
			function (error) {
				console.log(error);
			});
	}
}

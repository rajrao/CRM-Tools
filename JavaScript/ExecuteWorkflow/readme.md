Javascript code to call a workflow in Dynamics CRM.

This code uses the XRM webapi and does not hit the older WCF endpoints (which is what a lot of examples on the internet show).

Steps to use it:
1. Add the javascript as a web-resource to your Dynamics CRM instance.
2. Reference the javascript either in your form or your ribbon.
3. Figure out your workflow id (name based code coming soon). 
4. Use the following code to call your workflow:

```
  function ExecuteWorkflow(executionContext) {
    var formContext = executionContext.getFormContext();
    //guid of the workflow you wish to run
    var workflowId = "00000000-0000-0000-0000-000000000000";
    var entityId = formContext.data.entity.getId();

    ai.WebAPI.executeWorkflow(workflowId, entityId)
        .then(() => {
            //here is where you can react to the successful completion.
            //lets reload the form
            var entityFormOptions = {};
            entityFormOptions["entityName"] = "entityName";//name of the entity to open eg: account
            entityFormOptions["entityId"] = entityId;
            Xrm.Navigation.openForm(entityFormOptions);
        }).catch((error) => {
            ai.WebAPI.showErrorMessage(error)
        });
  }
```

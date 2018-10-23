fakeExecutionContext = {
     getFormContext: function(){return Xrm.Page;},
     context: Xrm.Page.context
}

//to use the fake context:
//myTestDynamicsFunction(fakeExecutionContext);

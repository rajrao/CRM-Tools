//shows how to get formContext reliably

function getFormContext(executionContext) {
     var formContext = null;
     if (executionContext !== null) {
         if (typeof executionContext.getAttribute === 'function') {
             formContext = executionContext; //most likely called from the ribbon.
         } else if (typeof executionContext.getFormContext === 'function' 
                 && typeof(executionContext.getFormContext()).getAttribute === 'function') {
            formContext = executionContext.getFormContext(); // most likely called from the form via a handler
         } else {
            throw 'formContext was not found'; //you could do formContext = Xrm.Page; if you like.
        }
    }
    return formContext;
}

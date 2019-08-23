//if eventContext is not available, use: Xrm.Page for getFormContext and Xrm.Page.context for context
var entity = eventContext.getFormContext().data.entity;
//if context is sent from Ribbon, then the formContext is the eventContext passed to the function. This is different from the eventContext 
//that is sent from a formEvent.

entity.getAttribute(“customerid”).fireOnChange();

//get data about a lookup:
//entity.attributes.get("customerid").getAttributeType(); //returns "lookup";
var attributeLookup = entity.attributes.get("customerid").getValue()[0];
//attributeLookup return an object of type{entityType: "name", id: "{GUID}", name: "string"};
var id = attributeLookup.id;
var type = attributeLookup.entityType;
var name = attributeLookup.name;


//set a lookup:
entity.attributes.get("customerid").setValue(
    [{
        id: "{508F1F1D-2957-E911-A955-000D3A3B9316}",
        name:"A new account by raj12",
        entityType: "account"
      }]);


//get the control:
eventContext.getFormContext().ui.controls.get("customerid");
//disable and visibility done on control:
eventContext.getFormContext().ui.controls.get("customerid").setDisabled(true);//disables the control
eventContext.getFormContext().ui.controls.get("customerid").setVisible(false);//hides the control
//alternative way to get attribute, when you have control: 
eventContext.getFormContext().ui.controls.get("customerid").getAttribute()


//get an optionset:
//entity.attributes.get("customerid").getAttributeType(); //returns optionset;
entity.attributes.get("optionset_attributefield").getValue();    //returns the int code value
entity.attributes.get("optionset_attributefield").getText();     //return the text displayed to the user.

//set an optionset
entity.attributes.get("optionset_attributefield").setValue(1000000);    //where 1000000 is a valid optionset value

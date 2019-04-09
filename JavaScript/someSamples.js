var entity = eventContext.getFormContext().data.entity;

//get data about a lookup:
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

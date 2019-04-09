var entity = eventContext.getFormContext().data.entity;
var attributeLookup = entity.attributes.get("customerid").getValue()[0];
//attributeLookup return an object of type{entityType: "name", id: "{GUID}", name: "string"};
var id = attributeLookup.id;
var type = attributeLookup.entityType;
var name = attributeLookup.name;

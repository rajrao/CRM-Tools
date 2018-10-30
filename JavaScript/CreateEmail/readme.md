**This shows an example of how to use WebApi to create an email**

It uses the Xrm.WebApi library to perform the various operations (https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/xrm-webapi)

The basic code flow is:

1. First uses an email template to generate the email contents
2. Uses the email contents generated from the template to generate an email record associated to current case
3. finally loads up the email, for the user to edit and click send

This example is based on javascript that would run from a Case/incident. It should be simple to convert to to be more generic. Also, instead of just opening the email, if you wanted you could also code it up to send the email.

*Some notable points: *

1. The code shows you how to generate an email from an email template (instatiating an email template). It does this via the use of actions (instantiateEmailTemplate)
2. The code shows you how to setup the to and from and also shows you how you can setup multiple to addresses. (createEmailRequest and createEmail)

*Something else to note:*

1. In this code that I wrote, it creates the email and then navigates the user to that email. One problem with this approach is that the email has already been created and if the user decides to not send the email, they have to delete it, else it will get left behind in a draft state. (This is an even bigger problem, if you dont allow users to delete emails).
2. The reason I went down this approach was because, if you try and use Xrm.Navigation.openForm, relies on passing details via the URL and if you had a long email, it might not work in some browsers (2000 is the limit for IE11). Also, you dont want to pass important details in the URL.
3. So, if I had to do this again, what I would look at doing is to pass the important details (ids) to openForm as query parameters. I would then write the javascript in the email form and do most of the work out on the email form side of things. If I had done it this way, the users would still be able to just close the email without saving it.


Here is the basic code needed to open an email form with some information prefilled:
    var entityFormOptions = {
    	entityName: "email"
    };

    var emailFormParams = {
    	subject: "subject",
    	description: "<font class=keyboardFocusClass style='display:inline;font-size:16px;' face=Calibri><p1>html here</p1></font>",
    	//set the regarding - needed for description to be html
    	pId: "{E8C656B7-6AD1-E811-A967-000D3A30D5DB}",
    	pType: 112 //objectTypeCode for the party
    };
    Xrm.Navigation.openForm(entityFormOptions, emailFormParams);

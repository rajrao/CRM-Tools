**This shows an example of how to use WebApi to create an email**

It uses the Xrm.WebApi library to perform the various operations (https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/xrm-webapi)

The basic code flow is:

1. First uses an email template to generate the email contents
2. Uses the email contents generated from the template to generate an email record associated to current case
3. finally loads up the email, for the user to edit and click send

This example is based on javascript that would run from a Case/incident. It should be simple to convert to to be more generic. Also, instead of just opening the email, if you wanted you could also code it up to send the email.

Some notable points: 

1. The code shows you how to generate an email from an email template (instatiating an email template). It does this via the use of actions (instantiateEmailTemplate)
2. The code shows you how to setup the to and from and also shows you how you can setup multiple to addresses. (createEmailRequest and createEmail)

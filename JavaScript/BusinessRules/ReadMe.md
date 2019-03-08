This folder contains examples of the javascript that the Dynamics Business Rule UI editor generates. I found this javascript to be instructive as it shows how Microsoft likes to write their javascript.

There are 2 examples in here:
1. A simple business rule: [SampleGeneratedJavascript.js](https://github.com/rajrao/CRM-Tools/blob/master/JavaScript/BusinessRules/SampleGeneratedJavascript.js)
2. A complex business rule: [Complex Business Rule.js](https://github.com/rajrao/CRM-Tools/blob/master/JavaScript/BusinessRules/Complex%20Business%20Rule.js). Here is what the complex business rule looks like:
[![alt text](https://github.com/rajrao/CRM-Tools/blob/master/JavaScript/BusinessRules/New%20business%20rule.png "Complex Business Rule")](https://raw.githubusercontent.com/rajrao/CRM-Tools/master/JavaScript/BusinessRules/New%20business%20rule.png)

Finally, to see how the business rule gets incorporated into the form, see [BusinessRuleJavascriptIncorporationIntoAForm.js](https://github.com/rajrao/CRM-Tools/blob/master/JavaScript/BusinessRules/BusinessRuleJavascriptIncorporationIntoAForm.js)

**Troubleshooting**
1. All of the fields referenced by a business rule must exist on the form. If even one of them is removed, then the business rule will short-circuit and exit without doing anything. A good practice on your forms is to add the fields referenced by the business rule attached to a form, to the non-event dependencies list. This way, someone would at least be warned before removing a field from the form.
2. At this point there is a limit of 10 conditions in a single business rule.
3. Business rules are injected into the webpage with a prefix of "pbl_". One of the easiest ways to figure out what is going on is to search for functions with the name pbl_ and put breakpoints in them and figure out whats going on.

const formJson = {
    "jcr:created": "Mon Oct 07 2024 10:32:55 GMT+0000",
    "jcr:createdBy": "kmrobin@adobe.com",
    "jcr:primaryType": "cq:Page",
    "jcr:content": {
        "jcr:created": "Mon Oct 07 2024 10:32:55 GMT+0000",
        "jcr:createdBy": "kmrobin@adobe.com",
        "sling:configRef": "/conf/forms/user01/",
        "sling:resourceType": "aem-trials/components/adaptiveForm/page",
        "jcr:title": "user01",
        "cq:deviceGroups": [
            "/etc/mobile/groups/responsive"
        ],
        "cq:lastModified": "Mon Oct 07 2024 13:55:17 GMT+0000",
        "cq:lastModifiedBy": "kmrobin@adobe.com",
        "jcr:primaryType": "cq:PageContent",
        "cq:template": "/conf/aem-trials/settings/wcm/templates/blank-af-v2",
        "jcr:language": "en",
        "guideContainer": {
            "dorType": "none",
            "sling:resourceType": "aem-trials/components/adaptiveForm/formcontainer",
            "fd:version": "2.1",
            "title": "user01",
            "themeRef": "/apps/fd/af/themes/aemformsdemo-wknd",
            "jcr:primaryType": "nt:unstructured",
            "thankYouOption": "page",
            "fieldType": "form",
            "textinput": {
                "jcr:created": "Mon Oct 07 2024 10:38:48 GMT+0000",
                "jcr:lastModifiedBy": "kmrobin@adobe.com",
                "mandatoryMessage": "First name is required",
                "visible": true,
                "jcr:createdBy": "kmrobin@adobe.com",
                "textIsRich": [
                    "true",
                    "true",
                    "true"
                ],
                "sling:resourceType": "aem-trials/components/adaptiveForm/textinput",
                "jcr:title": "First Name",
                "readOnly": false,
                "enabled": true,
                "required": "true",
                "hideTitle": "false",
                "jcr:lastModified": "Mon Oct 07 2024 10:39:29 GMT+0000",
                "name": "txtFirstName",
                "jcr:primaryType": "nt:unstructured",
                "unboundFormElement": false,
                "fieldType": "text-input"
            },
            "textinput_548878374": {
                "textIsRich": [
                    "true",
                    "true",
                    "true"
                ],
                "pattern": "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
                "sling:resourceType": "aem-trials/components/adaptiveForm/textinput",
                "jcr:title": "Email",
                "enabled": true,
                "required": "true",
                "unboundFormElement": false,
                "jcr:created": "Mon Oct 07 2024 10:39:41 GMT+0000",
                "jcr:lastModifiedBy": "kmrobin@adobe.com",
                "mandatoryMessage": "email is req",
                "visible": true,
                "jcr:createdBy": "kmrobin@adobe.com",
                "readOnly": false,
                "validationPatternType": "custom",
                "hideTitle": "false",
                "jcr:lastModified": "Mon Oct 07 2024 11:00:31 GMT+0000",
                "name": "txtEmail",
                "jcr:primaryType": "nt:unstructured",
                "fieldType": "text-input",
                "validatePictureClauseMessage": "wrong email"
            },
            "radiobutton": {
                "textIsRich": [
                    "true",
                    "true",
                    "true",
                    "true",
                    "true"
                ],
                "sling:resourceType": "aem-trials/components/adaptiveForm/radiobutton",
                "jcr:title": "Radio Button",
                "type": "string",
                "enabled": true,
                "unboundFormElement": false,
                "orientation": "vertical",
                "jcr:created": "Mon Oct 07 2024 10:42:03 GMT+0000",
                "jcr:lastModifiedBy": "kmrobin@adobe.com",
                "visible": true,
                "jcr:createdBy": "kmrobin@adobe.com",
                "readOnly": false,
                "enum": [
                    "0",
                    "1"
                ],
                "enumNames": [
                    "20-30 years",
                    "31 - 50 years"
                ],
                "hideTitle": "false",
                "jcr:lastModified": "Mon Oct 07 2024 10:43:39 GMT+0000",
                "name": "radiobutton1728297723843",
                "jcr:primaryType": "nt:unstructured",
                "fieldType": "radio-group"
            },
            "button": {
                "jcr:created": "Mon Oct 07 2024 10:44:18 GMT+0000",
                "jcr:lastModifiedBy": "kmrobin@adobe.com",
                "visible": true,
                "jcr:createdBy": "kmrobin@adobe.com",
                "textIsRich": [
                    "true",
                    "true",
                    "true"
                ],
                "sling:resourceType": "aem-trials/components/adaptiveForm/button",
                "jcr:title": "Submit",
                "enabled": true,
                "jcr:lastModified": "Mon Oct 07 2024 10:44:36 GMT+0000",
                "name": "btnName",
                "jcr:primaryType": "nt:unstructured",
                "unboundFormElement": false,
                "fieldType": "button"
            }
        }
    }
};

// Function to render the form dynamically
function renderForm(json) {
    // Get the guideContainer object which holds all form fields
    const fields = json.jcr:content.guideContainer;

    // Create a form element
    const form = document.createElement("form");

    // Iterate over each field in guideContainer
    for (const key in fields) {
        const field = fields[key];

        // Create an element based on the resource type
        if (field['sling:resourceType'] === 'aem-trials/components/adaptiveForm/textinput') {
            // Create a text input field
            const input = document.createElement("input");
            input.type = "text";
            input.name = field.name;
            input.placeholder = field["jcr:title"];
            if (field.required === "true") {
                input.required = true;
                input.setAttribute("aria-required", "true");
                input.title = field.mandatoryMessage;
            }
            if (field.pattern) {
                input.pattern = field.pattern;
                input.title = field.validatePictureClauseMessage || "Invalid format";
            }
            form.appendChild(input);
        } else if (field['sling:resourceType'] === 'aem-trials/components/adaptiveForm/radiobutton') {
            // Create a label for the radio button group
            const label = document.createElement("label");
            label.textContent = field["jcr:title"];
            form.appendChild(label);

            // Create radio buttons for each enum value
            field.enum.forEach((value, index) => {
                const radioInput = document.createElement("input");
                radioInput.type = "radio";
                radioInput.name = field.name;
                radioInput.value = value;
                radioInput.id = `${field.name}_${value}`;
                form.appendChild(radioInput);

                // Create a label for each radio button
                const radioLabel = document.createElement("label");
                radioLabel.htmlFor = `${field.name}_${value}`;
                radioLabel.textContent = field.enumNames[index];
                form.appendChild(radioLabel);
            });
        } else if (field['sling:resourceType'] === 'aem-trials/components/adaptiveForm/button') {
            // Create a submit button
            const button = document.createElement("button");
            button.type = "submit";
            button.textContent = field["jcr:title"];
            form.appendChild(button);
        }
    }

    // Append the form to the body or desired container
    document.body.appendChild(form);
}

// Call the function to render the form based on the JSON
renderForm(formJson);

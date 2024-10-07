const formJson = {
    "jcr:content": {
        "guideContainer": {
            "textinput": {
                "mandatoryMessage": "First name is required",
                "sling:resourceType": "aem-trials/components/adaptiveForm/textinput",
                "jcr:title": "First Name",
                "required": "true",
                "name": "txtFirstName",
                "fieldType": "text-input"
            },
            "textinput_548878374": {
                "pattern": "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
                "sling:resourceType": "aem-trials/components/adaptiveForm/textinput",
                "jcr:title": "Email",
                "required": "true",
                "mandatoryMessage": "Email is required",
                "name": "txtEmail",
                "fieldType": "text-input"
            },
            "radiobutton": {
                "sling:resourceType": "aem-trials/components/adaptiveForm/radiobutton",
                "jcr:title": "Age Group",
                "enum": ["0", "1"],
                "enumNames": ["20-30 years", "31-50 years"],
                "name": "ageGroup",
                "fieldType": "radio-group"
            },
            "button": {
                "sling:resourceType": "aem-trials/components/adaptiveForm/button",
                "jcr:title": "Submit",
                "name": "btnSubmit",
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

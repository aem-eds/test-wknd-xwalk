// Sample JSON data (use your data if different)
async function generateForm(fieldDiv, containerId, formPath) {
  const formurl = `https://author-p51327-e1446332.adobeaemcloud.com${formPath}.-1.json`;
  const response = await fetch(formurl);
    if (response.ok) {
    
      const jsonData = await response.json();
  
      const container = document.createElement('form'); // Create a form element
      fieldDiv.appendChild(container);
      container.id = "dynamicForm"; // Set the form's ID
    
        // Get the guideContainer elements from the JSON structure
        const elements = jsonData["jcr:content"]["guideContainer"];
        for (const key in elements) {
            const element = elements[key];
            const resourceType = element["sling:resourceType"];
    
            // Create elements based on their resource type
            if (resourceType === "aem-trials/components/adaptiveForm/textinput") {
                const label = document.createElement('label');
                label.textContent = element["jcr:title"] + (element["required"] === "true" ? " *" : "");
                label.setAttribute("for", element.name);
    
                const input = document.createElement('input');
                input.type = "text";
                input.name = element.name;
                input.required = element["required"] === "true";
                if (element.pattern) input.pattern = element.pattern;
                input.placeholder = element["jcr:title"];
    
                container.appendChild(label);
                container.appendChild(input);
                //container.appendChild(document.createElement('br'));
    
            } else if (resourceType === "aem-trials/components/adaptiveForm/radiobutton") {
                const wrapper = document.createElement('div');
                wrapper.className = "radio-group";
    
                const groupLabel = document.createElement('label');
                groupLabel.textContent = element["jcr:title"];
                container.appendChild(groupLabel);
    
                element["enum"].forEach((value, index) => {
                    const radioWrapper = document.createElement('div');
                    radioWrapper.className = "radio-item";
    
                    const radio = document.createElement('input');
                    radio.type = "radio";
                    radio.name = element.name;
                    radio.value = value;
                    radio.id = `${element.name}_${value}`;
    
                    const radioLabel = document.createElement('label');
                    radioLabel.textContent = element["enumNames"][index];
                    radioLabel.setAttribute("for", radio.id);
    
                    radioWrapper.appendChild(radio); // Add radio button
                    radioWrapper.appendChild(radioLabel); // Add its corresponding label
                    wrapper.appendChild(radioWrapper); // Append the radioWrapper to the main group wrapper
                });
    
                container.appendChild(wrapper);
    
            } else if (resourceType === "aem-trials/components/adaptiveForm/button") {
                const button = document.createElement('button');
                button.type = "submit";
                button.name = element.name;
                button.textContent = element["jcr:title"];
    
                // Attach a form submit event to show a thank-you alert
                container.addEventListener("submit", function (event) {
                    event.preventDefault(); // Prevent actual form submission
                    alert("Thank you for showing interest!");
                    container.reset();
                });
    
                container.appendChild(button);
            }
        }
        /*
        // Select the specific container where the form should be rendered
        const targetContainer = document.getElementsByTagName("main")[0].getElementsByClassName("section")[0];
        if (targetContainer) {
            targetContainer.appendChild(container); // Place the form inside the specified container
        } else {
            console.warn(`Container with ID "${containerId}" not found. Appending form to the body.`);
            document.body.appendChild(container); // Fallback: Append to the body if no container is found
        }
        */
    }
}

export default function decorate(fieldDiv) {
     const anchor = fieldDiv.querySelector('a');
     const anchorInnerHTML = anchor.innerHTML;     
     
     if(anchorInnerHTML && anchorInnerHTML.startsWith("/content/forms/af/")){
       generateForm(fieldDiv, 'formContainer', anchorInnerHTML.replace('.-1.json', '')); // Replace 'formContainer' with your target container ID 
     }
     if (anchor) {
        anchor.style.display = 'none';
     }
    //fieldDiv.appendChild(outerdiv);
}
     


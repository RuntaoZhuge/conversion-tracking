var forms = document.querySelectorAll('.fui-form');

    Array.prototype.forEach.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            // Initialize an object to store the form data
            var formData = {};

            // Loop through the form elements to collect their data
for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];

    // Ensure the element has a name attribute
    if (!element.name) continue;

    // Handle checkboxes
    if (element.type === 'checkbox') {
        // Initialize the formData array for the checkbox name if it doesn't exist
        if (!formData[element.name]) {
            formData[element.name] = [];
        }
        // If the checkbox is checked, add its value to the array
        if (element.checked) {
            formData[element.name].push(element.value);
        }
    } else if (element.type !== 'submit') {
        // For all other non-submit inputs, directly assign the value
        formData[element.name] = element.value;
    }
}

            // Serialize formData to a JSON string
            var formDataString = JSON.stringify(formData);

            // Store serialized formData in sessionStorage
            sessionStorage.setItem('formData', formDataString);

            // Indicate form submission
            sessionStorage.setItem('formSubmitted', 'true');
        });
    });
  if (window.location.href === 'https://adlsupportservices.com.au/thanks') {
        // Check if the form was submitted based on the sessionStorage flag
        if (sessionStorage.getItem('formSubmitted') === 'true') {
            // Retrieve and deserialize formData from sessionStorage
            var formDataString = sessionStorage.getItem('formData');
            var formData = JSON.parse(formDataString);

            // Prepare dynamic event name based on formData's 'handle'
            var eventName = formData.handle ? formData.handle : 'formSubmissionSuccess';

            // Push the formData to the dataLayer
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': eventName,
                'formData': formData
            });
          
          console.log(formData);

            // Clear sessionStorage items to prevent re-pushing if the page is reloaded
            sessionStorage.removeItem('formSubmitted');
            sessionStorage.removeItem('formData');
        }
    }

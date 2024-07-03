// Function to validate email
function isValidEmail(email) {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    var formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    // Validate form fields
    if (!formData.name || !formData.email || !isValidEmail(formData.email) || !formData.message) {
        alert('Please fill out all fields correctly');
        return;
    }

    // Send form data to Google Sheets
    var scriptURL = 'https://script.google.com/macros/s/AKfycby5RzPrRGxU5bBsrQ1Yn-bR-7JP3d6EAJjQNSDO5Hem-0pM3EbFHBjJlS3l2kzZHF-X/exec'; // Replace with your Google Apps Script URL
    var data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    fetch(scriptURL, { method: 'POST', body: data })
        .then(response => {
            console.log('Success!', response);
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Failed to send message. Please try again later.');
        });

    // Optional: Send email notification using EmailJS or another service
    // Replace this with your email sending code if needed
}

// Attach event listener to the form for submission
document.getElementById('contactForm').addEventListener('submit', handleSubmit);

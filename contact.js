document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        alert("All fields must be filled out.");
        return; 
    }

    
    if (/\d/.test(name)) {
        alert("Your name cannot contain numbers.");
        return; 
    }

    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    };


    console.log(formData);


    alert("Thank you, " + formData.name + "! Your message has been sent.");
    
    document.getElementById('contact-form').reset();
});
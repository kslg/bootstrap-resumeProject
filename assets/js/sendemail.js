function sendMail(contactForm) {
    emailjs.send("service_rm8rf4s", "template_uxg3gw8", {
        // name values need to be the same as the name values that we gave this field in our contact.html form.
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.projectsummary.value
    })
    // Error handling
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        }
    );
    return false;  // To block from loading a new page
}
// contact-validation.js
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    event.preventDefault();
    alert("All fields are required.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    event.preventDefault();
    alert("Enter a valid email address.");
    return;
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    }, (error) => {
      alert("Failed to send message: " + error.text);
    });
});

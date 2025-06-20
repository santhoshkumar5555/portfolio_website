// typing.js
const text = "Marketing Graduate | SEO Specialist | Creative Strategist";
let i = 0;
const speed = 80;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = typeWriter;

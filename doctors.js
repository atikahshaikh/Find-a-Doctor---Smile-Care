
// Mobile Navigation

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("show");

    const isOpen = navbar.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});


// Close Mobile Menu

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});


// Doctor Search and Filters

const doctorSearch = document.getElementById("doctorSearch");
const specialtyFilter = document.getElementById("specialtyFilter");
const locationFilter = document.getElementById("locationFilter");
const availabilityFilter = document.getElementById("availabilityFilter");

const doctorCards = document.querySelectorAll(".doctor-card");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");


// Filter Doctors

function filterDoctors() {

    const searchValue = doctorSearch.value.toLowerCase().trim();
    const specialtyValue = specialtyFilter.value;
    const locationValue = locationFilter.value;
    const availabilityValue = availabilityFilter.value;

    let visibleDoctors = 0;

    doctorCards.forEach(function (card) {

        const doctorName = card.dataset.name.toLowerCase();
        const doctorSpecialty = card.dataset.specialty;
        const doctorLocation = card.dataset.location;
        const doctorAvailability = card.dataset.availability;

        const matchesSearch = doctorName.includes(searchValue);
        const matchesSpecialty = specialtyValue === "" || doctorSpecialty === specialtyValue;
        const matchesLocation = locationValue === "" || doctorLocation === locationValue;
        const matchesAvailability = availabilityValue === "" || doctorAvailability === availabilityValue;

        if (matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability) {

            card.classList.remove("hide");
            visibleDoctors++;

        } else {

            card.classList.add("hide");

        }

    });


    // Update Results

    resultsCount.textContent = "Showing " + visibleDoctors + " doctors";

    if (visibleDoctors === 0) {
        noResults.classList.add("show");
    } else {
        noResults.classList.remove("show");
    }

}


// Search Input

doctorSearch.addEventListener("input", filterDoctors);


// Specialty Filter

specialtyFilter.addEventListener("change", filterDoctors);


// Location Filter

locationFilter.addEventListener("change", filterDoctors);


// Availability Filter

availabilityFilter.addEventListener("change", filterDoctors);


// Reset Filters

function resetFilters() {

    doctorSearch.value = "";
    specialtyFilter.value = "";
    locationFilter.value = "";
    availabilityFilter.value = "";

    filterDoctors();

}


document.getElementById("resetFilters").addEventListener("click", resetFilters);

document.getElementById("clearSearch").addEventListener("click", resetFilters);


// Chatbot

const chatbotBtn = document.getElementById("chatbotBtn");
const chatbotBox = document.getElementById("chatbotBox");
const closeChat = document.getElementById("closeChat");

chatbotBtn.addEventListener("click", function () {
    chatbotBox.classList.toggle("open");
});

closeChat.addEventListener("click", function () {
    chatbotBox.classList.remove("open");
});


// Chatbot Messages

const chatInput = document.getElementById("chatInput");
const sendMessage = document.getElementById("sendMessage");
const chatbotBody = document.querySelector(".chatbot-body");


function sendChatMessage() {

    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }


    // Show User Message

    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = message;

    chatbotBody.appendChild(userMessage);

    chatInput.value = "";


    // Demo Chatbot Reply

    const botReply = document.createElement("div");

    botReply.className = "bot-message";

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("doctor")) {

        botReply.textContent = "You can search doctors by name and filter them by specialization, location or availability.";

    }
    else if (lowerMessage.includes("appointment") || lowerMessage.includes("booking")) {

        botReply.textContent = "Select your preferred doctor and click Book Now to visit the appointment page.";

    }
    else if (lowerMessage.includes("fee") || lowerMessage.includes("price")) {

        botReply.textContent = "Demo consultation fees are displayed on each doctor card. Please confirm actual fees with the clinic.";

    }
    else if (lowerMessage.includes("location") || lowerMessage.includes("address")) {

        botReply.textContent = "Our sample doctor profiles show different Karachi locations. Please confirm the actual clinic address before visiting.";

    }
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {

        botReply.textContent = "Hello! Welcome to Smile Care. How can I help you?";

    }
    else {

        botReply.textContent = "Thank you for your message. You can use our doctor search and filters to explore the available demo profiles.";

    }


    // Display Reply

    setTimeout(function () {

        chatbotBody.appendChild(botReply);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

    }, 500);


    chatbotBody.scrollTop = chatbotBody.scrollHeight;

}


// Send Button

sendMessage.addEventListener("click", sendChatMessage);


// Enter Key

chatInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendChatMessage();
    }

});

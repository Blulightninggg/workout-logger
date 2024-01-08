document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is fully loaded.");
    // retrieve data from storage
    let savedData = JSON.parse(localStorage.getItem("savedData")) || {};

    // update button styles based on saved data
    updateButtonStyles(savedData);

    // Attach click event listeners to day buttons
    document.querySelectorAll(".day-button").forEach(function (button) {
        button.addEventListener("click", function () {
            // Show popup
            document.getElementById("popup").style.display = "block";

            // Save the current day
            currentDay = this.id;
        });
    });

    // Handle popup form submission outside the loop
    document.getElementById("popup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let savedData = JSON.parse(localStorage.getItem("savedData")) || {};

        if (!Array.isArray(savedData[currentDay])) {
            savedData[currentDay] = [];
        }

        // Get values from the form
        let selectedItem = document.getElementById("item-dropdown").value;
        let numberValue = document.getElementById("number-input").value;
        let newEntry = { item: selectedItem, number: numberValue };

        // Update saved data
        savedData[currentDay].push(newEntry);

        // Save data to local storage
        localStorage.setItem("savedData", JSON.stringify(savedData));

        // Update button style for the current day
        document.getElementById(currentDay).classList.add("green");

        // Hide the popup
        document.getElementById("popup").style.display = "none";
    });

    // Handle reset button click
    document.getElementById("reset-button").addEventListener("click", function () {
        // Clear saved data
        savedData = {};

        // Clear button styles
        document.querySelectorAll(".day-button").forEach(function (button) {
            button.classList.remove("green");
        });

        // Save empty data to local storage
        localStorage.setItem("savedData", JSON.stringify(savedData));
    });

    // Function to update button styles based on saved data
    function updateButtonStyles(savedData) {
        for (let day in savedData) {
            if (savedData.hasOwnProperty(day)) {
                let button = document.getElementById(day);
                if (button) {
                    button.classList.add("green");
                }
            }
        }
    }

    // Call the displaySummary function when the Summary page is loaded
    if (window.location.pathname.endsWith("Summary.html")) {
        console.log("Loading Summary Page");
        displaySummary();
    }
});

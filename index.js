let calculateButton = document.getElementById("calculate");
let clearAllButton = document.getElementById("clear");

let amountField = document.getElementById("amountfield");
let yearsField = document.getElementById("yearsfield");
let rateField = document.getElementById("ratefield");

let radioButtons = document.querySelectorAll(".type");

calculateButton.addEventListener("click", function () {

    let amount = parseFloat(amountField.value);
    let years = parseFloat(yearsField.value);
    let rate = parseFloat(rateField.value) / 100;



    if (isNaN(amount) || isNaN(years) || isNaN(rate)) {
        alert("Please enter valid numbers for all fields");
        return;
    }

    let mortgageType = "";
    radioButtons.forEach(function (radio) {
        if (radio.checked) {
            mortgageType = radio.parentElement.textContent.trim();
        }
    });

    let monthlyPayment, totalPayment;

    if (mortgageType === "Repayment") {
        console.log("repayment");
        // Formula for repayment mortgage:
        // M = P * (r(1+r)^n) / ((1+r)^n - 1)
        // Where:
        // M = monthly payment
        // P = principal (loan amount)
        // r = monthly interest rate (annual rate / 12)
        // n = number of monthly payments (years * 12)

        let monthlyRate = rate / 12;
        let numberOfPayments = years * 12;

        monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        totalPayment = monthlyPayment * numberOfPayments;
    } else {
        // Interest-only mortgage
        console.log("interest");
        monthlyPayment = amount * (rate / 12);
        totalPayment = (monthlyPayment * years * 12) + amount;
    }

    // Display the results (e.g., update HTML elements)
    document.querySelector(".monthly").textContent = `£ ${monthlyPayment.toFixed(2)}`;
    document.querySelector(".overterm").textContent = `£ ${totalPayment.toFixed(2)}`;
    document.querySelector(".complete").style.display = "block";
    document.querySelector(".placeholder").style.display = "none";
});





clearAllButton.addEventListener("click", function () {

    let inputs = document.querySelectorAll("input");

    inputs.forEach(function (input) {
        input.value = " ";
    });

    radioButtons.forEach(function (radio) {
        radio.checked = false;
    });

    document.querySelector(".complete").style.display = "none";
    document.querySelector(".placeholder").style.display = "flex";
});




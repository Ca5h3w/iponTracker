document.addEventListener("DOMContentLoaded", () => {
    loadSavedData();
});

function addCoin() {
    let coinType = document.getElementById("coinType").value;
    let quantity = document.getElementById("quantity").value;

    if (quantity <= 0 || quantity === "") {
        alert("Please enter a valid quantity!");
        return;
    }

    let coins = JSON.parse(localStorage.getItem("coins")) || {};
    coins[coinType] = (coins[coinType] || 0) + parseInt(quantity);
    
    localStorage.setItem("coins", JSON.stringify(coins));
    document.getElementById("quantity").value = "";

    loadSavedData();
}

function loadSavedData() {
    let coins = JSON.parse(localStorage.getItem("coins")) || {};
    let tableBody = document.getElementById("coinTable");
    tableBody.innerHTML = "";

    let totalAmount = 0;
    
    for (let type in coins) {
        let row = document.createElement("tr");
        let coinValue = parseInt(type) * coins[type];
        totalAmount += coinValue;

        row.innerHTML = `
            <td>${type} PHP</td>
            <td>${coins[type]}</td>
            <td>${coinValue} PHP</td>
            <td><button class="delete-btn" onclick="removeCoin('${type}')">❌</button></td>
        `;
        tableBody.appendChild(row);
    }

    document.getElementById("total").innerText = totalAmount + " PHP";
}

function removeCoin(coinType) {
    let coins = JSON.parse(localStorage.getItem("coins")) || {};
    delete coins[coinType];

    localStorage.setItem("coins", JSON.stringify(coins));
    loadSavedData();
}

function resetPiggybank() {
    if (confirm("Are you sure you want to reset?")) {
        localStorage.removeItem("coins");
        loadSavedData();
    }
}

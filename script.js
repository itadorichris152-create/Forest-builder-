// Running total state tracking
let totalCarbonSaved = 0;
let leftoverPoints = 0; // Tracks leftover points that haven't reached 10 CP yet

// Grab references to HTML DOM Elements
const commuteForm = document.getElementById('commuteForm');
const transportSelect = document.getElementById('transportType');
const distanceInput = document.getElementById('distance');
const pointsDisplay = document.getElementById('pointsDisplay');
const forestContainer = document.getElementById('forestContainer');

// Listen for form submissions
commuteForm.addEventListener('submit', function(event) {
    // Prevent page from refreshing automatically
    event.preventDefault();

    // 1. Get input values
    const transportType = transportSelect.value;
    const distance = parseFloat(distanceInput.value);

    // Basic data safety check
    if (isNaN(distance) || distance <= 0) {
        alert("Please enter a valid distance greater than 0.");
        return;
    }

    // 2. Calculation Logic
    let savingsPerKm = 0;

    if (transportType === 'walk' || transportType === 'bike') {
        savingsPerKm = 5;
    } else if (transportType === 'bus') {
        savingsPerKm = 3;
    } else if (transportType === 'car') {
        savingsPerKm = 0;
    }

    // Calculate points saved on this specific ride
    const currentSavings = distance * savingsPerKm;

    // 3. Update Global Tracking State
    totalCarbonSaved += currentSavings;
    // Add new savings to our pool of leftover points awaiting tree allocation
    leftoverPoints += currentSavings;

    // Update Text display layout (rounded nicely to 1 decimal place)
    pointsDisplay.textContent = `Total Carbon Saved: ${totalCarbonSaved.toFixed(1)} CP`;

    // 4. Planting Trees Logic (1 Tree per 10 CP)
    // Math.floor calculates how many full blocks of 10 we have accumulated
    const treesToPlant = Math.floor(leftoverPoints / 10);

    if (treesToPlant > 0) {
        // Create and inject the specified number of trees into the layout
        for (let i = 0; i < treesToPlant; i++) {
            const treeSpan = document.createElement('span');
            treeSpan.className = 'tree-icon';
            treeSpan.textContent = '🌳';
            forestContainer.appendChild(treeSpan);
        }

        // Reduce the leftover pool by the values we just converted into trees
        leftoverPoints = leftoverPoints % 10;
    }

    // 5. Reset input form UI so it's clean for the next log
    commuteForm.reset();
});

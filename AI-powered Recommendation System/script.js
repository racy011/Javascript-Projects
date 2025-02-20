// Simulated AI-based recommendation system
const recommendations = {
    electronics: ["Smartphone", "Laptop", "Wireless Earbuds", "Smartwatch", "Gaming Console"],
    books: ["The Alchemist", "Sapiens", "Atomic Habits", "Deep Work", "Thinking, Fast and Slow"],
    fashion: ["Sneakers", "Denim Jacket", "Sunglasses", "Hoodie", "Leather Belt"],
    fitness: ["Dumbbells", "Yoga Mat", "Treadmill", "Protein Powder", "Skipping Rope"]
};

// Function to generate recommendations
function getRecommendations() {
    const category = document.getElementById("category").value;
    const recommendedItems = aiRecommend(category);
    
    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = `<h3>Recommended Items:</h3> <ul>` +
        recommendedItems.map(item => `<li>${item}</li>`).join('') +
        `</ul>`;
}

// AI-based recommendation function (mock logic)
function aiRecommend(category) {
    let items = recommendations[category];

    // Simulating AI logic by shuffling and picking top recommendations
    items = items.sort(() => 0.5 - Math.random()).slice(0, 3); // Pick 3 random items
    return items;
}

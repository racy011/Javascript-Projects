let model;

// Load a pre-trained model (you can replace it with your own TensorFlow model)
async function loadModel() {
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
    console.log("AI Model Loaded Successfully!");
}

// Load the model when the script is loaded
loadModel();

// Function to handle user messages
async function sendMessage() {
    let userInput = document.getElementById("userInput").value.trim();
    if (userInput === "") return;

    let chatbox = document.getElementById("chatbox");

    // Display user message
    chatbox.innerHTML += `<p class="user-message">${userInput}</p>`;

    // Get AI response
    let botResponse = await getAIResponse(userInput);
    chatbox.innerHTML += `<p class="bot-message">${botResponse}</p>`;

    // Clear input field
    document.getElementById("userInput").value = "";

    // Auto-scroll chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to generate AI responses using NLP
async function getAIResponse(userText) {
    const responseTemplates = {
        "greeting": ["Hello! How can I assist you?", "Hi there! Need any help?", "Hey! What's on your mind?"],
        "weather": ["I can't check live weather, but I recommend checking a weather website.", "It's always a good day to learn something new!"],
        "goodbye": ["Goodbye! Have a great day!", "Take care! Feel free to chat again."],
        "default": ["I'm still learning! Can you rephrase that?", "That's interesting! Can you tell me more?", "I don't have an answer for that yet, but I'm improving!"]
    };

    let intent = await predictIntent(userText);

    if (responseTemplates[intent]) {
        let responses = responseTemplates[intent];
        return responses[Math.floor(Math.random() * responses.length)];
    } else {
        return responseTemplates["default"][Math.floor(Math.random() * responseTemplates["default"].length)];
    }
}

// Predict user intent using a TensorFlow model (basic sentiment analysis)
async function predictIntent(text) {
    // Convert text to lowercase and tokenize it
    let tokenized = text.toLowerCase().split(" ");

    // Simple rule-based intent detection
    if (tokenized.includes("hello") || tokenized.includes("hi") || tokenized.includes("hey")) {
        return "greeting";
    } else if (tokenized.includes("weather")) {
        return "weather";
    } else if (tokenized.includes("bye") || tokenized.includes("goodbye")) {
        return "goodbye";
    }

    return "default";
}

// Function to send message on pressing Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

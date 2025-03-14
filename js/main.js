// Burger Menu Toggle
const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.getElementById('nav-links');

// // Toggle navigation links when burger menu is clicked
// burgerMenu.addEventListener('click', (event) => {
//     navLinks.classList.toggle('active');
//     burgerMenu.classList.toggle('open');
//     event.stopPropagation();
// });
//
// // Close navigation links when clicking outside
// document.addEventListener('click', (event) => {
//     const isClickInsideMenu = burgerMenu.contains(event.target) || navLinks.contains(event.target);
//
//     if (!isClickInsideMenu && navLinks.classList.contains('active')) {
//         navLinks.classList.remove('active');
//         burgerMenu.classList.remove('open');
//     }
// });
//Test functions for API endpoints defined in src/api.js
// Each function tests a specific API endpoint and updates the corresponding div with results

async function testStartTreasureHunt() {
    try {
        const treasureHunts = await getTreasureHunts();
        if (treasureHunts && treasureHunts.length > 0) {
            const treasureHuntId = treasureHunts[1].uuid;
            const session = await startTreasureHunt("", "TestApp", treasureHuntId);
            console.log("startTH (error): ", session);
            document.getElementById("startTreasureHuntResult").innerText = "startTH (error): " + JSON.stringify(session, null, 2);
        } else {
            document.getElementById("startTreasureHuntResult").innerText = "No treasure hunts available.";
        }
    } catch (error) {
        console.error("startTreasureHunt (error) Error: ", error);
        document.getElementById('startTreasureHuntResult').innerText = "startTreasureHunt (error) Error: " + error.message;
    }
}

// Function to test startTreasureHunt API successfully
async function testStartTreasureHuntSuccess() {
    try {
        const treasureHunts = await getTreasureHunts();
        if (treasureHunts && treasureHunts.length > 0) {
            const treasureHuntId = treasureHunts[1].uuid;
            const session = await startTreasureHunt("tim", "TestApp", treasureHuntId);
            console.log("startTreasureHunt (success): ", session);
            document.getElementById('startTreasureHuntResult').innerText += "<br><br>startTreasureHunt (success): " + JSON.stringify(session, null, 2);
            sessionId = session; // Save the session ID
        } else {
            document.getElementById('startTreasureHuntResult').innerText += "<br><br>Theres no treasure hunts available.";
        }
    } catch (error) {
        console.error("startTreasureHunt (success) Error: ", error);
        document.getElementById('startTreasureHuntResult').innerText += "<br><br>startTreasureHunt (success) Error: " + error.message;
    }
}

// Function to test getQuestion API
async function testGetQuestion() {
    try {
        const question = await getQuestion(sessionId);
        document.getElementById('questionResult').innerText = "getQuestion: " + JSON.stringify(question, null, 2);
    } catch (error) {
        document.getElementById('questionResult').innerText = "getQuestion Error: " + error.message;
    }
}

var sessionID
testGetTreasureHunts();
testStartTreasureHunt();
testStartTreasureHuntSuccess();
testGetQuestion();
testSubmitAnswer();





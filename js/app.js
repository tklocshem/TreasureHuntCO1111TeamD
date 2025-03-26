// Function to get the value of a specific cookie by name
function getCookieValue(name) {
    const cookies = document.cookie.split("; ");
    for (const c of cookies) {
      const [key, value] = c.split("=");
      if (key === name) return decodeURIComponent(value); // will retorn the decoded cookie value if the name matches
    }
    return null;
  }
  
  // cookie expiry date
  function clearCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  
  // check [layers name to avoild double entries
  document.addEventListener("DOMContentLoaded", () => {
    const playerName = getCookieValue("playerName");
    const gameId = getCookieValue("uuid");
    if (!playerName || !gameId) {
      window.location.href = "start.html";
      return;
    }
  
    startHunt(playerName, gameId);
  });
  //start game by calling  API
  function startHunt(playerName, gameId) {
    const appId = "Team D";
    const startURL = `https://codecyprus.org/th/api/start?player=${encodeURIComponent(playerName)}&app=${encodeURIComponent(appId)}&treasure-hunt-id=${gameId}`;
   
    // request to start game session
    fetch(startURL)
      .then(res => res.json())
      .then(json => {
        if (json.status === "OK") {
          getQuestion(json.session);
        } else {
          alert(json.errorMessages.join("\n"));
          startAgain();
        }
      })
      .catch(() => startAgain()); // If there a network error or any failure reset
  }
  // get and display the current question for player
  function getQuestion(sessionID) {
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
      .then(res => res.json())
      .then(json => {
        const wrapper = document.getElementById("myWraper");
        wrapper.innerHTML = ""; // Clear previous content
  
        if (!json.completed) {    //  populate form with  current question
          const form = document.createElement("form");
          form.id = "form";
          form.innerHTML = `<label>${json.questionText}</label><br>`;
  
          switch (json.questionType) {
            case "TEXT":
              form.innerHTML += `<input type="text" id="ans"><br>`;
              break;
            case "NUMERIC":
            case "INTEGER":
              form.innerHTML += `<input type="number" id="ans" step="0.01"><br>`;
              break;
            case "BOOLEAN":
              form.innerHTML += `
                <input type="radio" name="ans" value="True">True<br>
                <input type="radio" name="ans" value="False">False<br>`;
              break;
            case "MCQ":
              ["A", "B", "C", "D"].forEach(opt => {
                form.innerHTML += `<input type="radio" name="ans" value="${opt}">${opt}<br>`;
              });
              break;
          }
          // submit button
          form.innerHTML += `<button type="button" onclick="getAnswer('${sessionID}', '${json.questionType}')">Submit</button>`;
  
          if (json.canBeSkipped) {
            form.innerHTML += `<button type="button" onclick="skipQuestion('${sessionID}')">Skip</button>`;
          }
  
          wrapper.appendChild(form);
        } else {
             // If quiz is finish, show thankx message and options of start again and leaderboa
          wrapper.innerHTML = `
            <div id='end'>
              <h1>Thanks for playing the Treasure Hunt!</h1>
              <p>You can start a new game or check the leaderboard.</p>
              <button onclick="getLeaderBoard('${sessionID}')">Leaderboard</button>
              <button onclick="startAgain()">Start Again</button>
            </div>`;
        }
      });
  }
//   handle input
  function getAnswer(sessionID, QType) {
    let ans;
    if (["NUMERIC", "INTEGER", "TEXT"].includes(QType)) {
      ans = document.getElementById("ans").value.trim();
      if (!ans) return alert("Please provide your answer.");
    } else {
      const selected = document.querySelector('input[name="ans"]:checked');
      if (!selected) return alert("Please select an answer!");
      ans = selected.value;
    }
//   Submit the answer to the API
    fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${encodeURIComponent(ans)}`)
      .then(res => res.json())
      .then(json => {
        document.getElementById("form").remove();
        const wrapper = document.getElementById("myWraper");
        wrapper.innerHTML += `<div id='secondWrap'><h1>${json.message}</h1><p>You got ${json.scoreAdjustment} points</p><button onclick="getQuestion('${sessionID}')">Continue</button></div>`;
      });
  }
  // skipping a question
  function skipQuestion(sessionID) {
    fetch(`https://codecyprus.org/th/api/skip?session=${sessionID}`)
      .then(res => res.json())
      .then(json => {
        document.getElementById("form").remove();
        const wrapper = document.getElementById("myWraper");
        wrapper.innerHTML += `<div id='secondWrap'><h1>${json.message}</h1><p>You got ${json.scoreAdjustment} points</p><button onclick="getQuestion('${sessionID}')">Continue</button></div>`;
      });
  }
  //display the leaderboard after the game
  function getLeaderBoard(sessionID) {
    fetch(`https://codecyprus.org/th/api/leaderboard?session=${sessionID}&sorted`)
      .then(res => res.json())
      .then(json => {
        const wrapper = document.getElementById("myWraper");
        wrapper.innerHTML = `<div id='secondWrap'><h1>Leaderboard</h1>`;
        // Display top 20 scores
        json.leaderboard.slice(0, 20).forEach((player, index) => {
          wrapper.innerHTML += `<h2>${index + 1}. ${player.player} - ${player.score} points</h2>`;
        });
        wrapper.innerHTML += `<button onclick="startAgain()">Start Again</button></div>`;
      });
  }
  
  function startAgain() {
    clearCookie("playerName");
    clearCookie("uuid");
    location.replace("index.html");
  }
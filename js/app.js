function getinfo(id) {
    const playerNameField = document.getElementById("fname");
    if(playerNameField.value != "") {
        var playerName = playerNameField.value;
        console.log(playerName);
        let date = new Date();
        let dateTime = date.getTime()+365 * 24 * 60 * 60 * 1000;
        setCookie("playerName", playerName, dateTime);
        console.log(getCookie("playerName"));
        document.getElementById("form").remove();
        const urlParameters = new URLSearchParams(window.location.search);
        const gameid = urlParameters.get("uuid");
        startHunt(playerName, gameid);
    }
}
function startHunt(PlayerName,gameid)
{

    console.log(gameid);
    var platform="TreasureHuntApp";
    var URL = "https://codecyprus.org/th/api/start?player="+PlayerName+"&app="+platform+"&treasure-hunt-id="+gameid;
    fetch(URL)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            console.log(jsonObject)
            var sessionID = jsonObject.session;
            var numOfQuestions = jsonObject.numOfQuestions;
            getQuestion(sessionID);
        });
}
function getQuestion(sessionID){
    var URL = "https://codecyprus.org/th/api/question?session="+sessionID;
    if(document.getElementById("secondWrap") != null)
    {
        document.getElementById("secondWrap").remove();
    }
    fetch(URL)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {

            j = document.getElementById("myWraper");
            j.innerHTML += "<form id='form'>";
            i = document.getElementById("form");
            if(jsonObject.completed == false) {
                if (jsonObject.questionType == "TEXT") {
                    i.innerHTML += "<label for='ans'>" + jsonObject.questionText + "</label><br>" +
                        "<input type='text' id='ans' name='ans'><br>" +
                        "<input type='button' onclick='getAnswer(" + JSON.stringify(sessionID) + ", " + JSON.stringify(jsonObject.questionType) + ")' value='Submit'>";
                    if (jsonObject.canBeSkipped) {
                        i.innerHTML += "<input type='button' onclick='skipQuestion(" + JSON.stringify(sessionID) + ")' value='Skip the question'>";
                    }
                } else if (jsonObject.questionType == "NUMERIC" || jsonObject.questionType == "INTEGER") {
                    if (jsonObject.questionType == "NUMERIC") {
                        i.innerHTML += "<label for='ans'>" + jsonObject.questionText + "</label><br>" +
                            "<input type='number' id='ans' name='ans' step='0.01'><br>" +
                            "<input type='button' onclick='getAnswer(" + JSON.stringify(sessionID) + ", " + JSON.stringify(jsonObject.questionType) + ")' value='Submit'>";
                        if (jsonObject.canBeSkipped) {
                            i.innerHTML += "<input type='button' onclick='skipQuestion(" + JSON.stringify(sessionID) + ")' value='Skip the question'>";
                        }
                    } else {
                        i.innerHTML += "<label for='ans'>" + jsonObject.questionText + "</label><br>" +
                            "<input type='number' id='ans' name='ans'><br>" +
                            "<input type='button' onclick='getAnswer(" + JSON.stringify(sessionID) + ", " + JSON.stringify(jsonObject.questionType) + ")' value='Submit'>";
                        if (jsonObject.canBeSkipped) {
                            i.innerHTML += "<input type='button' onclick='skipQuestion(" + JSON.stringify(sessionID) + ")' value='Skip the question'>";
                        }
                    }
                } else {
                    if (jsonObject.questionType == "BOOLEAN") {
                        i.innerHTML += "<p>" + jsonObject.questionText + "</p>\n" +
                            "<input type='radio' id='true' name='ans' value='True'>\n" +
                            "<label for='true'>True</label><br>\n" +
                            "<input type='radio' id='false' name='ans' value='False'>\n" +
                            "<label for='false'>False</label><br>\n " +
                            "<input type='button' onclick='getAnswer(" + JSON.stringify(sessionID) + ", " + JSON.stringify(jsonObject.questionType) + ")' value='Submit'>";
                        if (jsonObject.canBeSkipped) {
                            i.innerHTML += "<input type='button' onclick='skipQuestion(" + JSON.stringify(sessionID) + ")' value='Skip the question'>";
                        }
                    } else {
                        i.innerHTML += "<p>" + jsonObject.questionText + "</p>\n" +
                            "<input type='radio' id='A' name='ans' value='A'>\n" +
                            "<label for='A'>A</label><br>\n" +
                            "<input type='radio' id='B' name='ans' value='B'>\n" +
                            "<label for='B'>B</label><br>\n " +
                            "<input type='radio' id='C' name='ans' value='C'>\n" +
                            "<label for='C'>C</label><br>\n" +
                            "<input type='radio' id='D' name='ans' value='D'>\n" +
                            "<label for='D'>D</label><br>\n " +
                            "<input type='button' onclick='getAnswer(" + JSON.stringify(sessionID) + ", " + JSON.stringify(jsonObject.questionType) + ")' value='Submit'>";
                        if (jsonObject.canBeSkipped) {
                            i.innerHTML += "<input type='button' onclick='skipQuestion(" + JSON.stringify(sessionID) + ")' value='Skip the question'>";
                        }
                    }

                }
                j.innerHTML += "</form>";
            }
            else{
                let param = new URLSearchParams(window.location.search);
                j.innerHTML+="<div id='end'>" +
                    "<h1 id='gameEnd'> Thanks for playing treasure hunt" +
                    "<p>You can eather start new game or check your position on leaderboard</p>" +
                    "<br>" +
                    "<input type='button' onclick='getLeaderBoard(" + JSON.stringify(sessionID) + ")' value='Leader board'>" +
                    "<input type='button' onclick='startAgain()' value='Start Again!'>" +
                    "</div>"
            }
        });
}
function getAnswer(sessionID, QType){
    console.log(sessionID);
    if(QType == "NUMERIC" || QType == "INTEGER" || QType == "TEXT") {
        var ans = document.getElementById("ans").value;
    }
    else{
        var ans = document.querySelector('input[name="ans"]:checked').value;
    }
    var URL = "https://codecyprus.org/th/api/answer?session="+sessionID+"&answer="+ans;

    fetch(URL)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            document.getElementById("form").remove();
            var Congrats = jsonObject.message;
            var scorAdjustment = jsonObject.scoreAdjustment;
            i = document.getElementById("myWraper");
            console.log(scorAdjustment);
            console.log(Congrats);
            i.innerHTML+="<div id='secondWrap'>" +
                "<h1 id='congratulation'>"+Congrats+"</h1>" +
                "<p id='scoreAdjustment'>You got +"+scorAdjustment+"</p>" +
                "<input type='button' value='Continue' onclick='getQuestion("+JSON.stringify(sessionID)+")'>" +
                "</div>";
        });
}
function skipQuestion(sessionID){
    var URL = "https://codecyprus.org/th/api/skip?session="+sessionID;
    fetch(URL)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            var Congrats = jsonObject.message;
            var scorAdjustment = jsonObject.scoreAdjustment;
            document.getElementById("form").remove();
            i = document.getElementById("myWraper");
            i.innerHTML+="<div id='secondWrap'>" +
                "<h1 id='congratulation'>"+Congrats+"</h1>" +
                "<p id='scoreAdjustment'>You got "+scorAdjustment+"</p>" +
                "<input type='button' value='Continue' onclick='getQuestion("+JSON.stringify(sessionID)+")'>" +
                "</div>";
        });
}
function getLocation(){
    return navigator.geolocation.getCurrentPosition(showjPosition);
}
function getScore(sessionID){
    var URL = "https://codecyprus.org/th/api/score?session="+sessionID;
    fetch(URL)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            var Congrats = jsonObject.player;
            var scorAdjustment = jsonObject.score;
            i = document.getElementById("myWraper");
            i+="<div id='secondWrap'>" +
                "<h1 id='congratulation'>"+Congrats+"</h1>" +
                "<p id='scoreAdjustment'>You got +"+scorAdjustment+"</p>" +
                "<input type='button' value='Continue' onclick='getQuestion("+sessionID+")'>" +
                "</div>";
        });
}

function getLeaderBoard(sessionID) {
    var URL = "https://codecyprus.org/th/api/leaderboard?session=" + sessionID + "&sorted";
    fetch(URL)
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            var players = jsonObject.leaderboard;
            document.getElementById("end").remove();
            i = document.getElementById("myWraper");
            i.innerHTML+="<div id='secondWrap'>" +
                "<h1>Your position in leaderboard is: "+findMinePosition(jsonObject, getCookie("playerName"))+"</h1>";
            let k = document.getElementById("secondWrap");
            for(let j = 0; j < 10; j++){
                k.innerHTML+= "<h2>Player № "+(j+1)+" "+jsonObject.leaderboard[j].player+" and his score is: "+jsonObject.leaderboard[j].score+"</h2>";
            }

            i.innerHTML+="<input type='button' onclick='startAgain()' value='Start Again!'>" +
                "</div>";
        });
}
function findMinePosition(jsonObject, playerName){
    for(let i = 0; i < jsonObject.numOfPlayers;i++)
    {
        if(JSON.stringify(jsonObject.leaderboard[i].player) === JSON.stringify(playerName))
        {
            return i+1;
        }
    }
    return null;
}
function startAgain()
{
    location.replace("https://pgurulev.github.io/CO1111/Project/");
}
//Code from w3shools url="https://www.w3schools.com/js/js_cookies.asp"
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//www.w3schools.com/js/js_cookies.asp"
function setCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}
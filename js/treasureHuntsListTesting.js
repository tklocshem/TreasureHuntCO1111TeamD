let testValues = [-1, 0, 1, 2, 10, null, ""]; // Array of test values

const testCasesBody = document.getElementById("testCasesBody");

// Function to run automated test
async function runAutomatedTest(){
    testCasesBody.innerHTML = "";
    for (let i = 0; i <testValues.length; i++) {
        const input = testValues[i];
        const expectedOutput = await getTreasureHunts(input);

        testCasesBody.innerHTML += "<tr>" + "<td class='tableData'>" + input + "</td>"
            + "<td class='tableData'>" + expectedOutput + "</td>" + "</tr>";
    }
}

// Function to run manual test
function runTest(){
    testCasesBody.innerHTML = "";
    // Get number of treasure hunts from input field
    const numOfTreasureHuntsInput = document.getElementById("numOfTreasureHuntsInput");
    const numOfTreasureHunts = numOfTreasureHuntsInput.value;
    getTreasureHunts(numOfTreasureHunts).then(value => {

        testCasesBody.innerHTML += "<tr>" + "<td class='tableData'>" + numOfTreasureHunts + "</td>"
            + "<td class='tableData'>" + value + "</td>" + "</tr>";
    });
}

// Function to fetch treasure hunts data from API
async function getTreasureHunts(numOfTreasureHunts) {
    // Fetch treasure hunts data
    return await fetch(`https://codecyprus.org/th/test-api/list?number-of-ths=${numOfTreasureHunts}`)
        .then(response => response.json())
        .then(jsonObject => {
            const status = jsonObject.status;
            if (status === "OK") {
                let treasureHunts = jsonObject.treasureHunts;
                return treasureHunts.length;
            }
            else {
                return false;
            }
        });
}
let thc = JSON.parse(thcJSON);
let challenges = {
    name: personObject.name,
    description: personObject.description,
    visibility: personObject.visibility
};
let thcJSONResponse = '{\n' +
    ' "treasureHunts": [\n' +
    ' {\n' +
    ' "uuid": "f1a6332f-27a4-4522-b52e-4937d5d747c7",\n' +
    ' "name": "name-0",\n' +
    ' "description": "description-0",\n' +
    ' "ownerEmail": "email-0@example.com",\n' +
    ' "secretCode": "abc1234",\n' +
    ' "visibility": "PRIVATE",\n' +
    ' "startsOn": 1568883640616,\n' +
    ' "endsOn": 1568887240616,\n' +
    ' "maxDuration": 720000,\n' +
    ' "shuffled": false,\n' +
    ' "requiresAuthentication": false,\n' +
    ' "emailResults": true,\n' +
    ' "hasPrize": false\n' +
    ' },\n' +
    ' {\n' +
    ' "uuid": "05de92a7-6f7c-442c-a6c3-bd97a810002f",\n' +
    ' "name": "name-1",\n' +
    ' "description": "description-1",\n' +
    ' "ownerEmail": "email-1@example.com",\n' +
    ' "secretCode": "abc1234",\n' +
    ' "visibility": "PUBLIC",\n' +
    ' "startsOn": 1568883640617,\n' +
    ' "endsOn": 1568887240617,\n' +
    ' "maxDuration": 360000,\n' +
    ' "shuffled": false,\n' +
    ' "requiresAuthentication": false,\n' +
    ' "emailResults": true,\n' +
    ' "hasPrize": true\n' +
    ' }\n' +
    ' ],\n' +
    ' "status": "OK"\n' +
    '}';
const TH_BASE_URL = "https://codecyprus.org/th/api/"; // the true API base url
const TH_TEST_URL = "https://codecyprus.org/th/test-api/"; // the test API base url

 @return {Promise<void>}
 */

async function doList() {

    // call the web service and await for the reply to come back and be converted to JSON
    const reply = await fetch(TH_BASE_URL + "list");
    const json = await reply.json();

    // identify the spinner, if available, using the id 'loader'...
    let spinner = document.getElementById("loader");
    // .. and stop it (by hiding it)
    spinner.hidden = true;

    // access the "treasureHunts" array on the reply message
    let treasureHuntsArray = json.treasureHunts;
    let listHtml = "<ul>"; // dynamically form the HTML code to display the list of treasure hunts
    for(let i = 0; i < treasureHuntsArray.length; i++) {
        listHtml += // each treasure hunt item is shown with an individual DIV element
            "<li>" +
            "<b>" + treasureHuntsArray[i].name + "</b><br/>" + // the treasure hunt name is shown in bold...
            "<i>" + treasureHuntsArray[i].description + "</i><br/>" + // and the description in italics in the following line
            "<a href=\"javascript:select(\'" + treasureHuntsArray[i].uuid + "\')\">Start</a>" + // and the description in italics in the following line
            "</li>";
    }
    listHtml += "</ul>";
    // update the DOM with the newly created list
    document.getElementById("treasureHunts").innerHTML = listHtml;
}

/**
 * This function is called when a particular treasure hunt is selected. This is merely a placeholder as you're expected
 * to realize this function-or an equivalent-to perform the necessary actions after a treasure hunt is selected.
 *
 * @param uuid this is the argument that corresponds to the UUID of the selected treasure hunt.
 * @return {Promise<void>}
 */
async function select(uuid) {
    // For now just print the selected treasure hunt's UUID. Normally, you're expected to guide the user in entering
    // their name etc. and proceed to calling the '/start' command of the API to start a new session.
    console.log("Selected treasure hunt with UUID: " + uuid);
    // todo add your own code ...
}

let thcResponse = JSON.parse(thcJSONResponse);
console.log(`Status: ${thcResponse.status}`);
let treasureHunts = thcResponse.treasureHunts;

// Выводим длину массива treasureHunts
console.log(`Length of treasureHunts array: ${treasureHunts.length}`);
console.log('Names of treasure hunts:');
treasureHunts.forEach((hunt) => {
    console.log(hunt.name);
});
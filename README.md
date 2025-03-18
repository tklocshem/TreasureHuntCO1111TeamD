## Treasure Hunt Web App - Team D

## Overview

This project is a Mobile Web App designed for playing a Treasure Hunt using the Code Cyprus API. The app allows users to participate in a treasure hunt by answering questions and tracking their progress using location services.

This repository contains both:

app.html: The Live Treasure Hunt App using the official Code Cyprus API.

test.html: A Testing Version of the app using the Code Cyprus Test API, along with unit tests and user acceptance test plans.

## Features

| Features                                   | Description                                               |
|--------------------------------------------|-----------------------------------------------------------|
| `/**Live Hunts**`                          | Fetches available treasure hunts from the Code Cyprus API |
| `/**Test Hunts**`                          | A separate testing environment to run mock hunts          |
| `/**Answer Submission**`                   | Users can submit answers for various question types       |
| `/**Skipping Questions**`                  | If permitted, users can skip questions                    |
| `/**Score Tracking**`                      | Live updates of scores after each question                |
| `/**Leaderboard**`                         | Displays rankings of players in the current hunt          |
| `/**Geolocation**`                         | Sends location data with answers where required           |
| `/**Mobile-Friendly UI**`                  | Designed primarily for mid-to-high-end smartphones.gi     |
| `/**Unit Testing & User Acceptance Test**` | A dedicated test.html page for testing methodologies      |
     

## Getting Started

1.  Installation

Clone the repository:

git clone https://github.com/tklocshem/TreasureHuntCO1111TeamD.git

Navigate into the project folder:

cd TreasureHuntCO1111TeamD

Open index.html in your browser for an introduction to the project.

Open app.html to start a Live Treasure Hunt.

Open test.html to run the Test Hunt and execute unit tests.

2. Running the App

Open app.html in a modern web browser to start playing a real hunt.

Open test.html to run unit tests and interact with the test API.

3.  ### Folder Structure

### TreasureHuntCO1111TeamD


📂 TreasureHuntCO1111TeamD/
├── 📂 assets/            # Images & logos
|
├── 📂 css/               # Stylesheets
|      |────base.css
|      |────app.css
|      |────test.css
|
├── 📂 js/                # JavaScript files
|
├── index.html            # Landing page (marketing & team info)
├── app.html              # Main treasure hunt app (LIVE API)
|
├── test.html             # Test environment & unit tests
|
├── README.md             # Documentation (this file)
```

📡 API Endpoints Used


|   Endpoint       | Purpose                                 |
|------------------|-----------------------------------------|
|   `/List`        | Get list of available hunts             |
|   `/start`       | Start a new hunt session                |
|   `/question`    | Retrieve the next question              |
|   `/answer`      | Submit an answer                        |
|   `/skip`        | Skip a question (if allowed)            |
|   `/leaderboard` | Get current leaderboard                 |
|   `/location`    | Send geolocation data                   |


The app integrates with the Code Cyprus API:

Live Hunts: https://codecyprus.org/th/api/

Test Hunts: https://codecyprus.org/th/test-api/

## Team Members

|          Name                    | Position                                  |
|----------------------------------|-------------------------------------------|
|  Devid Brodsky                   | Team Leader & Frontend Assistant          |     
|  Tymofii Klochko--shemiakin      | Frontend Developer (Backend Support)      |
|  Festus Chinedu Obiwundu         | Frontend Developer (Backend Support)      |
|  Shumaila Rasool                 | Full Stack Assistant & Content Manager    |
|  Philip Diyebkazah Baba          | QA Tester & Full Stack Support            |



## Technologies Used

HTML5,CSS3,JavaScript – Core web technologies

Code Cyprus API – Treasure Hunt backend

Geolocation API – To track user location

GitHub – Version control & collaboration

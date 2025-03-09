document.addEventListener("DOMContentLoaded", function () {
    let scanner;
    let cameras = [];
    let camIndex = 0;

    const videoElement = document.getElementById("preview");
    const contentElement = document.getElementById("content");
    const startBtn = document.getElementById("startBtn");
    const switchCamBtn = document.getElementById("switchCamBtn");
    const stopBtn = document.getElementById("stopBtn");

    let opts = {
        continuous: true,
        video: videoElement,
        mirror: true,
        captureImage: false,
        backgroundScan: true,
        refractoryPeriod: 5000,
        scanPeriod: 1
    };

    // the buttons will be hiidden at first
    videoElement.style.display = "none";
    stopBtn.style.display = "none";
    switchCamBtn.style.display = "none";

    // check if there more than one camera to display the change camera button
    Instascan.Camera.getCameras().then(function (availableCameras) {
        if (availableCameras.length > 0) {
            cameras = availableCameras;
            if (cameras.length > 1) {
                switchCamBtn.style.display = "inline-block";
            }
        } else {
            alert("No cameras found.");
        }
    }).catch(function (e) {
        console.error("Error accessing cameras:", e);
    });

    function startScanner() {
        if (cameras.length === 0) {
            alert("No cameras available.");
            return;
        }

        if (scanner) {
            scanner.stop();
        }

        scanner = new Instascan.Scanner(opts);

        scanner.addListener("scan", function (content) {
            console.log("Scanned: ", content);
            contentElement.innerHTML = `<strong>QR Code Content:</strong> ${content}`;
            stopScanner(); // Stop scanner after a successful scan
        });

        scanner.start(cameras[camIndex])
            .then(() => {
                videoElement.style.display = "block";
                stopBtn.style.display = "inline-block";
            })
            .catch((err) => {
                console.error("Camera start error:", err);
                alert("Error accessing camera.");
            });
    }

    function switchCamera() {
        if (cameras.length > 1) {
            camIndex = (camIndex + 1) % cameras.length; // Cycle through available cameras
            scanner.stop().then(() => {
                scanner.start(cameras[camIndex]);
            }).catch((err) => {
                console.error("Error switching camera:", err);
                alert("Could not switch camera.");
            });
        }
    }

    function stopScanner() {
        if (scanner) {
            scanner.stop();
        }
        videoElement.style.display = "none";
        stopBtn.style.display = "none";
    }

    startBtn.addEventListener("click", startScanner);
    switchCamBtn.addEventListener("click", switchCamera);
    stopBtn.addEventListener("click", stopScanner);
});

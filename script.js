var i = 0;

function speechToTextConversion() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    var diagnostic = document.getElementById('text');
    var playButton = document.getElementById("playButton");

    playButton.onclick = function () {
        if (i === 0) {
            playButton.src = "record-button-thumb.png"; // Change mic image when recording
            recognition.start();
            i = 1;
        } else {
            playButton.src = "mic.png"; // Revert mic image when stopped
            recognition.stop();
            i = 0;
        }
    };

    recognition.onresult = function (event) {
        var last = event.results.length - 1;
        var convertedText = event.results[last][0].transcript;
        diagnostic.value = convertedText;
        console.log('Confidence: ' + event.results[0][0].confidence);
    };

    recognition.onnomatch = function () {
        diagnostic.value = 'I didn\'t recognize that.';
    };

    recognition.onerror = function (event) {
        diagnostic.value = 'Error occurred in recognition: ' + event.error;
    };
}

// Start the conversion process when the script loads
speechToTextConversion();

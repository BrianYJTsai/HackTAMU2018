var contextMenuItem = {
    "id": "ROL",
    "title": "Ni-Howdy",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

var storeStr = "";
var transStr = "";

window.incorrectWords = [];
window.correctWords = [];

function compareStrings(string1, string2) {
    string1 = string1.split(" ");
    string2 = string2.split(" ");
    correct = [];
    incorrect = [];
    index1 = 0;
    index2 = 0;

    while(index2 !== string2.length) {
        while(index1 !== string1.length) {
            if (string1[index1] === string2[index2]) {
                correct.push(string2[index2]);
                break;
            }
            index1++;
            if (index1 === string1.length) {
                incorrect.push(string2[index2]);
            }
        }
        index2++;
        index1 = index2;
        if (index1 === string1.length) {
            while(index2 !== string2.length) {
                incorrect.push(string2[index2]);
                index2++;
            }

        }
    }
    return [
        correct,
        incorrect,
        string2
    ];
}

/*var string1 = "which limit the power of the federal government in guarantees citizens of the united states certain rights";
var string2 = "which limit the power of the federal government and guarantee citizens of the united states certain rights";
var results = compareStrings(string1, string2);
var newString1 = results[0];
var newString2 = results[1];
//document.getElementById('span_WordsIncorrect').innerHTML = "hello";
//document.getElementById('span_WordsCorrect').innerHTML = "hello";
alert("Correct words: " + newString1.toString() + "      Incorrect: " + newString2.toString());*/

function stringFormat(string){
    return string.toLowerCase().replace(/[^A-Za-z0-9_]/g, " ");
}
function SendAudioFile() {
    var readFile = new XMLHttpRequest();
    readFile.responseType = "arraybuffer";
    readFile.open("GET", "TEST.wav", true);

    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "POST",
        "https://speech.platform.bing.com/speech/recognition/dictation/cognitiveservices/v1?language=en-US&format=simple",
        true
    );
    xhttp.setRequestHeader("Ocp-Apim-Subscription-Key", "34aea35b87574b48944d3597bf32a7b2");
    xhttp.setRequestHeader("Content-type", "audio/wav; codec=audio/pcm; samplerate=8000");

    xhttp.onreadystatechange = function () {
        if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {

            transStr = stringFormat(JSON.parse(xhttp.responseText).DisplayText);
            /*console.log("TRANSCRIBED: " +  + "\n\nACTUAL: " + storeStr);
            alert("TRANSCRIBED: " + transStr + "\n\nACTUAL: " + storeStr);*/
            var results = compareStrings(transStr, storeStr);
            //var newString1 = results[0];
            //var newString2 = results[1];
            correctWords = results[0];
            incorrectWords = results[1];
            var ratio = [];
            ratio.push(results[0].length);
            ratio.push(results[1].length);
            ratio.push(results[2].length);
            ratio[0] = Math.round((ratio[0] / ratio[2]) * 100);
            ratio[1] = Math.round((ratio[1] / ratio[2]) * 100);
            localStorage.setItem("ratio", ratio[0] + " " + ratio[1]);
            //alert(ratio);
            //console.log("TRANSCRIBED: " + transStr + "\n\nACTUAL: " + storeStr + "\n\n" + "Correct: " + newString1.toString() + "\nIncorrect: " + newString2.toString());
            alert("TRANSCRIBED: " + transStr + "\n\nACTUAL: " + storeStr + "\n\n" + "Correct: " + correctWords.toString() + "\n\nIncorrect: " + incorrectWords.toString());



        }
    };
    readFile.onreadystatechange = function () {
        if(readFile.readyState === XMLHttpRequest.DONE && readFile.status === 200) {
            xhttp.send(readFile.response);
        }
    };

    readFile.send();
}



chrome.contextMenus.onClicked.addListener(function(clickText){
    chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
        function(tab) {
            chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
                function(response){
                    storeStr = stringFormat(response.data);
                    //alert("Received string");
                    SendAudioFile();
                });
        });
});

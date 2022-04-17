 prediction_1 = "";
 prediction_2 = "";

 Webcam.set({
     width:350,
     height:300,
     image_format:'png',
     png_quality:90
 });
 camera = document.getElementById("camera");
 Webcam.attach('#camera');

 function take_snapshot(){
     Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML = "<img id='imgresult' src='"+data_uri+"'>";
     }); 
 }

console.log('ml5vewrsion:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/HQ6VyhPNg/model.json",modelloaded);
function modelloaded() {
    console.log("modelloaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_1 =  "The first prediction is "+ prediction_1;
    speak_2 = "The second prediction is "+prediction_2;
    utterthis = new SpeechSynthesisUtterance(speak_1 + speak_2);
    synth.speak(utterthis);
}

function check(){
var img= document.getElementById("imgresult");
classifier.classify(img,gotresult);
}

function gotresult(error,results){
  if(error){
      console.error(error);
  }
  else{
      console.log(results);
      document.getElementById("perd1").innerHTML = results[0].label;
      document.getElementById("perd2").innerHTML= results[1].label;
      speak();
      if (results[0].label=="happy"){
          document.getElementById("update_emoji").innerHTML = "&#128522;";
      }
      if (results[0].label=="sad"){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if (results[0].label=="angry"){
        document.getElementById("update_emoji").innerHTML = "&#128545;";
    }
    if (results[1].label=="happy"){
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if (results[1].label=="sad"){
      document.getElementById("update_emoji2").innerHTML = "&#128532;";
  }
  if (results[1].label=="angry"){
      document.getElementById("update_emoji2").innerHTML = "&#128545;";
  }
  }
}
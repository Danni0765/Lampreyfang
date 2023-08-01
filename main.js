leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;
song="";
scorerightwristY=0;
scoreleftwristy=0;
function preload() {
    song=loadSound("music.mp3");
}  

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}  

function draw() {
image(video, 0, 0, 600, 500);
fill("red");
stroke("black");
if (scoreleftwristy>0.2) {
    circle(leftwristX, leftwristY, 20);    
    numberleftwristy=Number(leftwristY);
    remove_decimal= floor(numberleftwristy);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="volume = "+volume;
    song.setVolume(volume);
}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("Model Loaded");    
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        rightwristX=results[0].pose.rightWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristY=results[0].pose.rightWrist.y;
        scoreleftwristy=results[0].pose.keypoints[9].score;
        scorerightwristY=results[0].pose.keypoints[10].score;
    }
}
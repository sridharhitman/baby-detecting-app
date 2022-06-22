status = ""
alarm = "";
objects = [];
function preload(){
  alarm = loadSound("alarm.mp3");
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Detecting Objects"
}


function modelLoaded() {
    console.log('Why do you keep checking the console man, The results are on the screen now close the console');
    status = true;
}
function gotResult(e,r) {
    if(e){
        console.error(e);
    }
    console.log(r);
    objects = r;
}
function draw() {
    image(video,0,0,380,380);
    if(status != "") {
        objDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i< objects.length; i++){
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == 'person'){
                alarm.stop();
                document.getElementById('status').innerHTML = 'Baby Found';
                console.log('Baby Found')
            }
            else{
                alarm.play();
                document.getElementById('status').innerHTML = 'Baby Not Found';
                console.log('Baby Not Found')
            }
            
        }
        if(objects.length == 0){
            alarm.play();
            document.getElementById('status').innerHTML = 'Baby Not Found';
            console.log('Baby Not Found')
        }
    }

}
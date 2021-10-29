
status = "";
var objects = [];

function setup()
{
    canvas = createCanvas(380 , 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectdetectu = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : SCANNING...";
}

function draw()
{
    image(video ,0 ,0 ,380 ,380);
    r=random(255);
    g=random(255);
    b=random(255);
    if (status != "")
    {
        objectdetectu.detect(video, gotResult);
        for (i = 0; i<objects.length; i++)
        {

         document.getElementById("status").innerHTML = "status : Objects Identified";
         document.getElementById("nofo").innerHTML = "number of objects : " + objects.length;

    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded()
{
    console.log("loaded model!");
    status = true;
}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
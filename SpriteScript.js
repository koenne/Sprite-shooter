//Any questions about this script? Contact me on Discord: koenne#2625

//Add all variables
let imageheight = null;
let imagewidth = null;
const characters = "tenshi";
let tID;
let checkingsss = 0;
let height = null;
let frames = 32;
let whichWay = "up";
let speedLeft = 0.05;
let speedUp = 0.05;
speedLeft = 100 / screen.width * 6;
speedUp = 100 / screen.height * 6;
let elementExists = document.getElementById("sprite-information");
let size = 1;
let customSize = 1;

//Checks if the div exists where the image will be
if (document.getElementById("image") == null) {
    //If it doesn't exist, it'll create one.
    const creatediv = document.createElement("DIV");
    creatediv.setAttribute("id", "image");
    document.body.appendChild(creatediv);
}

//Here it loads the image info
const imageinfo = (url) => {
    let img = new Image();
    img.src = url + '.png';
    img.onload = function () {
        //The height and width gets saved
        //The height gets used to set the sprite animation right
        imageheight = this.height;
        imagewidth = this.width;
        switch (whichWay) {
            case "up":
                height = imageheight / 4 * 1;
                break;
            case "down":
                height = imageheight / 4 * 4;
                break;
            case "right":
                height = imageheight / 4 * 2;
                break;
            case "left":
                height = imageheight / 4 * 3;
                break;
            default:
                break;
        }
        // 1 = to up
        // 2 = to the right
        // 3 = to the left
        // 4 = to down
        frames = imagewidth / 3;
    };

}
let elementImgExists = document.getElementById("sprite-information");
//Get a random image from the array "characters"
//This array was inserted through 'dir.php' because php can easily read files in a folder. Javascript doesn't like that much
const getRandomImage = (imgAr, path) => {
    imgAr = imgAr || characters;
    path = path || 'sprites/';
    let img = characters + '.png';
    //Set the random image as the image in the <div> tag
    if (elementExists != null) { // Debug stuff, shouldn't be in the official release
        document.getElementById("imageChar").src = path + img;
    }
    document.getElementById("image").style.background = `url(${path + img})`;
    imageinfo(`sprites/${characters}`);
    document.getElementById("image").style.backgroundPosition =
        `32px ${height}px`;
}

//Animates the script
const animateScript = () => {
    imageinfo(`sprites/${characters}`);
    let position = 0; //With how much pixels the pictures moves
    let interval = 150; //In how many ms the image moves
    let diff = frames; //The difference in pixels each frame
    tID = setInterval(() => { //This activates everytime the interval amount reaches (aka 250ms)
        document.getElementById("image").style.backgroundPosition =
            `-${position}px ${height}px`;
        position = position + diff;
        //if (position < (frames * 2)) //If the end of the image is not reached it adds 90px further
        //    { position = position + diff;}
        //    else //If the end of the image is reached, it resets the image position
        //    { position = 0; }
    }, interval);

}

const start = () => {
    let start = Date.now(); //Sets the startime for when the script runs
    let start2 = Date.now(); //Sets the startime for sprites

    timer = setInterval(function () {
        let timePassed = Date.now() - start; //Checks how much time has been passed in total
        let timePassed2 = Date.now() - start2; //Checks how much time has been passed in total for a sprite
        let amount = timePassed2 / 550 + -10;
        if (amount >= 4) // When the timer reaches 4 it resets to a new sprite, the position of the <div> stays
        {
            start2 = Date.now(); // Resets the date so you get the time of the new sprite

            random = Math.floor(Math.random() * characters.length); //Get a new random image
            getRandomImage()
        }
        draw(); // For the timer so the sprite moves across the screen.
    }, 20);
}

//Animates the script over the screen
const draw = () => {
    //A formula that slides the image across the screen.
    let amount = 0;
    imageLeft = image.style.left;
    imageTop = image.style.top;
    imageLeft = imageLeft.substring(0, imageLeft.length - 1);
    imageTop = imageTop.substring(0, imageTop.length - 1);
    switch (whichWay) {
        case "right":
            if (imageLeft >= 105) //Checks if the sprite is offscreen. If it is, it'll teleport to the otherside for a flawless transition
            {
                imageLeft = -10;
            }
            amount = +imageLeft + +speedLeft; // Calculates how much it has to move
            image.style.left = amount + "%"; // Adds it to the style so it happens. The % is there so it works on all resolutions.
            break;
        case "left":
            if (imageLeft <= -10) {
                imageLeft = 105;
            }
            amount = +imageLeft - +speedLeft;
            image.style.left = amount + "%";
            break;
        case "up":
            if (imageTop <= -10) {
                imageTop = 105;
            }
            amount = +imageTop - +speedUp;
            image.style.top = amount + "%";
            break;
        case "down":
            if (imageTop >= 105) {
                imageTop = -10;
            }
            amount = +imageTop + +speedUp;
            image.style.top = amount + "%";
            break;
    }
    input.focus();
input.select();
}

const stopAnimate = () => {
    clearInterval(tID); // Unused but if called, it'll stop the animation. Only used for debugging.
}
// height = imageheight / 4 * ?;
// 1 = to up
// 2 = to the right
// 3 = to the left
// 4 = to down

const GoRight = () => {
    height = imageheight / 4 * 2;
    whichWay = "right";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const GoLeft = () => {
    height = imageheight / 4 * 3;
    whichWay = "left";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const GoDown = () => {
    height = imageheight / 4 * 4;
    whichWay = "down";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const GoUp = () => {
    height = imageheight / 4 * 1;
    whichWay = "up";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const StopWalking = () => {
    if (speedLeft > 0) {
        speedLeft = 0;
        speedUp = 0;
        document.getElementById("stopButton").innerHTML = "Start";
    } else {
        speedLeft = 100 / screen.width * 3;
        speedUp = 100 / screen.height *3;
        document.getElementById("stopButton").innerHTML = "Stop";
    }
}

// Run these in order to start the script completely. If you want it to start with a click, build a function around it
imageinfo(`sprites/${characters}`); // Get info of the images so it can calculate everything
let amount = 10 //The place where it starts horizontally (-10 if offscreen, 110 for the opposite side)
image.style.left = amount + "%";
amount = -10; // The place where it starts vertically (-10 if offscreen, 110 for the opposite side)
image.style.top = amount + "%";
animateScript(); // Animates the sprite and calls out the draw so it walks over the screen
start(); // Sets down a lot of variables so everything works
getRandomImage(characters, 'sprites/'); // Gets the first random image

const ResetAllTimers = () => {
    // Set a fake timeout to get the highest timeout id
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) { // Since it is the highest, all other timers will clear too
        clearTimeout(i);
    }
}

let textinput;
let elem = document.querySelector('input');
var input = document.getElementById('walkingbox');
input.focus();
input.select();
elem.addEventListener('keypress', function(event) {
    textinput = event.key.toLocaleLowerCase();
    switch (textinput) {
        case "w": 
            GoUp();
            break;
        case "d":
            GoRight();
            break;
        case "a":
            GoLeft();
            break;
        case "s":
            GoDown();
            break;
    
        default:
            break;
    }
    document.getElementById('myInput').value = 'walkingbox';
});


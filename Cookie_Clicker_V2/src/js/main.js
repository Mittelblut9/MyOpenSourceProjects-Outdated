/**********************
 * Author: www.Blackdayz.de
 * 
 * MIT Open Source
 * 
 * A very basic Cookie Clicker for your Website.
 * You can paste it e.g on a Error Page like 404, for a homework or whatever. Feel free and have fun!
 * 
/**********************/


var VERSION = "0.0.1";
var AUTHOR = "www.blackdayz.de";
var LICENSE = "MIT Open Source";
var LASTUPDATE = "09.11.2020";


//! System-relevant functions //

//Get the Value of the cookie(s)
function getCookieValue(a) {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

//Rounds up to 2 decimal places
function round(wert, dez) {
  wert = parseFloat(wert);
  if (!wert) return 0;
  dez = parseInt(dez);
  if (!dez) dez = 0;
  var umrechnungsfaktor = Math.pow(10, dez);
  return Math.round(wert * umrechnungsfaktor) / umrechnungsfaktor;
}


  //Check each second if the autoclicker is true
  setInterval(function checkthings() {
    if (autoclickbool == 'true') { //true = function autoclick() work every second
      autoclick();
    }
  }, 1000); //1000 = 1 Second

  var clientdevice = document.querySelector('html').clientWidth;

if (clientdevice < '768') {
  var randomposition = 1000;
  var cookiebgnumber = 30;
} else {
  var randomposition = 2500;
  var cookiebgnumber = 100;
}

//! ////////////////////////// //

//Data
var score = parseInt(getCookieValue("score")); //The Result after each click
var plus1 = 0; //+1 animation guideline
var cookie_slide = 0; //Cookie Slide guideline (Background animation)
var div100 = 0; //100 rounds of creating a div
var autoclickbool = getCookieValue("autoclickerbool");
var autoclickvalue = parseInt(getCookieValue("autoclickervalue"));
var autoclickcost = parseInt(getCookieValue("autoclickercost"));
var autoclickitems = parseInt(getCookieValue("autoclickeritems"));

var grandmacost = parseInt(getCookieValue("grandmacost"));
var grandmaactive = getCookieValue("grandmaactive");
var grandmaitems = parseInt(getCookieValue("grandmaitems"));


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//all important DIV elements
var cookie = document.getElementById('cookie-svg'); //The Cookie
var result_output = document.getElementById('ergebnis-ausgabe'); // The div element with the score
var body = document.getElementsByTagName("BODY")[0]; // Tag "Body"
var clickaudio = document.getElementById('cookieclicksound'); //Click Sound
var cookiepersecond = document.getElementById('autoclick-ausgabe');

var buyederror = document.getElementById('error');//not enough cookies div
var buyedoutput = document.getElementById('buyed-content');//Item bought output
var buyeddiv = document.getElementById('buyed');//item bought div
//All "Buy" divs
var cost_autoclicker = document.getElementById('cost-autoclicker');
var autoclickerdiv = document.getElementById('autoclicker');

var grandmadiv = document.getElementById('grandma');
var grandmacostoutput = document.getElementById("cost-grandma");


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//If the user press f12
body.addEventListener('keydown', function (event) {
  if (event.keyCode === 123) {
    console.log("|----A very easy Cookie Clicker using Javascript----|");
    console.log("Version: " + VERSION);
    console.log("Author " + AUTHOR);
    console.log("Last Update " + LASTUPDATE);
    console.log(" ");
    console.log("|----Please buy real cookies instead of cheating here!----|");
  }
});

//Data that its important to load at the all beginning
body.onload = function () {
  if (isNaN(score)) {
    result_output.innerHTML = '0';
    score = 0;
    scorecookie();
  }
  else {
    result_output.innerHTML = score;
    cookie_slide_bg();//animated background function
  }
  if (isNaN(autoclickcost)) {
    autoclickcost = 30;
  }
  if (isNaN(autoclickvalue)) {
    autoclickvalue = 0;
    autoclickervaluecookie();
  }
  if(grandmaactive == 'true') {
    loadgrandma();
    displayScore();
  }
  if(isNaN(grandmaitems)) {
    grandmaitems = 0;
  }

  cookiepersecond.innerHTML = autoclickvalue;//display the cookie per second onload

  //Shop
  cost_autoclicker.innerHTML = autoclickcost;//display the cost for the autclicker per second onload
  // \\

  clickaudio.volume = 0.2; //Click Audio Volume: 20%
}


//function to play the sound d
function clicksound() {
  //play the click sound
  clickaudio.play();
}

// Display the score after eachclick
function displayScore() {
  result_output.innerHTML = parseInt(score);
  grandmacostoutput.innerHTML = grandmacost;
  scorecookie();
}

// the number of score gets 1+
function addscore() {
  score++;
  cookie_click(); //function with all animations
}

//function to animate the cookie and other stuff
async function cookie_click() {

  //get the value of the transform element (Without this code the cookie is sent with each click on the standard position)
  var rotate = cookie;
  var st = window.getComputedStyle(rotate, null);
  var tr = st.getPropertyValue("transform");

  //Animate the Cookie on click
  cookie.animate([
    // keyframes
    { transform: 'scale(1)' + tr },
    { transform: 'scale(0.9)' + tr },
    { transform: 'scale(1)' + tr }
  ], {
    // timing options
    duration: 100, //100ms
    easing: "ease-in-out"
  });

  displayScore(); //function to display the score
}

//+1 Click animation
async function clickanimation1(e) {
  plus1++; //Value "animation guideline"
  //generate a div - each of them have an other id
  $("#Cookie").append('<div id="plus1-' + plus1 + '"  style="font-size: 2em; pointer-events: none; z-index: 1;" hidden>+1</div>');
  $("#plus1-" + plus1).css("top", e.clientY - 30);
  $("#plus1-" + plus1).css("left", e.clientX - 20);
  $("#plus1-" + plus1).css("position", "absolute");
  $("#plus1-" + plus1).css("width", "25px");
  $("#plus1-" + plus1).css("height", "25px");
  $("#plus1-" + plus1).css("color", "white");
  $("#plus1-" + plus1).css("font-weight", "bold");
  $("#plus1-" + plus1).css("animation", "GoUp 2s forwards linear");
  $("#plus1-" + plus1).show();

  //delete after 50 created the first 40 div elements
  if (plus1 == 50) {
    for (i = 1; i <= 40; i++) {
      var div = document.getElementById('plus1-' + i);
      div.remove();
    }
    //Set the Value on 1, for the next if query
    div100 = 1;
    //reset the value
    plus1 = 0;
  }

  //only work if the first if query had run | now the last 20, which wasnt removed yet, will be removed now
  if (plus1 == 20) {
    if (div100 == 1) {
      for (i = 41; i <= 50; i++) {
        var div = document.getElementById('plus1-' + i);
        div.remove();
      }
    }
  }
}




// the backgroudn animation
function cookie_slide_bg(e) {
  do {

    cookie_slide++;//Value "Cookie Slide guideline (Background animation)"

    //generate a div - each of them have an other id
    $("#cookies-bg").append('<i class="las la-cookie" id="cookieslidebg' + cookie_slide + '"  style="font-size: 3em; color: black; margin: 10px;" hidden ></i><br />');
    $("#cookieslidebg" + cookie_slide).css("position", "absolute");
    $("#cookieslidebg" + cookie_slide).css("width", "40px");
    $("#cookieslidebg" + cookie_slide).css("height", "auto");
    $("#cookieslidebg" + cookie_slide).css("top", "-1000px");
    $("#cookieslidebg" + cookie_slide).css("animation", "slideanimation 5s linear infinite");
    $("#cookieslidebg" + cookie_slide).show();

    //generate random number
    var position = Math.floor(Math.random() * randomposition); //gets a number betweeen 0 and 2000
    var animation = Math.floor(Math.random() * 30); //gets a number betweeen 0 and 30
    var padding = Math.floor(Math.random() * 100); //Gets a number betweeen 0 and 50

    $("#cookieslidebg" + cookie_slide).css("left", position); // appends the random generated number to the div element
    $("#cookieslidebg" + cookie_slide).css("padding", padding); // appends the random generated number to the div element
    $("#cookieslidebg" + cookie_slide).css("animation-delay", animation + 's'); // appends the random generated number to the div element

  } while (cookie_slide < cookiebgnumber) //do this task while the number of elements are under 50
}

//AutoClicker 
async function autoclick() {
  score += 1 * autoclickvalue;
  displayScore();
}


//Click Events
cookie.addEventListener('click', addscore); //function to do the "game important" tasks
cookie.addEventListener('click', clickanimation1); //function for the click animation
cookie.addEventListener('click', clicksound)


//!Noch nicht fertig
function addnewitem(item) {
  if (item = 'Grandma') {
    grandmadiv.classList.remove('display-none');
    grandmadiv.classList.add('display-block');
    
    grandmacost = 100;
    grandmacostoutput.innerHTML = grandmacost;
    grandmaactive = true;
    grandmacostcookie();
    grandmaactivecookie()
  }
}

function loadgrandma() {
  grandmadiv.classList.remove('display-none');
  grandmadiv.classList.add('display-block');
}


//! ////////////////////  BUY Feature ///////////////////

//Buy Autoclicker

autoclickerdiv.onclick = function () { //when the user click on the div
  if (score >= autoclickcost) { //when the score is higher then it costs
    if (autoclickitems == 5) {//if the user have bought the 5. autoclicker item, the "grandma item" will be released
      item = "Grandma";
      addnewitem(item);
    }
    if (autoclickbool == false) { //if the user buy this first time
      autoclickbool = true; //set the bool to TRUE

      score -= autoclickcost; //rechnet die kosten minus den Score

      autoclickitems = 1;
      autoclickvalue += 0.3; //set the value to 1
      cookiepersecond.innerHTML = round(autoclickvalue, 1); //display the cps
      autoclickcost *= 1.1; //set the cost to * 2
      cost_autoclicker.innerHTML = autoclickcost; //display the new cost

      autoclickerboolcookie(); //write "true" in cookies
      autoclickervaluecookie(); //write the autoclicker value in cookies
      autoclickercostcookie(); //write the new cost of autoclicker in cookies
      autoclickitemscookie();//write the item that the user have into cookies
      displayScore();

      item = "autoclicker"; //set the value to ="autoclicker"
      buy(item); //trigger the function with the value on line above

    }
    else { //if the bool is already true
      score -= autoclickcost; //calculates the costs minus the score

      autoclickvalue += 0.3;
      cookiepersecond.innerHTML = round(autoclickvalue, 1);
      autoclickcost *= 1.1;
      cost_autoclicker.innerHTML = parseInt(autoclickcost);
      autoclickitems++;

      autoclickervaluecookie();
      autoclickercostcookie();
      autoclickitemscookie();
      displayScore();

      item = "Autoclicker";
      buy(item);
    }
  } else {
    nocookies();
  }
}

if (grandmaactive != 'false') {
  grandmadiv.onclick = function () {

    if (score >= grandmacost) {
      score -= grandmacost;

      autoclickvalue += 1.5;
      cookiepersecond.innerHTML = round(autoclickvalue, 1);
      grandmacost = grandmacost * 2;
      grandmacostoutput.innerHTML = parseInt(grandmacost);
      grandmaitems++;

      autoclickervaluecookie();
      grandmacostcookie();
      grandmaitemscookie();
      displayScore();

      item = "Grandma";
      buy(item);
    } else {
      nocookies();
    }
  }
}

function nocookies() {
  error = "You don't have enough cookies";
  buyederror.classList.add('buyed-animate');
  buyederror.innerHTML = error;

  setTimeout(async function () { buyederror.classList.remove('buyed-animate'); }, 4000);
}

function buy(item) {
  buyeddiv.classList.add('buyed-animate');
  buyedoutput.innerHTML = item;
  setTimeout(async function () { buyeddiv.classList.remove('buyed-animate'); }, 4000);
}


// COOKIES 

async function scorecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'score=' + score + ';expires=' +
    a.toGMTString() + ';';
}

async function autoclickerboolcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'autoclickerbool=' + autoclickbool + ';expires=' +
    a.toGMTString() + ';';
}

async function autoclickervaluecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'autoclickervalue=' + autoclickvalue + ';expires=' +
    a.toGMTString() + ';';

}

async function autoclickercostcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'autoclickercost=' + autoclickcost + ';expires=' +
    a.toGMTString() + ';';
}

async function autoclickitemscookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'autoclickeritems=' + autoclickitems + ';expires=' +
    a.toGMTString() + ';';
}

async function grandmacostcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'grandmacost=' + grandmacost + ';expires=' +
    a.toGMTString() + ';';
}

async function grandmaitemscookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'grandmaitems=' + grandmaitems + ';expires=' +
    a.toGMTString() + ';';
}

async function grandmaactivecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'grandmaactive=' + grandmaactive + ';expires=' +
    a.toGMTString() + ';';
}


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//  If somewhere are spelling errors or something is not that good explained
//  pls write a Issuesmessage on github under 
//  https://github.com/Mittelblut9/MyOpenSourcePorjects/issues
//
//  If you find errors I would be very grateful 
//  if you send the error-free version with a pull request to my repositories. 
//  Everyone after you would be very grateful to you.
//
//  Feedback? Send it also to the issues page with the label "feedback"!
//

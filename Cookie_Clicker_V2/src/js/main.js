/**********************
 * Author: www.Blackdayz.de
 * 
 * MIT Open Source
 * 
 * A very basic Cookie Clicker for your Website.
 * You can paste it e.g on a Error Page like 404, for a homework or whatever. Feel free and have fun!
 * 
/**********************/

var VERSION = "0.0.2";
var AUTHOR = "www.blackdayz.de";
var LICENSE = "MIT Open Source";
var LASTUPDATE = "16.11.2020";
var CHANGELOG = "09.11.2020 - Release of the Cookie Clicker made with JavaScript";
CHANGELOG += "\n";
CHANGELOG += "\n16.11.2020";
CHANGELOG += "\n- Added Sound Control";
CHANGELOG += "\n- Added 2 new Items (grandma (*1.5 auto click), (miner (*1,5 cookie per click))";
CHANGELOG += "\n- Prices adjusted";
CHANGELOG += "\n- Mobile Responsive fixes";
CHANGELOG += "\n- Bug Fixes";

//! System-relevant functions //

//Get the Value of the cookie(s)
function getCookieValue(a) {
  const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

//Rounds up to x decimal places
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

//Change the Position for the background cookies for the given client width
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
var volumeoff = getCookieValue("volumeoff"); //volume off bool
var autoclickbool = getCookieValue("autoclickerbool"); //its true on first buy
var autoclickvalue = round(getCookieValue("autoclickervalue"), 1); //How much cookies you gain per s
var autoclickcost = parseInt(getCookieValue("autoclickercost")); //The cost of the autoclicker
var autoclickitems = parseInt(getCookieValue("autoclickeritems")); //The number of autoclicker items 

var grandmacost = parseInt(getCookieValue("grandmacost")); //The cost of the "grandma" item
var grandmaactive = getCookieValue("grandmaactive"); //grandma bool
var grandmaitems = parseInt(getCookieValue("grandmaitems")); //The number of gramdma items


var cookiesperclick = round(getCookieValue("cookiesperclick"), 1); //How much cookies per click
var minerscost = parseInt(getCookieValue("minerscost")); //The cost of the miners
var minersactive = getCookieValue("minersactive"); //miners bool
var minersitems = parseInt(getCookieValue("minersitems")); //The number of mineritems


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//all important DIV elements
var cookie = document.getElementById('cookie-svg'); //The Cookie
var result_output = document.getElementById('ergebnis-output'); // The div element with the score
var body = document.getElementsByTagName("BODY")[0]; // Tag "Body"
var clickaudio = document.getElementById('cookieclicksound'); //Click Sound
var cookiepersecond = document.getElementById('autoclick-output'); //Cookie Score output div
var volume_off = document.getElementById('volume-off'); //Sound on Button
var volume_on = document.getElementById('volume-on'); //Sound off Button


var buyederror = document.getElementById('error');//not enough cookies div
var buyedoutput = document.getElementById('buyed-content');//Item bought output
var buyeddiv = document.getElementById('buyed');//item bought div
//All "Buy" divs
var cost_autoclicker = document.getElementById('cost-autoclicker'); //Output for the Cost of the autoclicker
var autoclickerdiv = document.getElementById('autoclicker'); //autoclicker div for onclick events

var grandmadiv = document.getElementById('grandma'); //grandma div for onclick events
var grandmacostoutput = document.getElementById("cost-grandma");//Output for the Cost of the "grandma"

var minersdiv = document.getElementById('miners'); //miners div for onclick events
var minerscostoutput = document.getElementById('cost-miners');//Output for the Cost of the miners


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//If the user press f12
body.addEventListener('keydown', function (event) {
  if (event.keyCode === 123) {
    console.log("|----A very easy Cookie Clicker using Javascript----|");
    console.log("Version: " + VERSION);
    console.log("Author " + AUTHOR);
    console.log("Last Update " + LASTUPDATE);
    console.log(" ");
    console.log("%cCHANGELOG:", "font-size:1.4em; font-weight:900; color:red");
    console.log(CHANGELOG);
    console.log(" ");
    console.log("|----Please buy real cookies instead of cheating here!----|");
  }
});

//Data that its important to load at the all beginning
body.onload = function () {

  //Check if Cookies are blocked
  cookievalue = 123;
  checkcookie();
  //

  //Check if the Cookie was set
  if (getCookieValue("cookievalue") == '') {
    body.innerHTML = "<span style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3em;font.weight:900;'>You block Cookies! To play the game, unblock cookies on this Website!</span>";
    body.innerHTML += "<br /> <span style='position:absolute;right:0;bottom:0;font-size:1.4em;font-weight:900;'>You don't block Cookies? Write an Issue on <a style='color: black; text-decoration:underline;' href='https://github.com/Mittelblut9/MyOpenSourceProjects/issues' target='_blank' rel='noopener'>GitHub!</a>";
  }

  //Volume Control
  volumeoffcookie();
  if(volumeoff == '') {
    clickaudio.volume = 0.2; //Click Audio Volume: 20%
    volume_on.classList.add('display-none');
    volume_off.classList.remove('display-none');
  }
  else if(volumeoff == 'true') {
    clickaudio.volume = 0; //Click Audio Volume: 0%
    volume_on.classList.remove('display-none');
    volume_off.classList.add('display-none');
  }
  else if(volumeoff == 'false') {
    clickaudio.volume = 0.2; //Click Audio Volume: 20%
    volume_on.classList.add('display-none');
    volume_off.classList.remove('display-none');
  }

  if (isNaN(score)) { //if the cookie is NaN
    result_output.innerHTML = '0';
    score = 0;
    scorecookie();
  }
  else {
    result_output.innerHTML = score; //display the score
    cookie_slide_bg();//animated background function
  }
  if (isNaN(autoclickcost)) {//if the autoclickcost is NaN
    autoclickcost = 30;
  }
  if (isNaN(autoclickvalue)) {//if the autoclickvalue is NaN
    autoclickvalue = 0;
    autoclickervaluecookie(); //Write the value into cookies
  }
  if (grandmaactive == 'true') { //Load the grandma div if its true
    loadgrandma();
    displayScore();
  }
  if (minersactive == 'true') {//Load the miner div if its true
    loadminers();
    displayScore();
  }
  if (isNaN(grandmaitems)) { //if the grandmaitems is NaN
    grandmaitems = 0;
  }
  if (cookiesperclick == 0) { 
    cookiesperclick = 1;
    cookiesperclickcookie(); //write the var into cookies
  }
  if (isNaN(minersitems)) { //if the minersitems is NaN
    minersitems = 0;
    minersitemscookie();
  }

  cookiepersecond.innerHTML = autoclickvalue;//display the cookie per second onload

  //Shop
  cost_autoclicker.innerHTML = autoclickcost;//display the cost for the autoclicker onload

  minerscostoutput.innerHTML = minerscost; //display the cost for the miners onload
  // \\
}

volume_off.onclick = function() { //Onclick event to mute the sound
  clickaudio.volume = 0;
  volumeoff = true;
  volume_on.classList.remove('display-none');
  volume_off.classList.add('display-none');
  volumeoffcookie();
};
volume_on.onclick = function() { //Onclick event to unmute the sound
  clickaudio.volume = 0.2;
  volumeoff = false;
  volume_on.classList.add('display-none');
  volume_off.classList.remove('display-none');
  volumeoffcookie();
}


//function to play the sound
function clicksound() {
  //play the click sound
  clickaudio.play();
}

// Display the score after eachclick
function displayScore() {
  result_output.innerHTML = parseInt(score);
  grandmacostoutput.innerHTML = parseInt(grandmacost);
  minerscostoutput.innerHTML = parseInt(minerscost);
  scorecookie();
}
// the number of score gets 1+
function addscore() {
  score += round(cookiesperclick, 1);
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
  $("#Cookie").append('<div id="plus1-' + plus1 + '"  style="font-size: 2em; pointer-events: none; z-index: 1;" hidden>+' + round(cookiesperclick, 1) + '</div>');
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
function cookie_slide_bg() {
  do {
    cookie_slide++;//Value "Cookie Slide guideline (Background animation)"

    //generate a div - each of them have an other id
    $("#cookies-bg").append('<i class="las la-cookie" id="cookieslidebg' + cookie_slide + '"  style="font-size: 3em; color: black; margin: 10px;" hidden ></i><br />');
    $("#cookieslidebg" + cookie_slide).css("position", "absolute");
    $("#cookieslidebg" + cookie_slide).css("width", "40px");
    $("#cookieslidebg" + cookie_slide).css("height", "auto");
    $("#cookieslidebg" + cookie_slide).css("top", "-1000px");
    $("#cookieslidebg" + cookie_slide).css("white-space", "break-spaces");
    $("#cookieslidebg" + cookie_slide).css("animation", "slideanimation 5s linear infinite");
    $("#cookieslidebg" + cookie_slide).show();

    //generate random number
    var position = Math.floor(Math.random() * randomposition); //gets a number betweeen 0 and 2000
    var animation = Math.floor(Math.random() * 100); //gets a number betweeen 0 and 50
    var padding = Math.floor(Math.random() * 100); //Gets a number betweeen 0 and 100
    var topposition = Math.floor(Math.random() * 300); //Gets a number betweeen 0 and 100

    $("#cookieslidebg" + cookie_slide).css("left", position + 'px'); // appends the random generated number to the div element
    $("#cookieslidebg" + cookie_slide).css("padding", padding + 'px'); // appends the random generated number to the div element
    $("#cookieslidebg" + cookie_slide).css("animation-delay", animation + 's'); // appends the random generated number to the div element


  } while (cookie_slide < cookiebgnumber) //do this task while the number of elements are under 50
}

//AutoClicker 
function autoclick() {
  score += 1 * autoclickvalue;
  displayScore();
}

//Click Events
cookie.addEventListener('click', addscore); //function to do the "game important" tasks
cookie.addEventListener('click', clickanimation1); //function for the click animation
cookie.addEventListener('click', clicksound);//function for the click sound


function addnewitem(item) { //function for all new items
  if (item == 'Grandma') { //item "grandma" added
    grandmadiv.classList.remove('display-none');
    grandmadiv.classList.add('display-block');

    grandmacost = 100;
    grandmacostoutput.innerHTML = grandmacost;
    grandmaactive = true;
    grandmacostcookie();
    grandmaactivecookie()
  }
  if (item == 'Miners') { //item "miners" added
    minersdiv.classList.remove('display-none');
    minersdiv.classList.add('display-block');

    minerscost = 500;
    minerscostoutput.innerHTML = minerscost;
    minersactive = true;
    minerscostcookie();
    minersactivecookie()
  }
}

function loadgrandma() { //function to load the grandma div
  grandmadiv.classList.remove('display-none');
  grandmadiv.classList.add('display-block');
}

function loadminers() { //function to load the miners div
  minersdiv.classList.remove('display-none');
  minersdiv.classList.add('display-block');
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
      autoclickbool = 'true'; //set the bool to TRUE

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

      item = "Autoclicker"; //set the value to ="autoclicker"
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
  grandmadiv.onclick = function () { //onclick event to buy one grandma
    if (grandmaitems == 5) { //if the items is 5 to add the new item
      item = "Miners";
      addnewitem(item);
    }
    if (score >= grandmacost) {
      score -= grandmacost;

      autoclickvalue += 1.5;
      cookiepersecond.innerHTML = round(autoclickvalue, 1);
      grandmacost *= 1.2;
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

if (minersactive != 'false') {
  minersdiv.onclick = function () { //onclick event to buy one miner

    if (score >= minerscost) {
      score -= minerscost;

      cookiesperclick *= 1.5;
      minerscost *= 1.5;
      minerscostoutput.innerHTML = parseInt(minerscost);
      minersitems++;

      cookiesperclickcookie();
      minerscostcookie();
      minersitemscookie();
      displayScore();

      item = "Miners";
      buy(item);
    } else {
      nocookies();
    }
  }
}

function nocookies() { //function when the user have no cookies
  error = "You don't have enough cookies";
  buyederror.classList.add('buyed-animate');
  buyederror.innerHTML = error;

  setTimeout(async function () { buyederror.classList.remove('buyed-animate'); }, 4000);
}

function buy(item) { //function when the user buyed the item
  buyeddiv.classList.add('buyed-animate');
  buyedoutput.innerHTML = item;
  setTimeout(async function () { buyeddiv.classList.remove('buyed-animate'); }, 4000);
}


// COOKIES 

async function checkcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'cookievalue=' + cookievalue + ';expires=' +
    a.toGMTString() + ';';
}

async function volumeoffcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'volumeoff=' + volumeoff + ';expires=' +
    a.toGMTString() + ';';
}

async function scorecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'score=' + parseInt(score) + ';expires=' +
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
  document.cookie = 'autoclickervalue=' + round(autoclickvalue, 1) + ';expires=' +
    a.toGMTString() + ';';

}

async function autoclickercostcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'autoclickercost=' + parseInt(autoclickcost) + ';expires=' +
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
  document.cookie = 'grandmacost=' + parseInt(grandmacost) + ';expires=' +
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

async function minerscostcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'minerscost=' + parseInt(minerscost) + ';expires=' +
    a.toGMTString() + ';';
}

async function minersitemscookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'minersitems=' + minersitems + ';expires=' +
    a.toGMTString() + ';';
}

async function minersactivecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'minersactive=' + minersactive + ';expires=' +
    a.toGMTString() + ';';
}

async function cookiesperclickcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'cookiesperclick=' + round(cookiesperclick, 1) + ';expires=' +
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

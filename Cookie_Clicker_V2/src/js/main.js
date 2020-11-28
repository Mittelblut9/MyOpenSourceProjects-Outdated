/**********************
 * Author: www.Blackdayz.de
 * 
 * MIT Open Source
 * 
 * A very basic Cookie Clicker for your Website.
 * You can paste it e.g on a Error Page like 404, for a homework or whatever. Feel free and have fun!
 * 
/**********************/

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


function countDigits(i) {
  return (i + "").length;
}
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
var autoclickvaluemax = 1000000000000000000000;
var autoclickcost = getCookieValue("autoclickercost"); //The cost of the autoclicker
var autoclickitems = parseInt(getCookieValue("autoclickeritems")); //The number of autoclicker items 

var grandmacost = getCookieValue("grandmacost"); //The cost of the "grandma" item
var grandmaactive = getCookieValue("grandmaactive"); //grandma bool
var grandmaitems = parseInt(getCookieValue("grandmaitems")); //The number of gramdma items


var cookiesperclick = round(getCookieValue("cookiesperclick"), 1); //How much cookies per click
var minerscost = getCookieValue("minerscost"); //The cost of the miners
var minersactive = getCookieValue("minersactive"); //miners bool
var minersitems = parseInt(getCookieValue("minersitems")); //The number of mineritems

var wizardactive = getCookieValue("wizardactive");
var wizardcost = getCookieValue("wizardcost");
var wizarditems = parseInt(getCookieValue("wizarditems"));
var wizardvalue = parseInt(getCookieValue("wizardvalue"));

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//all important DIV elements
var cookie = document.getElementById('cookie-svg'); //The Cookie
var result_output = document.getElementById('ergebnis-output'); // The div element with the score
var body = document.getElementsByTagName("BODY")[0]; // Tag "Body"
var clickaudio = document.getElementById('cookieclicksound'); //Click Sound
var cookiepersecond = document.getElementById('autoclick-output'); //Cookie Score output div
var volume_off = document.getElementById('volume-off'); //Sound on Button
var volume_on = document.getElementById('volume-on'); //Sound off Button
var statsbutton = document.getElementById('profile-button'); //Button to see the own stats
var statsclose = document.getElementById('profile-close');

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

var wizarddiv = document.getElementById('wizard');
var wizardcost_output = document.getElementById('cost-wizard');

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//If the user press space or enter
body.addEventListener('keydown', function (event) {
  if (event.keyCode === 32 || event.keyCode === 13) {
    score++;
    cookie_click();
    displayScore();
    clickanimation1(600);
    clicksound();
  }
});

//Check if Cookies are blocked
cookievalue = 123;
checkcookie();
//


function bodyload() {
  var infoscript = document.createElement('script');
  infoscript.type = 'module';
  infoscript.src = 'src/js/info.js';
  document.getElementsByTagName('body')[0].appendChild(infoscript);

  //Check if the Cookie was set, if not print out some text
  if (getCookieValue("cookievalue") == '') {
    body.innerHTML = "<span style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3em;font.weight:900;'>You block Cookies! To play the game, unblock cookies on this Website!</span>";
    body.innerHTML += "<br /> <span style='position:absolute;right:0;bottom:0;font-size:1.4em;font-weight:900;'>You don't block Cookies? Write an Issue on <a style='color: black; text-decoration:underline;' href='https://github.com/Mittelblut9/MyOpenSourceProjects/issues' target='_blank' rel='noopener'>GitHub!</a>";
  }

  //Volume Control
  volumeoffcookie();
  if (volumeoff == '') {
    clickaudio.volume = 0.2; //Click Audio Volume: 20%
    volume_on.classList.add('display-none');
    volume_off.classList.remove('display-none');
  }
  else if (volumeoff == 'true') {
    clickaudio.volume = 0; //Click Audio Volume: 0%
    volume_on.classList.remove('display-none');
    volume_off.classList.add('display-none');
  }
  else if (volumeoff == 'false') {
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
  }
  if (autoclickcost === 'Sold Out') {
    cost_autoclicker.innerHTML = autoclickcost;
  }
  else if (isNaN(autoclickcost) || autoclickcost < 30) {//if the autoclickcost is NaN
    autoclickcost = 30;
    autoclickercostcookie();
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
  if (wizardactive == 'true') {
    loadwizard();
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
  if (isNaN(wizarditems)) { //if the minersitems is NaN
    wizarditems = 0;
    wizarditemscookie();
  }

  cookiepersecond.innerHTML = autoclickvalue;//display the cookie per second onload

  //Shop
  cost_autoclicker.innerHTML = autoclickcost;//display the cost for the autoclicker onload

  minerscostoutput.innerHTML = minerscost; //display the cost for the miners onload
  // \\

  if (autoclickvalue >= autoclickvaluemax) {
    cookiepersecond.innerHTML = " too much ";
  }

  cookie_slide_bg();//animated background function
  checkitemscost();
  minimizenumbers();
}

volume_off.addEventListener( 'click', function () { //Onclick event to mute the sound
  clickaudio.volume = 0;
  volumeoff = true;
  volume_on.classList.remove('display-none');
  volume_off.classList.add('display-none');
  volumeoffcookie();
});
volume_on.addEventListener('click', function () { //Onclick event to unmute the sound
  clickaudio.volume = 0.2;
  volumeoff = false;
  volume_on.classList.add('display-none');
  volume_off.classList.remove('display-none');
  volumeoffcookie();
});


//function to play the sound
function clicksound() {
  //play the click sound
  clickaudio.play();
}


// Display the score after eachclick
function displayScore() {
  result_output.innerHTML = parseInt(score);
  grandmacostoutput.innerHTML = grandmacost;
  minerscostoutput.innerHTML = minerscost;
  wizardcost_output.innerHTML = wizardcost;


  checkitemscost();
  minimizenumbers();
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
  if (event.keyCode === 32 || event.keyCode === 13) {
    $("#plus1-" + plus1).css("top", e - 100);
    $("#plus1-" + plus1).css("left", e + 210);
  }
  else {
    $("#plus1-" + plus1).css("top", e.clientY - 30);
    $("#plus1-" + plus1).css("left", e.clientX - 20);
  }
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

//ADD NEW ITEM //
function addnewitem(item) { //function for all new items
  if (item == 'Grandma') { //item "grandma" added
    grandmadiv.classList.remove('display-none');
    grandmadiv.classList.add('display-block');

    grandmacost = 500;
    grandmacostoutput.innerHTML = parseInt(grandmacost);
    grandmaactive = true;
    grandmacostcookie();
    grandmaactivecookie()
  }
  if (item == 'Miners') { //item "miners" added
    minersdiv.classList.remove('display-none');
    minersdiv.classList.add('display-block');

    minerscost = 2000;
    minerscostoutput.innerHTML = parseInt(minerscost);
    minersactive = true;
    minerscostcookie();
    minersactivecookie()
  }
  if (item == 'Wizard') {
    wizarddiv.classList.remove('display-none');
    wizarddiv.classList.add('display-block');

    wizardcost = 2000000000;
    wizardcost_output.innerHTML = parseInt(wizardcost);
    wizardactive = true;
    wizardvalue = 2;
    wizardcostcookie();
    wizardactivecookie();
    wizardvaluecookie();
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

function loadwizard() {
  wizarddiv.classList.remove('display-none');
  wizarddiv.classList.add('display-block');
}

//! ////////////////////  BUY Feature ///////////////////

//Buy Autoclicker

autoclickerdiv.addEventListener('click', function () { //when the user click on the div
  if (score >= autoclickcost) { //when the score is higher then it costs
    if (autoclickitems >= 5 && grandmaactive != 'true') {//if the user have bought the 5. autoclicker item, the "grandma item" will be released
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
      autoclickcost = parseInt(autoclickcost);
      cost_autoclicker.innerHTML = autoclickcost; //display the new cost

      autoclickerboolcookie(); //write "true" in cookies
      autoclickervaluecookie(); //write the autoclicker value in cookies
      autoclickercostcookie(); //write the new cost of autoclicker in cookies
      autoclickitemscookie();//write the item that the user have into cookies
      displayScore();

      item = "Autoclicker"; //set the value to ="autoclicker"
      buy(item); //trigger the function with the value on line above

      if (autoclickvalue >= autoclickvaluemax) {
        cookiepersecond.innerHTML = " too much ";
      }
    }
    else { //if the bool is already true
      score -= autoclickcost; //calculates the costs minus the score

      autoclickvalue += 0.3;
      cookiepersecond.innerHTML = round(autoclickvalue, 1);
      autoclickcost *= 1.1;
      autoclickcost = parseInt(autoclickcost);
      cost_autoclicker.innerHTML = autoclickcost;
      autoclickitems++;

      autoclickervaluecookie();
      autoclickercostcookie();
      autoclickitemscookie();
      displayScore();

      item = "Autoclicker";
      buy(item);

      if (autoclickvalue >= autoclickvaluemax) {
        cookiepersecond.innerHTML = " too much ";
      }
    }
  }else {
    nocookies();
  }
});

if (grandmaactive != 'false') {
  grandmadiv.addEventListener('click', function () { //onclick event to buy one grandma

    if (score >= grandmacost) {
      score -= grandmacost;
      autoclickvalue *= 1.1;
      cookiepersecond.innerHTML = round(autoclickvalue, 1);
      grandmacost *= 1.2;
      grandmacost = parseInt(grandmacost);
      grandmacostoutput.innerHTML = grandmacost;
      grandmaitems++;

      autoclickervaluecookie();
      grandmacostcookie();
      grandmaitemscookie();
      displayScore();

      item = "Grandma";
      buy(item);

      if (autoclickvalue >= autoclickvaluemax) {
        cookiepersecond.innerHTML = " too much ";
      }
    }else {
      nocookies();
    }

    if (grandmaitems >= 5 && minersactive == '') { //if the items is 5 to add the new item
      item = "Miners";
      addnewitem(item);
    }
  });
}

if (minersactive != 'false') {
  minersdiv.addEventListener('click', function () { //onclick event to buy one miner

    if (minersitems >= 7 && wizardactive == '') {
      item = "Wizard";
      addnewitem(item);
    }

    if (score >= minerscost) {
      score -= minerscost;

      cookiesperclick *= 1.2;
      minerscost *= 1.5;
      minerscost = parseInt(minerscost);
      minerscostoutput.innerHTML = minerscost;
      minersitems++;

      cookiesperclickcookie();
      minerscostcookie();
      minersitemscookie();
      displayScore();

      item = "Miners";
      buy(item);
    }else {
      nocookies();
    }
  });
}

if (wizardactive != 'false') {
  wizarddiv.addEventListener('click', function () { //onclick event to buy one miner

    // if(wizarditems >= 7) {
    //   item = "";
    //   addnewitem(item);
    // }

    if (score >= wizardcost) {
      score -= wizardcost;

      score *= wizardvalue;

      wizardcost *= 2;
      wizardcost = parseInt(wizardcost);
      wizardvalue *= 2.3;
      wizarditems++;

      wizarditemscookie()
      wizardvaluecookie();
      wizardcostcookie();
      checkitemscost();
      displayScore();

      item = "Wizard";
      buy(item);
    } else if (wizardcost === 'Sold Out') {
      item = "Wizard";
      soldout(item);
      displayScore();
    }
    else {
      nocookies();
    }
  });
}

function nocookies() { //function when the user have no cookies
  error = "You don't have enough cookies";
  buyederror.classList.add('buyed-animate');
  buyederror.innerHTML = error;

  setTimeout(async () => { buyederror.classList.remove('buyed-animate'); }, 4000);
}

function buy(item) { //function when the user buyed the item
  buyeddiv.classList.add('buyed-animate');
  buyedoutput.innerHTML = item;
  setTimeout(async () => { buyeddiv.classList.remove('buyed-animate'); }, 4000);
}

function soldout(item) {
  error = ("The Item " + item + " is sold out!");
  buyederror.classList.add('buyed-animate');
  buyederror.innerHTML = error;
  setTimeout(async () => { buyeddiv.classList.remove('buyed-animate'); }, 4000);
}


function minimizenumbers() {
  var z; //score devided by the high number e.g.("million")
  var c; //var z round to 2 decimal places

  //When the score is between 1 Million and 1 Billion
  if (score >= 1000000 && score < 1000000000) {
    z = score / 1000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Million";

  } else if (score >= 1000000000 && score < 1000000000000) {
    z = score / 1000000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Billion";
  } else if (score >= 1000000000000 && score < 1000000000000000) {
    z = score / 1000000000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Trillion";
  }
  else if (score >= 1000000000000000 && score < 1000000000000000000) {
    z = score / 1000000000000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Quadrillion";
  } else if (score >= 1000000000000000 && score < 1000000000000000000) {
    z = score / 1000000000000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Quintillion";
  } else if (score >= 1000000000000000000 && score < 1000000000000000000000) {
    z = score / 1000000000000000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Sextillion";
  } else if (score >= 1000000000000000000000 && score < 1000000000000000000000000) {
    z = score / 1000000000000000000000;
    c = z.toFixed(2);

    result_output.innerHTML = c + " Septillion";
  }
  else if (score >= 1000000000000000000000000) { //&& score < 1000000000000000000000000000
    z = score / 1000000000000000000000;
    c = z.toFixed(2);

    result_output.innerHTML = "Infinity";
  }
}

function checkitemscost() {
  //!Autoclicker
  if (autoclickcost >= 1000000) {
    z = autoclickcost / 1000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Million";
  }
  if (autoclickcost >= 1000000000) {
    z = autoclickcost / 1000000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Billion";
  }
  if (autoclickcost >= 1000000000000) {
    z = autoclickcost / 1000000000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Trillion";
  }
  if (autoclickcost >= 1000000000000000) {
    z = autoclickcost / 1000000000000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Quadrillion";
  }
  if (autoclickcost >= 1000000000000000000) {
    z = autoclickcost / 1000000000000000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Quintillion";
  }
  if (autoclickcost >= 1000000000000000000000) {
    z = autoclickcost / 1000000000000000000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Sextillion";
  }
  if (autoclickcost >= 1000000000000000000000000) {
    z = autoclickcost / 1000000000000000000000000;
    c = z.toFixed(2);

    cost_autoclicker.innerHTML = c + " Septillion";
  }

  //!Grandmacost

  if (grandmacost >= 1000000) {
    z = grandmacost / 1000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Million";
  }
  if (grandmacost >= 1000000000) {
    z = grandmacost / 1000000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Billion";
  }
  if (grandmacost >= 1000000000000) {
    z = grandmacost / 1000000000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Trillion";
  }
  if (grandmacost >= 1000000000000000) {
    z = grandmacost / 1000000000000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Quadrillion";
  }
  if (grandmacost >= 1000000000000000000) {
    z = grandmacost / 1000000000000000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Quintillion";
  }
  if (grandmacost >= 1000000000000000000000) {
    z = grandmacost / 1000000000000000000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Sextillion";
  }
  if (grandmacost >= 1000000000000000000000000) {
    z = grandmacost / 1000000000000000000000000;
    c = z.toFixed(2);

    grandmacostoutput.innerHTML = c + " Septillion";
  }

  //!Minerscost

  if (minerscost >= 1000000) {
    z = minerscost / 1000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Million";
  }
  if (minerscost >= 1000000000) {
    z = minerscost / 1000000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Billion";
  }
  if (minerscost >= 1000000000000) {
    z = minerscost / 1000000000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Trillion";
  }
  if (minerscost >= 1000000000000000) {
    z = minerscost / 1000000000000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Quadrillion";
  }
  if (minerscost >= 1000000000000000000) {
    z = minerscost / 1000000000000000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Quintillion";
  }
  if (minerscost >= 1000000000000000000000) {
    z = minerscost / 1000000000000000000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Sextillion";
  }
  if (minerscost >= 1000000000000000000000000) {
    z = minerscost / 1000000000000000000000000;
    c = z.toFixed(2);

    minerscostoutput.innerHTML = c + " Septillion";
  }

  if (wizarditems >= 1) {
    wizardcost = "Sold Out";
    wizardcost_output.innerHTML = wizardcost;
    wizardcostcookie();
  }
}

//!Stats DIV //

statsbutton.addEventListener('click', function () {
  document.getElementById('profile-stats').classList.add('profile-stats-show');
  statsbutton.style.transition = "0.4s ease-in-out";
  statsbutton.style.opacity = "0";
  setTimeout(() => {
    statsbutton.classList.add('display-none');
  }, 400);
  loadstats();
});
statsclose.addEventListener('click', function () {
  document.getElementById('profile-stats').classList.remove('profile-stats-show');
  statsbutton.classList.remove('display-none');
  setTimeout(() => {
    statsbutton.style.transition = "0.4s ease-in-out";
    statsbutton.style.opacity = "1";
  }, 100);
});

function loadstats() {
  document.getElementById('profile-stats-cookies').innerHTML = round(score, 2);
  document.getElementById('profile-stats-persecond').innerHTML = autoclickvalue;
  document.getElementById('profile-stats-clicker').innerHTML = autoclickitems;
  document.getElementById('profile-stats-grandma').innerHTML = grandmaitems;
  document.getElementById('profile-stats-wizard').innerHTML = wizarditems;
}



//!All Events
cookie.addEventListener('click', addscore); //function to do the "game important" tasks
cookie.addEventListener('click', clickanimation1); //function for the click animation
cookie.addEventListener('click', clicksound);//function for the click sound
body.addEventListener('load', bodyload(), false);


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

async function minerscostcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'minerscost=' + minerscost + ';expires=' +
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

async function wizardcostcookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'wizardcost=' + wizardcost + ';expires=' +
    a.toGMTString() + ';';
}

async function wizardactivecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'wizardactive=' + wizardactive + ';expires=' +
    a.toGMTString() + ';';
}

async function wizardvaluecookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'wizardvalue=' + parseInt(wizardvalue) + ';expires=' +
    a.toGMTString() + ';';
}

async function wizarditemscookie() {
  var a = new Date();
  a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365); // Valid for 1 year
  document.cookie = 'wizarditems=' + wizarditems + ';expires=' +
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

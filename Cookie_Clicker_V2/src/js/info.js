// All Information //
// I do it in a own file to minimize the main.js

var VERSION = "0.0.3";
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
CHANGELOG += "\n";
CHANGELOG += "\n18.11.2020";
CHANGELOG += "\n- Gain Cookies with Space or Enter";
CHANGELOG += "\n- All people who block cookies can't play/see this game anymore";
CHANGELOG += "\n- Added new Item (wizzard(score *2))";
CHANGELOG += "\n- Added Number Control - it wont be print as '1000000' - now it's '1.00 Million'";
CHANGELOG += "\n- (temp) Added 'Sold Out' to all items which price get in a too high level - for the future it will be the same system as the cookie score number control";
CHANGELOG += "\n- (temp) At a too high level of autoclickvalue it will print 'too much'";
CHANGELOG += "\n- Added 'sold out' animation function for all items which are 'sold out'";
CHANGELOG += "\n- Added info.js";



//If the user press f12
document.getElementsByTagName('BODY')[0].addEventListener('keydown', function (event) {
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
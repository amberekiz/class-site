// set up text to print, each item in array is new line
var aText = new Array(
"This is my great-grandmother, Mama Pinang."
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");

 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 500);
  }
 } else {
  setTimeout("typewriter()", iSpeed);
 }
}


typewriter();

var index = 0;
var backgrounds = [];

backgrounds[0] = "img/bg2.png";
backgrounds[1] = "img/bg3.png";
backgrounds[2] = "img/bg4.png";
backgrounds[3] = "img/bg5.png";
backgrounds[4] = "img/bg6.png";
backgrounds[5] = "img/bg7.png";
backgrounds[6] = "img/bg8.png";
backgrounds[7] = "img/bg9.png";
backgrounds[8] = "img/bg10.png";
backgrounds[9] = "img/bg1.png";

function changeBackground() {

  $("#wrapper").fadeOut(500, function() {
    $("#wrapper").css({
      "background-image": "url('" + backgrounds[index] + "')"
    });
    $("#wrapper").fadeIn(500, function(){
      if(index==0){
    $("#test").text("slide1");
  }
  if(index==1){
    $("#test").text("slide2");
  }
  if(index==2){
    $("#test").text("slide3");
  }
  if(index==3){
    $("#test").text("slide4");
  }
  if(index==4){
    $("#test").text("slide5");
  }
  if(index==5){
    $("#test").text("slide6");
  }
  if(index==6){
    $("#test").text("slide7");
  }
  if(index==7){
    $("#test").text("slide8");
  }
  if(index==8){
    $("#test").text("slide9");
  }
  if(index==9){
    $("#test").text("slide10");
  }
    });
  });

  index++;
  if (index > backgrounds.length-1){
    index = 0;
  }

}

$(document).ready(function() {
  setInterval(changeBackground, 10000);
});

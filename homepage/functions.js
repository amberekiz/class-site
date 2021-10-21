$('#social').click(function(){
  if ( $('#box1').css('visibility') == 'hidden' )
    $('#box1').css('visibility','visible');
  else
    $('#box1').css('visibility','hidden');
});

$('#hat').click(function(){
  if ( $('#box2').css('visibility') == 'hidden' )
    $('#box2').css('visibility','visible');
  else
    $('#box2').css('visibility','hidden');
});

$('#bookmark').click(function(){
  if ( $('#box3').css('visibility') == 'hidden' )
    $('#box3').css('visibility','visible');
  else
    $('#box3').css('visibility','hidden');
});

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var ampm = "am";

    if(h == 0){
        h = 12;
    }

    if(h > 12){
        h = h - 12;
        ampm = "pm";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + ampm;
    document.getElementById("clock").innerText = time;
    document.getElementById("clock").textContent = time;

    setTimeout(showTime, 1000);

}

showTime();

let counting;                                                       
let interval;
const alarm=document.createElement('audio');
$(alarm).attr({
  'id': 'beep',
  'src': "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
});

function startStop() {
  if(counting) {
    clearInterval(interval);
    counting = false;
    $('.startStop').html('Start');
    $('#minute').html(curMin.toString());
    $('#second').html(curSec.toString());
  } else {
    counting = true;
    $('.startStop').html('Stop');
    interval = setInterval(count, 1000);
  }
} 

function reset() {
  counting = false;
  $('.timerLabel').html('Work');
  $('#minute').html('25');
  $('#second').html('00');
  $('.sessionLength').html('25');
  $('.breakLength').html('5');
}
function count() {
  let curMin = parseInt($('#minute').html());
  let curSec = parseInt($('#second').html());  
  if(curSec > 0) {
    curSec--;
    if(curSec >= 10) {
      $('#second').html(curSec.toString());
    } else {
      $('#second').html('0' + curSec.toString());
    }
  } else if (curMin > 0) {
    $('#second').html(59);
    $('#minute').html(curMin - 1);
  } 
  else{
    if($('.timerLabel').html('Work')) {
      $('.timerLabel').html('Break');
      $('#minute').html($('.breakLength').html());
    } else {
      $('.timerLabel').html('Work');
      $('#minute').html($('.sessionLength').html());
    }
    $('#second').html('00');
    alarm.currentTime = 0;
    alarm.play();
  }
 }

function changeTime(event) {
  if(counting) 
    startStop();  
  let curLength;
  switch(event.target.id) {
    case 'session-decrement':
      curLength = parseInt($('.sessionLength').html());
      if(curLength > 1) {
        $('.sessionLength').html(curLength-1);
        $('#minute').html(curLength-1);
        $('#second').html('00');
      }
      break; 
    case 'session-increment':
      curLength = parseInt($('.sessionLength').html());
      if(curLength <60 ) {
        $('.sessionLength').html(curLength+1);
        $('#minute').html(curLength+1);
        $('#second').html('00');
      }
      break; 
      case 'break-decrement':
      curLength = parseInt($('.breakLength').html());
      if(curLength > 1) 
        $('.breakLength').html(curLength-1);
      break; 
    case 'break-increment':
      curLength = parseInt($('.breakLength').html());
      if(curLength < 60) 
        $('.breakLength').html(curLength+1);
      break; 
  }
}  

$(document).ready(function() {
  counting = false;
  $('#reset').on('click',reset); 
  $('.startStop').on('click',startStop);  
  $('.change').on('click',changeTime); 
}); 
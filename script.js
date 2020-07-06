var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var Textbox = $('#textbox');
var Content = '';

recognition.continuous = true;

recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
    Content += transcript;
    Textbox.val(Content);
};

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  console.log('Start button pressed')
  recognition.start();
});

$('#stop-btn').on('click', function(e) {
  console.log('Stop button pressed')
  recognition.stop();
});

Textbox.on('input', function() {
  Content = $(this).val();
})

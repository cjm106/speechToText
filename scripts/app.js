var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

var Textbox = $('#textbox');
var Content = '';

var recognition = new SpeechRecognition();
var selectedLanguage = 'en-GB'
recognition.continuous = true;

recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  Content += transcript;
  Textbox.val(Content);
};

$('#lang').on('change', function(e) {
  selectedLanguage = $('#lang').find(':selected').attr('value');
});

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.lang = selectedLanguage
  recognition.start();
  $('#stop-btn').attr("disabled", false)
  $('#lang').attr("disabled", true)
  $('#start-btn').attr("disabled", true)
});

$('#stop-btn').on('click', function(e) {
  recognition.stop();
  $('#stop-btn').attr("disabled", true)
  $('#lang').attr("disabled", false)
  $('#start-btn').attr("disabled", false)
});

Textbox.on('input', function() {
  Content = $(this).val();
})

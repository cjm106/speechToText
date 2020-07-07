var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

var Textbox = $('#textbox');
var Content = '';

var recognition = new SpeechRecognition();
var selectedLanguage = 'en-GB';
recognition.continuous = true;

$('#stop-btn').attr('disabled', true);
$('#copy-btn').attr('disabled', true);
$('#clear-btn').attr('disabled', true);

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

  $('#stop-btn').attr('disabled', false);
  $('#clear-btn').attr('disabled', true);
  $('#start-btn').attr('disabled', true);
  $('#copy-btn').attr('disabled', true);
  
});

$('#stop-btn').on('click', function(e) {

  recognition.stop();

  $('#stop-btn').attr('disabled', true);
  $('#start-btn').attr('disabled', false);
  $('#copy-btn').attr('disabled', false);
  $('#clear-btn').attr('disabled', false);

});

Textbox.on('input', function() {

  Content = $(this).val();

});

$('#copy-btn').on('click', function(e) {

  var copyText = document.createElement('textarea');

  document.body.appendChild(copyText);
  copyText.value = Content;
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);

});

$('#clear-btn').on('click', function(e) {

  Textbox.val("")

  $('#clear-btn').attr('disabled', true);
  $('#copy-btn').attr('disabled', true);

});

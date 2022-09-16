exports.handler = function (context, event, callback) {
  const VoiceResponse = require("twilio").twiml.VoiceResponse;
  const response = new VoiceResponse();
  response.enqueue("Everyone");

  console.log(response.toString());
  return callback(null, response);
};

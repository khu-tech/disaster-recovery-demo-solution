const VoiceResponse = require("twilio").twiml.VoiceResponse;
const AccessToken = require("twilio").jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const nameGenerator = require("../name_generator");
const config = require("../config");

var identity;

exports.tokenGenerator = function tokenGenerator() {
  identity = nameGenerator();

  const accessToken = new AccessToken(
    config.accountSid,
    config.apiKey,
    config.apiSecret
  );
  accessToken.identity = identity;
  const grant = new VoiceGrant({
    outgoingApplicationSid: config.twimlAppSid,
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  // Include identity and token in a JSON response
  return {
    identity: identity,
    token: accessToken.toJwt(),
  };
};

exports.voiceResponse = function voiceResponse(requestBody) {
  console.log("requestbody", requestBody);
  const queueName = requestBody.queue;
  let twiml = new VoiceResponse();

  if (queueName == "Everyone") {
    let dial = twiml.dial();

    // This will connect the caller with your Twilio.Device/client
    dial.queue(queueName);
  } else {
    twiml.say("Dial to a wrong queue!");
  }

  return twiml.toString();
};

/**
 * Checks if the given value is valid as phone number
 * @param {Number|String} number
 * @return {Boolean}
 */
function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}

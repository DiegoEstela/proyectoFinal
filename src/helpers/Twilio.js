const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_ID,
  process.env.TWILIO_AUTH_TOKEN
);

const tw = {
  from: "whatsapp:+19036023458",
  body: "nuevo usuario registrado",
  to: "+541169038632",
};

module.exports = { client, tw };

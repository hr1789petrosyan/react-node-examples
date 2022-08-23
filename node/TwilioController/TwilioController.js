exports.TwilioController = async (req, res) => {
  const AccessToken = require('twilio').jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;
  
  const dotenv = require('dotenv')
  const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const API_KEY_SID = process.env.TWILIO_API_KEY_SID
  const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
  const API_KEY_SECRET = process.env.TWILIO_API_KEY_SECRET
  const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

  dotenv.config()

  // Create an Access Token
  const accessToken = new AccessToken(
    ACCOUNT_SID,
    API_KEY_SID,
    API_KEY_SECRET
  );
  
  accessToken.identity = +req.body.identity;
  const grant = new VideoGrant();

  
  
try {
    const existedRoom = await(client.video.rooms('' + req.body.room).fetch())
    grant.room = existedRoom.uniqueName
    accessToken.addGrant(grant);  
    const jwt = accessToken.toJwt();
    return res.json({ token: jwt, room: grant.room })
} catch (error) {
  console.log(error);
}

  const room = await client.video.rooms.create({uniqueName: '' + req.body.room})
  grant.room = room.uniqueName
  accessToken.addGrant(grant);  
  const jwt = accessToken.toJwt();
  return res.json({ token: jwt, room: grant.room })
    
}
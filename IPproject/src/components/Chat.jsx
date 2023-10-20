const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;



try{
const r = await axios.put('https://api.chatengine.io/users/',
{ username: username, secret: username , firstname: username},
{headers : {"private-key": "cbd150f7-9214-4601-bc4a-ff6b77492c8b"}})
return res.status(r.status).json(r.data)
} catch(e){
  return res.status(e.response.status).json(e.response.data)
}
});



console.log('done');
app.listen(3001);
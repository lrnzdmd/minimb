const express = require("express");

const path = require("node:path");
const db = require('./db/queries')


const app = express();
const PORT = process.env.PORT || 3000;



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const messages = await db.getAllMessages()
  res.render('home', {messages: messages})
 
  
});

app.get("/new", (req, res) =>
    res.render('form'));

app.post("/new", (req, res) => {
    db.addNewMessage(req.body.user, req.body.message);
    res.redirect("/");
})

app.get("/messages/:msgid", async (req, res) => {
  const message = await db.getMessageById(req.params.msgid);
  res.render("msgInfo", { message: message[0]});
  
})










app.listen(PORT, () => console.log(`server listening on port ${PORT}!`));
const express = require("express");
const path = require("node:path");
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns')

const app = express();
const PORT = 3000;

const messages = [
    {
      id:uuidv4(),
      text: "Hello Larry!",
      user: "Lucas",
      added: format(new Date(), "Pp")
    },
    {
      id:uuidv4(),
      text: "Hello Lucas!",
      user: "Larry",
      added: format(new Date(), "Pp")
    }
  ];


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
    res.render('home', {messages: messages}));

app.get("/new", (req, res) =>
    res.render('form'));

app.post("/new", (req, res) => {
    messages.push({id: uuidv4(),text: req.body.message, user: req.body.user, added: format(new Date(), "Pp") });
    res.redirect("/");
})

app.get("/messages/:msgid", (req, res) => {
  const index = messages.findIndex(msg => msg.id === req.params.msgid);
  res.render("msgInfo", { message: messages[index]});
  
})










app.listen(PORT, () => console.log(`server listening on port ${PORT}!`));
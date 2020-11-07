const express = require("express");
const ejs = require("ejs");
const	web = express();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./cdn/db.json')
const db = low(adapter)

web.set('view engine', 'ejs')
web.get('/', (req, res) => res.render("index", {sicaklik: db.get("temp").value()}))
web.use('/cdn', express.static(__dirname + '/cdn'))

web.get('/db', (req, res) => {
  console.log("new request")
  if(!req.query.auth || req.query.auth !== "your auth token") return res.json({"error": "auth token incorrect"});
  if(!req.query.mod) return res.json({"error": "please type mod, post or get"});
  if(req.query.mod !== "post" && req.query.mod !== "get") return res.json({"error": "mod incorrect please type post or get"});
  if(req.query.mod == "post"){
    if(!req.query.id) return res.json({"error": "no query"});
    db.set("temp", req.query.id).write();
    return res.send({});
  }
  if(req.query.mod == "get"){
    return res.send({"value": db.get("temp").value()});
  }
})


web.listen(8080, function() {
	console.log("listening")
})

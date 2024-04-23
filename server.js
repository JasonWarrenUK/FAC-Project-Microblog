/* ----- SETUP ----- */
const express = require("express");
const server = express();
const staticHandler = express.static("public");
// const bodyParser = express.urlencoded();

const { home, read, write } = require("./pages.js");

const { valid, validReset } = require("./utils.js");

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
	next();
}

server.use(staticHandler);
server.use(logger);

/* ----- PAGES ----- */
const posts = [];

server.get("/", (req, res) => {
  const body = home(posts);
  res.send(body);
});

server.get("/write", (req, res) => {
	const body = write();
	res.send(body);
})

server.get("/read", (req, res) => {
	const body = read(posts);
	res.send(body);
})

/* ----- ACTIONS ----- */

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
	validReset();

	const nickname = req.body.nickname;
	if (nickname == "") {
		valid.name = false;
		valid.nameWarn = `<p>please enter your nickname</p>`;
		valid.all = false;
	}

  const message = req.body.message;
	if (message == "") {
		valid.message = false;
		valid.messageWarn = `<p>please enter a message</p>`;
		valid.all = false;
	}

  const created = Date.now();

	if (valid.all) {
		console.log(`Valid Post`);
		posts.push({ nickname, message, created });
		res.redirect("/");
	} else {
		console.log(`Invalid Post`);
		// res.status(400).redirect("/");
		const body = home(posts, req.body);
		res.status(400).send(body);
	}
});

/* ----- EXPORTS ----- */
module.exports = server;
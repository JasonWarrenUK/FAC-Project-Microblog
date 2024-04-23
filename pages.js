const { valid } = require("./utils");
const { postItem } = require( "./actions");
const { blockTitle, blockLinks } = require("./blocks");

// Pages
//** Make sure these call layout()

function home(posts, formData) {
  const title = "Goblin Chat";

  const content = `
		${blockTitle.home}

		${blockLinks.write} • ${blockLinks.read}
		
		<h2>New post</h2>

		<a href></a>

		<form method="POST">
			<p>
				<label for="nickname">Nickname</label>
				<input
					id="nickname"
					name="nickname"
					value="${formData && formData.nickname ? formData.nickname : ''}"
				>
				${valid.nameWarn}
			</p>

			<p>
				<label for="message">Message</label>
				<textarea id="message" name="message">${formData && formData.message ? formData.message : ''}</textarea>
				${valid.messageWarn}
			</p>

			<button>Send</button>
		</form>

    <h2>All posts</h2>

    <ul>
      ${posts.map(postItem).join("")}
    </ul>
  `;

  return layout(title, content);
}

function write(formData) {
  const title = "Goblin Chat";

  const content = `${blockTitle.write}

		${blockLinks.home} • ${blockLinks.read}
		
		<form method="POST">
			<p>
				<label for="nickname">Nickname</label>
				<input
					id="nickname"
					name="nickname"
					value="${formData && formData.nickname ? formData.nickname : ''}"
				>
				${valid.nameWarn}
			</p>

			<p>
				<label for="message">Message</label>
				<textarea id="message" name="message">${formData && formData.message ? formData.message : ''}</textarea>
				${valid.messageWarn}
			</p>

			<button>Send</button>
		</form>
  `;

  return layout(title, content);
}

function read(posts) {
  const title = "Goblin Chat";

  const content = `
		${blockTitle.read}

		${blockLinks.home} • ${blockLinks.write}

    <ul>
      ${posts.map(postItem).join("")}
    </ul>
  `;

  return layout(title, content);
}


// Build the Page
//** Don't call this directly from server

function layout(title, content) {
  return /*html*/ `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = { home, read, write };
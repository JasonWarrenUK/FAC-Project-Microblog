const { sanitize, valid } = require("./utils");

function home(posts, formData) {
  const title = "All posts";

  const content = /*html*/ `
    <h2>New post</h2>
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

function postItem(post) {
	// console.groupCollapsed(`Post Received`);
	// console.log(post.message);
	// console.groupEnd();

  const date = new Date(post.created).toLocaleString("en-GB");
  // const prettyDate = date.toLocaleString("en-GB");

	// console.log(`Calling Sanitize`);
	const message = sanitize(post.message);
	// console.log(`Sanitize Finished`);
	// console.log(`Received ${message}`);

  return `
    <li>
      <p>${message}</p>
      <p>—${post.nickname} | ${date}</p>
    </li>
  `;
}

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

module.exports = { home };
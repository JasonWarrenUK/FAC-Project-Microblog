// Post a Message

function postItem(post) {
	const date = new Date(post.created).toLocaleString("en-GB");

	// console.log(`Calling Sanitize`);
	const message = sanitize(post.message);

  return `
    <li>
      <p>${message}</p>
      <p>—${post.nickname} | ${date}</p>
    </li>
  `;
}
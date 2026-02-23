async function buttonFunc(message, button) {
	chrome.runtime.sendMessage(message, (res) => {
		if (res.returnCode > 0) {
			button.style.backgroundColor = "red";
		}
		else {
			button.style.backgroundColor = "green";
		}
		setTimeout( () => {
			button.style.backgroundColor = "buttonFace";
		}, 700 );
	})
}
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", async () => {
	await buttonFunc("SaveUrl", saveButton);
})

const downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", async () => {
	buttonFunc("downloadList", downloadButton);
})

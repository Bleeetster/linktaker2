const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", async () => {
	console.log("test");
	chrome.runtime.sendMessage("SaveUrl", (res) => {
		if (res.returnCode > 0) {
			saveButton.style.backgroundColor = "red";
		}
		else {
			saveButton.style.backgroundColor = "green";
		}
		setTimeout( () => {
			saveButton.style.backgroundColor = "buttonFace";
		}, 700 );
	})
})


async function buttonFunc(message, button) {
  chrome.runtime.sendMessage(message, (res) => {
    if (res.returnCode > 0) {
      button.style.backgroundColor = "red";
    }
    else {
      button.style.backgroundColor = "green";
    }
    setTimeout(() => {
      button.style.backgroundColor = "buttonFace";
    }, 700);
  })
}

const saveButton = document.getElementById("saveButton");
const downloadButton = document.getElementById("downloadButton");
const manageButton = document.getElementById("manageButton");

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ highlighted: true, lastFocusedWindow: true }).then((res) => {
    console.log(res)
    if (res.length > 1) {
      saveButton.textContent = "Save selected"
      saveButton.addEventListener("click", async () => {
        await buttonFunc("SaveUrls", saveButton);
      })
    } else
      saveButton.addEventListener("click", async () => {
        await buttonFunc("SaveUrl", saveButton);
      })
  })
})

downloadButton.addEventListener("click", async () => {
  await buttonFunc("downloadList", downloadButton);
})

manageButton.addEventListener("click", async () => {
  await chrome.windows.create({
    type: "popup",
    url: "storage-manager.html",
    width: 350,
    height: 500,
    focused: true
  })
})

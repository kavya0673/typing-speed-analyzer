// Elements
const customText = document.getElementById("customText");
const generateLinkBtn = document.getElementById("generateLinkBtn");
const testSentence = document.getElementById("testSentence");
const inputBox = document.getElementById("inputBox");
const startBtn = document.getElementById("startBtn");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const results = document.getElementById("results");

let startTime;

// Load text from URL parameter if exists
const urlParams = new URLSearchParams(window.location.search);
const textFromURL = urlParams.get("text");
if (textFromURL) {
  const decoded = decodeURIComponent(textFromURL);
  testSentence.textContent = decoded;
  inputBox.disabled = false;
}

// Generate shareable link
generateLinkBtn.addEventListener("click", () => {
  const text = customText.value.trim();
  if (!text) { alert("Please paste some text!"); return; }
  const encoded = encodeURIComponent(text);
  const link = `${window.location.origin}${window.location.pathname}?text=${encoded}`;
  prompt("Copy this shareable link:", link);
});

// Start typing test
startBtn.addEventListener("click", () => {
  const text = testSentence.textContent || customText.value.trim();
  if (!text) { alert("No text available for test!"); return; }

  testSentence.textContent = text;
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();
  startTime = new Date().getTime();
  checkBtn.disabled = false;
  results.textContent = "";
});

// Check results
checkBtn.addEventListener("click", () => {
  const typedText = inputBox.value;
  const timeTaken = (new Date().getTime() - startTime) / 1000;
  const wordCount = testSentence.textContent.split(" ").length;
  const wpm = (wordCount / timeTaken) * 60;

  // Mistakes
  let mistakes = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== testSentence.textContent[i]) mistakes++;
  }
  mistakes += Math.abs(testSentence.textContent.length - typedText.length);
  const accuracy = Math.max(0, 100 - (mistakes / testSentence.textContent.length * 100));

  results.innerHTML = `
    ⏱ Time: ${timeTaken.toFixed(2)}s <br>
    💨 Speed: ${wpm.toFixed(2)} WPM <br>
    ❌ Mistakes: ${mistakes} <br>
    ✅ Accuracy: ${accuracy.toFixed(2)}%
  `;
});

// Reset
resetBtn.addEventListener("click", () => {
  inputBox.value = "";
  inputBox.disabled = true;
  testSentence.textContent = "";
  results.textContent = "";
  checkBtn.disabled = true;
});

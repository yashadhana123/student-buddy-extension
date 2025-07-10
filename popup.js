document.getElementById("solveBtn").addEventListener("click", async () => {
  const question = document.getElementById("question").value;
  const resultEl = document.getElementById("result");
  const loadingEl = document.getElementById("loading");

  resultEl.textContent = "";
  loadingEl.classList.remove("hidden");

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCucAy25vCnG6tIjzE5IGxp1-lGZECaoyU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Solve and explain this: ${question}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("Gemini Flash Response:", data);

    if (data.candidates && data.candidates.length > 0) {
      resultEl.textContent = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      resultEl.textContent = "❌ Gemini API Error: " + data.error.message;
    } else {
      resultEl.textContent = "❌ Unexpected Gemini response. See console.";
    }

  } catch (error) {
    console.error("Gemini Flash JS Error:", error);
    resultEl.textContent = "❌ JS Error: " + error.message;
  }

  loadingEl.classList.add("hidden");
});

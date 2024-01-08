// // script.js
function generateGeminiContent(query) {
  const apiKey = "AIzaSyC4Plq9i7e6bHLLeZ8Tl0EHBMU0c6a2hAY"; // Replace with your actual API key
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: query,
          },
        ],
      },
    ],
  };

  return fetch(geminiApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function searchGemini() {
  const query = document.getElementById("searchQuery").value;

  if (query.trim() === "") {
    alert("Please enter a search query.");
    return;
  }

  generateGeminiContent(query).then((data) => {
    displayResults(data);
  });
}

function displayResults(results) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  if (results && results.candidates && results.candidates.length > 0) {
    results.candidates.forEach((candidate) => {
      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0
      ) {
        const generatedText = candidate.content.parts[0].text;
        resultDiv.innerHTML += `<p>${generatedText}</p>`;
      } else {
        resultDiv.innerHTML += "<p>No results found.</p>";
      }
    });
  } else {
    resultDiv.innerHTML = "<p>No results found.</p>";
  }
}

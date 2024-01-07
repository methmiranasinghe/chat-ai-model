// script.js

function searchGemini() {
  const query = document.getElementById("searchQuery").value;

  if (query.trim() === "") {
    alert("Please enter a search query.");
    return;
  }

  const apiKey = "AIzaSyC4Plq9i7e6bHLLeZ8Tl0EHBMU0c6a2hAY"; // Replace with your actual API key
  const geminiApiUrl = `https://www.googleapis.com/gemini/v1/search?q=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  fetch(geminiApiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayResults(results) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  if (results.items && results.items.length > 0) {
    results.items.forEach((item) => {
      const snippet = item.snippet || "";
      resultDiv.innerHTML += `<p>${snippet}</p>`;
    });
  } else {
    resultDiv.innerHTML = "<p>No results found.</p>";
  }
}

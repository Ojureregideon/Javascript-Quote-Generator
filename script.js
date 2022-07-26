const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show New Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // To Check if Author field is blank and replace it with "Unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine the styling
    if (quote.text.length > 120) {
        authorText.classList.add("long-quote");
    } else {
        authorText.classList.remove("long-quote");
    }
    // Set the quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response  = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes);
        newQuote();
    } catch (error) {
      // Catch Error Here
    }
}

// To Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blanck");
}

// Eent Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Load
getQuotes();

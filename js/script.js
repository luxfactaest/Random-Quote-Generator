var quotes = [
  {
    quote: "You can't believe everything you read on the Internet.",
    source: "Abraham Lincoln",
    citation: "The Gettysburg Address",
    year: 1984,
    tags: [" humor"]
  },
  {
    quote: "In modern war...you will die like a dog for no good reason.",
    source: "Ernest Hemingway",
    citation: "Notes on the Next War",
    year: 1935,
    tags: [" war", " death", " dogs"]
  },
  {
    quote: "And then everyone died. The End.",
    source: "George R.R. Martin",
    citation: "A Dream of Spring",
    year: 2096,
    tags: [" humor", " literature", " ASOIAF"]
  },
  {
    quote: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.",
    source: "J.K. Rowling",
    citation: "Harry Potter and the Goblet of Fire",
    year: 2000,
    tags: [" harry potter", " decency"]
  },
  {
    quote: "Never put off till tomorrow what may be done day after tomorrow just as well.",
    source: "Mark Twain",
    tags: [" humor", " procrastination"]
  },
  {
    quote: "Very sorry can't come. Lie follows by post.",
    source: "Lord Charles Beresford",
    tags: [" humor"]
  },
  {
    quote: "What a lucky man I am for marrying a girl like Emily.",
    source: "Adam Kelm",
    year: 2017,
    tags: [" love", " puppies"]
  }
];

var usedQuotes = [];
var randomQuote;


// Generates a random hex value for background color
function generateRandomHex() {
  // Given a max decimal value of 16777215 (hex value ffffff), generate a random
  // number inclusive of max. Convert result into a string of hex values.
  var randomHex = Math.floor(Math.random() * 16777216).toString(16);
  while (randomHex.length < 6) {
    // For hex values shorter than 6 digits, add leading zeros to string.
    randomHex = "0" + randomHex;
  }
  randomHex = '#' + randomHex;
  return randomHex;
}

// Pulls a random quote object from the quotes array
function getRandomQuote() {
  if (quotes.length > 0) {
    randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteIndex = quotes.indexOf(randomQuote);
    // Remove used quote from quotes array
    quotes.splice(quoteIndex,1);
    // Push used quote to usedQuotes array
    usedQuotes.push(randomQuote);
  } else {
    // If quotes array is empty, refill it with data from usedQuotes.
    quotes = usedQuotes.slice();
    // Then clear all data from usedQuotes.
    usedQuotes = [];
    // Finally, restart the function to begin the process over again.
    getRandomQuote();
  }
}

// Given a random quote object, create an HTML string with values pulled from the random quote object.
function printQuote() {
  getRandomQuote();
  // When the "show another quote" button is clicked, the interval timer is cleared...
  window.clearInterval(intervalID);
  // Then the interval timer is immediately reset.
  intervalID = window.setInterval(printQuote, 20000);
  var setQuotePrintout = '<p class="quote">' + randomQuote.quote + '</p>';
  setQuotePrintout += '<p class="source">' + randomQuote.source;
  // If citation, year, or tags values are present, add those to the string. Otheriwse, ignore properties.
  if (randomQuote.citation) {
    setQuotePrintout += '<span class="citation">' + randomQuote.citation + '</span>';
  }
  if (randomQuote.year) {
    setQuotePrintout += '<span class="year">' + randomQuote.year + '</span>';
  }
  setQuotePrintout += '</p>';
  if (randomQuote.tags) {
    setQuotePrintout += '<p class="tags">' + randomQuote.tags + '</p>';
  }
  // Replace contents of quote-box div with the new HTML string.
  document.getElementById('quote-box').innerHTML = setQuotePrintout;
  // Log the current quote to the console
  console.log(randomQuote.quote);
  // Each time a new quote is printed, the background color changes to a randomly selected value.
  document.body.style.backgroundColor = generateRandomHex();
}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var intervalID = window.setInterval(printQuote, 20000);
//setInterval(function() {printQuote();}, 20000);

printQuote();


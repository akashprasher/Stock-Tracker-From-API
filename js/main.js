// Fetching Data From API
var apiUrl =
	"https://www.alphavantage.co/query?function=OVERVIEW&symbol=GME&apikey=TB44BTAI1KG68RMV";

fetch(apiUrl)
	.then((data) => data.json())
	.then((data) => console.log(data));

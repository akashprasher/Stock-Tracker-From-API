// Fetching Data From API
// var apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=GME&apikey=TB44BTAI1KG68RMV";
// var apiUrl = "../api_local_data.json";

const queryString = window.location.search; //?s={symbol}
comSymbol = queryString.substring(3, queryString.length).toUpperCase();
var apiUrl =
	"https://www.alphavantage.co/query?function=OVERVIEW&symbol=" +
	comSymbol +
	"&apikey=TB44BTAI1KG68RMV";
if (comSymbol.length < 1) {
	comSymbol = undefined;
}

var companyName;

if (comSymbol !== undefined) {
	fetch(apiUrl)
		.then((data) => data.json())
		.then((data) => {
			// console.log(data.Description);
			document.getElementById("com-code").innerText = comSymbol;
			document.getElementById("company-name").innerHTML = data.Name;

			document.getElementById("company-description").innerHTML =
				data.Description;
			companyName = data.Name;
			console.log(companyName);
			ftCnt(companyName);
		});
	document.getElementById("default").style.display = "none";
} else {
	companyName = "Nothing 😂";
	document.getElementById("details").style.display = "none";
	document.getElementById("default").style.display = "block";
	ftCnt(companyName);
}

// Chart.js Below
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
	type: "bar",
	data: {
		labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		datasets: [
			{
				label: "# of Votes",
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	},
});

function redirectCompany() {
	var companyID = document.getElementById("cmp-id").value;
	console.log(companyID);
	window.location.href = "?s=" + companyID;
}

document.getElementById("footer-content").style.color = "#ecf0f1";
// document.getElementById("footer-content").innerHTML = `
// <div class="text-center p-1">
//     <p class="pt-3">Data Served For ${companyName} | © Stock Tracker 🚀</p>
// </div>
// `;

function ftCnt(companyName) {
	document.getElementById("footer-content").innerHTML = `
            <div class="text-center p-1">
                <p class="pt-3">Data Served For ${companyName} | © Stock Tracker 🚀</p>
            </div>
            `;
}

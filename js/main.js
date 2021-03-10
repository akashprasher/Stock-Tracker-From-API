const queryString = window.location.search; //?s={symbol}
comSymbol = queryString.substring(3, queryString.length).toUpperCase();

var baseUrl = "https://akashprasher.github.io/Stock-Tracker-From-API/";
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
			document.getElementById("com-code").innerText = comSymbol;
			document.getElementById("company-name").innerHTML = data.Name;

			document.getElementById("company-description").innerHTML =
				data.Description;
			companyName = data.Name;
			ftCnt(companyName);

			listDetailsHeading = [
				"Total Employees",
				"Exchange",
				"Sector",
				"Industry",
			];

			listDetailsParagraph = [
				data.FullTimeEmployees,
				data.Exchange,
				data.Sector,
				data.Industry,
			];

			var cardDataOne = `<div class="col-sm-6 pt-2 pb-2"> <div class="card"> <div class="card-body"> <h5 class="card-title">`;
			var cardDataTwo = `</h5> <p class="card-text">`;
			var cardDataThree = `</p> </div> </div> </div>`;
			var cardData = "";

			for (var i = 0; i < listDetailsHeading.length; i++) {
				cardData +=
					cardDataOne +
					listDetailsHeading[i] +
					cardDataTwo +
					listDetailsParagraph[i] +
					cardDataThree;
			}

			document.getElementById("valueDetails").innerHTML = cardData;
			displayChart(
				data.SharesOutstanding,
				data.SharesFloat,
				data.SharesShort,
				data.SharesShortPriorMonth
			);
		});
	document.getElementById("default").style.display = "none";
} else {
	companyName = "Nothing 😂";
	document.getElementById("details").style.display = "none";
	document.getElementById("default").style.display = "block";
	ftCnt(companyName);
}

// Chart.js Below
function displayChart(
	SharesOutstanding,
	SharesFloat,
	SharesShort,
	SharesShortPriorMonth
) {
	var ctx = document.getElementById("myChart").getContext("2d");
	var myChart = new Chart(ctx, {
		type: "polarArea",
		data: {
			labels: [
				"SharesOutstanding",
				"SharesFloat",
				"SharesShort",
				"SharesShortPriorMonth",
			],
			datasets: [
				{
					label: [""],
					data: [
						SharesOutstanding,
						SharesFloat,
						SharesShort,
						SharesShortPriorMonth,
					],
					backgroundColor: [
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
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
}

function redirectCompany() {
	var companyID = document.getElementById("cmp-id").value;
	window.location.href = "?s=" + companyID;
}

function ftCnt(companyName) {
	document.getElementById("title").innerHTML = `${companyName} Stock Tracker`;
	document.getElementById("footer-content").style.color = "#ecf0f1";
	document.getElementById("footer-content").innerHTML = `
    <div class="text-center p-1">
        <p class="pt-3">Data Served For ${companyName} | © <a href="${baseUrl}">Stock Tracker</a> 🚀</p>
    </div>
    `;
}

// Message for Console/Terminal
console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀

Stock Tracker ~?s={symbol}'😂   
https://github.com/akashprasher/

🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`);

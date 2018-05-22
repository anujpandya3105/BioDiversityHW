console.log("xxx")
function getNames() {

  var queryUrl = "/names";
  Plotly.d3.json(queryUrl, function(error, response) {

	// var nameList = document.querySelector("#myNames");
	// for (i=0; i < response.length; i++) {
	// 	console.log(response[i])
	// 	var listItem = document.createElement("li");
	// 	listItem.innerHTML = response[i];
	// 	nameList.appendChild(listItem);
	// }
	var nameList = document.querySelector("#selDataset");
	//alert(nameList);
	for (i=0; i < response.length; i++) {
		 	//console.log(response[i])
		 	var listItem = document.createElement("option");
		 	listItem.text = response[i];
		 	nameList.add(listItem);
	}
	
  });
}
getNames();

function optionChanged(sample_data){
	
	alert(sample_data);
	var queryUrl = "/metadata/BB_940";
  Plotly.d3.json(queryUrl, function(error, response) {
	
	console.log(response);
	//var d = document.querySelector("#d_sampledata");
	//d.innerHTML = response.key + response.value;
	document.write("<h2>" + 'Sample Data' + "</h2>");
		 document.write("<td>");
		 document.write("<tr>");
		 	document.write("<b>AGE</b>:" + response.AGE);
		 	document.write("<b>BB TYPE</b>" + response.BBTYPE );
		 	document.write("<b>ETHNICITY</b>:" + response.ETHNICITY );
		 	document.write("<b>GENDER</b>:" + response.GENDER );
		 	document.write("<b>LOCATION</b>:" + response.LOCATION );
		 	document.write("<b>SAMPLEID</b>:" + response.SAMPLEID );
		 document.write("</tr>");
	 document.write("</td>");
	});

}
function getNames() {

  var queryUrl = "/names";
  Plotly.d3.json(queryUrl, function(error, response) {

	var nameList = document.querySelector("#selDataset");
	//alert(nameList);
	
	for (i=0; i < response.length; i++) {
		 	//console.log(response[i])
		 	var listItem = document.createElement("option");
		 	listItem.text = response[i];
		 	nameList.add(listItem);
	}
	
	});
	initSampledata();
	initPie();
	initBubble();
}
getNames();



function optionChanged(sample_data){
	
	//alert(sample_data);
	var queryUrl = "/metadata/"+sample_data;
	
	//alert(queryUrl);
  Plotly.d3.json(queryUrl, function(error, response) {
	
	console.log(response);
	var d = document.querySelector("#d_sampledata");
	d.innerHTML=' ';

	d.innerHTML =  "AGE:" + response.AGE + ", " 
   +"</br>" +  "BBTYPE:" + response.BBTYPE + ", " 
+"</br>" +  "ETHNICITY:" + response.ETHNICITY + ", " 
+"</br>" +  "GENDER:" + response.GENDER + ", " 
+"</br>" +  "LOCATION:" + response.LOCATION + ", " 
+"</br>" +  "SAMPLEID:" +  response.SAMPLEID ;
	//alert(d);
	// document.write("<h2>" + 'Sample Data' + "</h2>");
	// 	 document.write("<td>");
	// 	 document.write("<tr>");
	// 	 	document.write("<b>AGE</b>  :" + response.AGE + "</br>");
	// 	 	document.write("<b>BB TYPE</b>  :" + response.BBTYPE + "</br>" );
	// 	 	document.write("<b>ETHNICITY</b>  :" + response.ETHNICITY + "</br>" );
	// 	 	document.write("<b>GENDER</b>  :" + response.GENDER + "</br>");
	// 	 	document.write("<b>LOCATION</b>  :" + response.LOCATION + "</br>");
	// 	 	document.write("<b>SAMPLEID</b>  :" + response.SAMPLEID + "</br>");
	// 	 document.write("</tr>");
	//  document.write("</td>");

	//alert("calling redrawPie"+ sample_data);
	   redrawPie(sample_data); 
	   redrawBubble(sample_data);

	});
}

function initSampledata(sample_data){
	
	//alert(sample_data);
	var queryUrl = "/metadata/BB_940";
	

	//alert(queryUrl);
  Plotly.d3.json(queryUrl, function(error, response) {
	
	console.log(response);
	var d = document.querySelector("#d_sampledata");
	d.innerHTML=' ';
	
//var obj = JSON.parse(response);
d.innerHTML =  "AGE:" + response.AGE + ", " 
+"</br>" +  "BBTYPE:" + response.BBTYPE + ", " 
+"</br>" +  "ETHNICITY:" + response.ETHNICITY + ", " 
+"</br>" +  "GENDER:" + response.GENDER + ", " 
+"</br>" +  "LOCATION:" + response.LOCATION + ", " 
+"</br>" +  "SAMPLEID:" +  response.SAMPLEID ;

	// for (response.key in d) {
	// 	console.log(response.key);
	// 	console.log(response.value);
	// 	h6tag = document.createElement("H6");
	// 	var t = document.createTextNode(response.value);
	// 	h6tag.appendChild(t);
  //   d.appendChild(h6tag);
	// }
	//d.innerHTML = response.key + response.value;
	//alert(d);
	// document.write("<h2>" + 'Sample Data' + "</h2>");
	// 	 document.write("<td>");
	// 	 document.write("<tr>");
	// 	 	document.write("<b>AGE</b>  :" + response.AGE + "</br>");
	// 	 	document.write("<b>BB TYPE</b>  :" + response.BBTYPE + "</br>" );
	// 	 	document.write("<b>ETHNICITY</b>  :" + response.ETHNICITY + "</br>" );
	// 	 	document.write("<b>GENDER</b>  :" + response.GENDER + "</br>");
	// 	 	document.write("<b>LOCATION</b>  :" + response.LOCATION + "</br>");
	// 	 	document.write("<b>SAMPLEID</b>  :" + response.SAMPLEID + "</br>");
	// 	 document.write("</tr>");
	//  document.write("</td>");
	});
}

function initPie(sample_data) {
	//alert("Inside red")

	var queryUrl = "/samples/BB_940";
	var queryUrlOtuDesc = "/otu_descriptions";
	//var queryUrl = "/samples/"+sample_data;
	var PIE = document.getElementById("pie");

	// Plotly.d3.json(queryUrlOtuDesc, function(error, responseOtuDesc) {
	// 	console.log(responseOtuDesc);
	// 	if (error) return console.warn(error);
	// });
	
  Plotly.d3.json(queryUrl, function(error, response) {
	console.log(response.otu_ids);
	if (error) return console.warn(error);

		Plotly.d3.json(queryUrlOtuDesc, function(error, responseOtuDesc) {
			console.log(responseOtuDesc);
			if (error) return console.warn(error);
		

		var layout = {
			title: "PIE CHART"}
		
		//console.log(responseOtuDesc.lowest_taxonomic_unit_found);

		var trace1={
			labels: response.otu_ids,
			values: response.sample_values,
			text: responseOtuDesc,
			type :"pie"
		};

		var data = [trace1];

		Plotly.newPlot("pie", data, layout);
		
		});
	
});
}

function initBubble(sample_data) {
	var queryUrl = "/samples/BB_940";	
	//var queryUrl = "/samples/"+sample_data;
	Plotly.d3.json(queryUrl, function (error, bubble_response) {
		var bubbleDiv = document.getElementById("bubble-chart");
		//if (error) return console.warn(error);
		console.log(bubble_response);
		var trace1 = {
		  type: "scatter",
		  mode: "markers",
		  x: bubble_response.otu_ids, //.slice(0,10),
		  y: bubble_response.sample_values, //slice(0,10),
		  marker: {
			//colorscale: 'Viridis', //Earth
			color: bubble_response.otu_ids, //.slice(0,10),
			size: bubble_response.sample_values,
			sizemode: 'area' //default is diameter, use area for bubble charts
			//size: bubble_response.sample_values //.slice(0,10) //["sample_values"]
		  },
		};
		var bubdata = [trace1];
		var bublayout = {
		  title: "Bubble Chart",
		  hovermode: 'closest',
		  showlegend: false,
		  height: 600,
		  margin:
		  {
		    top: 10,
		    bottom: 10,
		    right: 10,
		    left: 10
		  }
		};
		//};
		Plotly.plot(bubbleDiv, bubdata, bublayout);
	  }); //;
	  

}

function redrawPie(sample_data) {

	//var queryUrl = "/samples/BB_952";
	var queryUrl = "/samples/"+sample_data;
	var PIE = document.getElementById("pie");
	
  Plotly.d3.json(queryUrl, function(error, response) {
	console.log(response.otu_ids);
	if (error) return console.warn(error);

	var layout = {
		title: "PIE CHART"}
			
	var trace1={
		labels: response.otu_ids,
		values: response.sample_values,
		type :"pie"
	};
	var data = [trace1];

	//Plotly.restyle(PIE, [data], layout);
	Plotly.newPlot("pie", data, layout);
  });
}

function initPie(sample_data) {
	//alert("Inside red")

	var queryUrl = "/samples/BB_940";
	var queryUrlOtuDesc = "/otu_descriptions";
	//var queryUrl = "/samples/"+sample_data;
	var PIE = document.getElementById("pie");

	// Plotly.d3.json(queryUrlOtuDesc, function(error, responseOtuDesc) {
	// 	console.log(responseOtuDesc);
	// 	if (error) return console.warn(error);
	// });
	
  Plotly.d3.json(queryUrl, function(error, response) {
	console.log(response.otu_ids);
	if (error) return console.warn(error);

		Plotly.d3.json(queryUrlOtuDesc, function(error, responseOtuDesc) {
			console.log(responseOtuDesc);
			if (error) return console.warn(error);
		

		var layout = {
			title: "PIE CHART"}
		
		//console.log(responseOtuDesc.lowest_taxonomic_unit_found);

		var trace1={
			labels: response.otu_ids,
			values: response.sample_values,
			text: responseOtuDesc,
			type :"pie"
		};

		var data = [trace1];

		Plotly.newPlot("pie", data, layout);
		
		});
	
});
}

function redrawBubble(sample_data) {
	//var queryUrl = "/samples/BB_940";	
	var queryUrl = "/samples/"+sample_data;
	Plotly.d3.json(queryUrl, function (error, bubble_response) {
		var bubbleDiv = document.getElementById("bubble-chart");
		//if (error) return console.warn(error);
		console.log(bubble_response);
		var trace1 = {
		  type: "scatter",
		  mode: "markers",
		  x: bubble_response.otu_ids, //.slice(0,10),
		  y: bubble_response.sample_values, //slice(0,10),
		  marker: {
			//colorscale: 'Viridis', //Earth
			color: bubble_response.otu_ids, //.slice(0,10),
			size: bubble_response.sample_values,
			sizemode: 'area' //default is diameter, use area for bubble charts
			//size: bubble_response.sample_values //.slice(0,10) //["sample_values"]
		  },
		};
		var bubdata = [trace1];
		var bublayout = {
		  title: "Bubble Chart",
		  hovermode: 'closest',
		  showlegend: false,
		  height: 600,
		  margin:
		  {
		    top: 10,
		    bottom: 10,
		    right: 10,
		    left: 10
		  }
		};
		//};
		Plotly.plot(bubbleDiv, bubdata, bublayout);
	  }); //;
	  

}

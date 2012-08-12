// onload
//	initialize all event handlers
//	call getQueryTerm() [this will return the search query]
//		if no response from getQueryTerm() then search bar will be empty

function processResult(query) {
	$(".search-bar").val(query);
	$.get("http://sleepy-island-9299.herokuapp.com/search/", {
		pname : query,
		qtype : "first"
	}, function(data) {
		//parse the response and place the data appropriately
		// t = data.toString();
		// alert(t);

		var response = JSON.parse(data);
		if(response["response"] == "true") {
			if(response["type"] == "inter") {
				// Show the similar items
				var resultList = response["resultList"];
				$(".inter-result").html("")
				for(result in resultList) {
					var item = resultList[result];
					//result = JSON.parse(result);
					$(".inter-result").html($(".inter-result").html() + "<div class='inter-staticitem inter-item" + result + "'>" +"<img src='"+item['pimg']+"'/><div class='inter-name'>"+ item["pname"].toLowerCase() + "</div></div><hr>");

				}

				for(result in resultList) {
					$(".inter-item" + result).click(function() {
						// fetch the data from searchbar
						// send request to: http://sleepy-island-9299.herokuapp.com/search/?pname=<search term>&qtype=first
						//alert("hello");
						$(".inter-result").css({
							"display" : "none"
						});
						var item_ = resultList[result];
						var pname = item_["pname"];
						var purl = item_["purl"];
						$.get("http://sleepy-island-9299.herokuapp.com/search/", {
							'pname' : pname,
							'qtype' : "second",
							'url' : purl
						}, function(data) {
							var response_ = JSON.parse(data);
							if(response_["response"] == "true") {
								if(response_["type"] == "final") {
									var resultList2 = response_["resultList"];
									//alert(resultList2);
									$(".final-result").html("")
									for(result2 in resultList2) {
										var item2 = resultList2[result2];
										//result = JSON.parse(result);
										//console.log("-------->url = " + item2["rurl"]);
										//$(".final-result").html($(".final-result").html() + "<div class='final-staticitem final-item" + result2 + "'><a href='" + item2["rurl"] + "'>" + item2["price"] + "</a></div>");
										$(".final-result").html($(".final-result").html() + "<div class='final-staticitem final-item" + result2 + "'><div class='final-name'>" + item2["price"] + " </div>" +"<img class='final-img' src='"+item2['pimg']+"'/>"+"</div><hr>");

									}
									for(result3 in resultList2) {
										var item3 = resultList2[result3];
										$(".final-item" + result3).click(function() {
											window.open(item3['rurl']);
										});
										//result = JSON.parse(result);
										//console.log("-------->url = " + item2["rurl"]);

									}
								}
							}

						});
					});
				}

			} else if(response["type"] == "final") {
				var resultList3 = response["resultList"];
				//alert(resultList2);
				$(".final-result").html("")
				for(result4 in resultList3) {
					var item4 = resultList3[result4];
					//result = JSON.parse(result);
					//console.log("-------->url = " + item2["rurl"]);
					//$(".final-result").html($(".final-result").html() + "<div class='final-staticitem final-item" + result2 + "'><a href='" + item2["rurl"] + "'>" + item2["price"] + "</a></div>");
					$(".final-result").html($(".final-result").html() + "<div class='final-staticitem final-item" + result4 + "'>" + item4["price"] +"<img class='final-img' src='"+item4['pimg']+"'/>" + "</div>");

				}
				for(result5 in resultList3) {
					var item5 = resultList3[result5];
					$(".final-item" + result5).click(function() {
						window.open(item5['rurl']);
					});
					//result = JSON.parse(result);
					//console.log("-------->url = " + item2["rurl"]);

				}

			}
		}

	});
}

function getQueryTerm() {
	console.log("calling function");
	return getProductName();
}


$(document).ready(function() {

	// intialize all event handlers
	// fetch the data from searchbar
	// send request to: http://sleepy-island-9299.herokuapp.com/search/?pname=<search term>&qtype=first
});
// compute
console.log("2");
product = null;

chrome.tabs.getSelected(null, function(tab) {
	tabURL = tab.url;
	console.log("url is : " + tabURL);

	if(tabURL.indexOf("flipkart") != -1) {
		//query1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22";
		//query2 = "%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22topsection%22%5D%2Fdiv%5B4%5D%2Fdiv%5B1%5D%//2Fh1'&format=json&diagnostics=true";
		console.log("reached flipkart");
		query1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22";
		query2 = "%22%20and%0A%20%20%20%20%20%20xpath%3D%22%2F%2F*%5Bcontains(%40class%2C'mprod-summary-title%20fksk-mprod-summary-title')%5D%20%22&format=json&diagnostics=true";
		fullUrl = query1 + escape(tabURL) + query2;
		console.log(fullUrl);
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				res = xhr.responseText;
				jsonres = JSON.parse(res);
				productName = jsonres["query"]["results"]["div"]["h1"]["content"];
				console.log("productName is: " + productName);
				product = productName;
				console.log("product in function name is : " + product);
			}
		};

		xhr.open("GET", fullUrl, false);
		xhr.send();

	} else if(tabURL.indexOf("infibeam") != -1) {
		//		query1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22";
		//		query2 = "%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22ib_details%22%5D%2Fh1'&format=json&diagnostics=true";

		query1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22";
		query2 = "%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22ib_details%22%5D%2Fh1%20%7C%20%2F%2Fdiv%5B%40id%3D%22ib_details%22%5D%2Fh1%2Fspan'&format=json&diagnostics=true";
		fullUrl = query1 + escape(tabURL) + query2;
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				res = xhr.responseText;
				jsonres = JSON.parse(res);
				productName = (jsonres["query"]["results"]["h1"]["content"] ? jsonres["query"]["results"]["h1"]["content"] : jsonres["query"]["results"]["span"]["content"]);
				product = productName;
			}
		};

		xhr.open("GET", fullUrl, false);
		xhr.send();

		//document.write("infibeam");
	} else if(tabURL.indexOf("snapdeal") != -1) {
		query1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22";
		query2 = "%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fdiv%5B%40id%3D%22content_wrapper%22%5D%2Fdiv%2Fdiv%5B5%5D%2Fdiv%2Fdiv%5B1%5D%2Fdiv%5B2%5D%2Fdiv%5B1%5D%2Fdiv%5B1%5D%2Fh1'&format=json&diagnostics=true";
		fullUrl = query1 + escape(tabURL) + query2;
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				res = xhr.responseText;
				jsonres = JSON.parse(res);
				productName = jsonres["query"]["results"]["h1"];
				product = productName;
			}
		};

		xhr.open("GET", fullUrl, false);
		xhr.send();

		//document.write("snapdeal");
	} else if(tabURL.indexOf("homeshop") != -1) {
		query1 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22";
		query2 = "%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Fh1%5B%40id%3D%22productLayoutForm%3ApbiName%22%5D'&format=json&diagnostics=true";
		fullUrl = query1 + escape(tabURL) + query2;
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				res = xhr.responseText;
				jsonres = JSON.parse(res);
				productName = jsonres["query"]["results"]["h1"]["content"];
				product = productName;
			}
		};

		xhr.open("GET", fullUrl, false);
		xhr.send();

	} else {
		product = "none";
	}

	console.log("product is : " + product);

	processResult(product);

});

function getProductName() {
	var product = null;
	console.log("hccking");
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
					console.log("productName is: "+ productName);
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

		console.log("product is : "+product);
		return product;
	});
	
	

}
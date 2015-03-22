/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(function() {

	$("#weatherForm").submit(function(event) {

		event.preventDefault();
		
		var city=$("#cityName").val();
		var apiKey="bbb20c0fa01b9d469c906e2a3a56ecbf";
		var URL2= 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=metric&cnt=5';
		
		var weatherRequestData = {
			"dataType":  "jsonp",
			"timeout":  2000,
			"url":  'http://api.openweathermap.org/data/2.5/weather?&q='+city
		};
		
		var fivedayWeatherRequestData= {
			"dataType":  "jsonp",
			"timeout":  2000,
			"url":URL2
		};
		
		var weatherFormOutput = $("#weatherFormOutput");
		weatherFormOutput.empty();

		var fivedayWeatherFormOutput= $("#fivedayWeatherFormOutput");
		fivedayWeatherFormOutput.empty();
		
		var weatherResponse = $.ajax(weatherRequestData);
		var fivedayWeatherResponse= $.ajax(fivedayWeatherRequestData);

		weatherResponse.done(function(weatherResponseData) {
			
			if(weatherResponseData)
			{
				var weatherIcon=weatherResponseData.weather[0].icon;
				var todayTemp=weatherResponseData.main.temp-273;
				var weatherContainer = $("<div><h3></h3><h4></h4><strong></strong><br><b></b><br>"+
				"<img src='img/"+weatherIcon+".png'/></div>");
				weatherContainer.addClass("weather");
				
				$("h3", weatherContainer).text('Temperature: '+todayTemp+' Celsius');
				$("h4", weatherContainer).text('Latitude:'+ weatherResponseData.coord.lat);
				$("strong", weatherContainer).text('Longitude:'+ weatherResponseData.coord.lon);
				$("b", weatherContainer).text('Wind Speed:'+ weatherResponseData.wind.speed);
				
				weatherFormOutput.append(weatherContainer);

			}
		});
		
		weatherResponse.fail(function() {
			var failureMessage = $("<h2>Failed to retrieve the weather !</h2>");
			failureMessage.addClass("failureMessage");

			weatherFormOutput.append(failureMessage);
			weatherFormOutput.show();
		});

		//Five day forecast
		
		fivedayWeatherResponse.done(function(fivedayWeatherResponseData) {

			$.each(fivedayWeatherResponseData.list,function(index, data) 
			{
				var forecastIcon=data.weather[0].icon;
				var forecastContainer=$("<div>Temperature:<br><p></p><br>"+
				"<img src='img/"+forecastIcon+".png'/></div>");
				forecastContainer.addClass("forecast");
				$("p", forecastContainer).text(data.temp.day+ ' Celsius');
				fivedayWeatherFormOutput.append(forecastContainer);
				
				console.log(data.temp.day);
				console.log(data.weather[0].icon);
			});
		});
		
		fivedayWeatherResponse.fail(function() {
			var failureMessage = $("<h2>Failed to retrieve the weather !</h2>");
			failureMessage.addClass("failureMessage");

			fivedayWeatherFormOutput.append(failureMessage);
			fivedayWeatherFormOutput.show();
		});

		
	});
});


function myfunction()
{
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
    console.log("display latitude and longitude");
	}
	var onSuccess = function(position) {
		
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' );
          
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

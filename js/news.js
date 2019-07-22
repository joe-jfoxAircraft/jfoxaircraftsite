// 
//==========================================
//	Reprensent lists 
//==========================================

//Saves global variable of locations index as local variable for ease of reference + not editing the locations array.
var locationsToDisplay = makeLocationsPublicPDO;
    
    //Ensures that does not proceed to make list if no locations are saved to be listed.
    if(locationsToDisplay.locations.length > 0)
    {
        for(i = 0; i < locationsToDisplay.locations.length; i++)
        {

                //Calls function to call getWeatherAtIndexForDate.
                makeDynamicWeatherSummary(i);
        }
    };

//Calls getWeatherAtIndexForDate - called once for every object stored in the locations index.
function makeDynamicWeatherSummary(locationIndex)
{
    //Makes date instance to be passed to location weather cache - will be translated into forecastString in the cache method.
    var todayDate = new Date();
    
    LocationWeatherCache.getWeatherAtIndexForDate(locationIndex, todayDate, weatherCallback);
}

//Function used to construct the main page list in appropriate MDL design - appends onclick functionality to label spans and appends forecast.io data taken from weatherResponse callback method in cache to the page.
function weatherCallback(weatherInfo, locationIndex)
{
            
                //Creates a list skeleton to append details to.
                var listSkeleton = document.createElement('UL');
                //Ensures style mimics the rest of the HTML document + the desired list.
                listSkeleton.setAttribute("class", 'mdl-list');
                
                //Creates spans and labels for list.
                var locationInput = document.createElement('LIST');
                locationInput.setAttribute("class", "mdl-list__item mdl-list__item--two-line");
                
                //Creates first entry for list - title with correct MDL styling.
                var locationText = document.createElement('SPAN');
                locationText.setAttribute("class", "mdl-list__item-primary-content");
                locationText.setAttribute("id", "locationName" + locationIndex)
                
                //Adds "weatherSummary" (will pull request for weather summary later when I have figured it out.)
                var summarySpan = document.createElement('SPAN');
                summarySpan.setAttribute("class", 'mdl-list__item-sub-title');
                summarySpan.setAttribute("id", "shortSummary" + locationIndex)
                
                //Appends retrieved nickname to the list entry as a label for the button.
                locationText.appendChild(document.createTextNode(locationsToDisplay.locations[locationIndex].nickname));
                
                //Appends all elements to HTML - the location text and image to the list span, and the input list span to the list skeleton.
                locationInput.appendChild(locationText);
                locationText.appendChild(summarySpan);
                listSkeleton.appendChild(locationInput);
                
                //Appends new dynamic entries to body of HTML.
                document.getElementById('lister').appendChild(listSkeleton);
                document.getElementById('locationName' + locationIndex).addEventListener("click", function() { viewLocation(locationIndex);});
    

    //Parses stringified forecast.io data chunk to be referenced in innerHTML population commands.
    var weatherData = JSON.parse(weatherInfo);
    
    //Populates innerHTML of summary span with forecast.io data required - high/low temperatures and human-readable summary of conditions.
    document.getElementById("shortSummary" + locationIndex).innerHTML += "Click on the location for more weather information." + "<br>"; 
    document.getElementById("shortSummary" + locationIndex).innerHTML += weatherData.weatherSum + " ";
    document.getElementById("shortSummary" + locationIndex).innerHTML += "Minimum temperature: " + weatherData.minTemp + " degrees C, and maximum temperature: " + weatherData.maxTemp + " degrees C." + "<br>"; 
};



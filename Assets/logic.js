$(function () { //this will run first thing on the page
	makeButtons(topics, "btn btn-info", "#buttonsArea"); //calls the function to make the buttons. notice the bootstrap class add
	console.log("Page loaded"); //logs that the page is loaded
})

// this is the array for the starting set of buttons. I have a blockbuster movie theme
var topics = ["Lord of the Rings", "Star Wars", "Indiana Jones"]

function makeButtons(topcs, classToAdd, areaToAdd) { //start the function and set the parameters
	$(areaToAdd).empty(); //empy out the area each time, so that each time you make buttons (page restart) it clears out
	for (var i = 0; i < topcs.length; i++) { //go through the topics array
		var makeButton = $("<button>"); //make a new variable for button element
		makeButton.addClass(classToAdd); //add the class that is btn to a 
		makeButton.attr("data-type", topics[i]); //set the datatype oif the button element, in this case, it will be the items in the array
		makeButton.text(topcs[i]); //add the text that us ub the topics array
		$(areaToAdd).append(makeButton); //append the new button element
	}
}

$(document).on("click", ".btn", function () { //what to do on clicking the buttons
	$("#searches").empty();
	var type = $(this).data("type"); //set a variable for the button's data type, and grab it into variable "type"
	console.log(type); //console log it to check
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=N1BOdawoLPyhPP82WPaNOkvxcPgZ6tg2&limit=10" //giphy API url, plus my type, limit 10

	$.ajax({ //starting the ajax query
		url: queryURL,
		method: "GET"
	}).then(function (response) { //run this function upon query
		console.log(response); //logging the object 
		for (var i = 0; i < response.data.length; i++) { //loop thorugh all the data in the object that came in through giphy
			var searchDiv = $("<div class = 'search-item'>"); //make a new variable, and add the div class of search item
			var rating = response.data[i].rating //get the rating from the ajax query
			var para = $("<p>").text("Rating: " + rating); //make a new div for the paragraphs
			var animated = response.data[i].images.fixed_height.url; //put the animated gif in this new variable animated
			var still = response.data[i].images.fixed_height_still.url //put the still gif in this new variable called still
			var image = $("<img>"); //make a new element for the images
			image.attr("src", still); //give it the atribute of src still
			image.attr("data-still", still); //add data still
			image.attr("data-animated", animated); //then for animated
			image.attr("data-state", "still");
			image.addClass("searchImage");
			searchDiv.append(para);//add the paragraph to search div
			searchDiv.append(image);//add the image in new search div
			$("#searches").append(searchDiv); //finally, append it to the page under the searches div 

		}
	})
})

$(document).on("click", ".searchImage", function () {
	var state = $(this).attr("data-state"); //our state will be still by default
	if (state == "still") { //if you click on it, the state will become animated
		$(this).attr("src", $(this).data("animated"));
		$(this).attr("data-state", "animated");

	} else { //clicking on it again makes it go still
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}
})

//add new buttons
$("#addSearch").on("click", function () {
	event.preventDefault();
	var newSearch = $("input").eq(0).val().trim(); //this takes whatever we put in the input box and puts it into the variable newSearch --- eq0 is looking for first version of input
	topics.push(newSearch); //put this into the topics array
	console.log(topics); //console log it to check
	makeButtons(topics, "btn btn-info", "#buttonsArea") //run the function to make the new buttons
	return false; //prevent this click from reloading the page
})
// Adding click event listen listener to all buttons    The instructions say to make a variable called topics this is my tvshow variable.
var topics = ["star trek", "trailer park boys", "salute your shorts"];


 // Generic function for capturing the movie name from the data-attribute
 function alerttopics() {
   var topics = $(this).attr("data-name");

   alert(topics);
 }

 // Function for displaying movie data
 function renderButtons() {

   // Deleting the movies topics to adding new topics
   // (this is necessary otherwise we will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of topics
   for (var i = 0; i < topics.length; i++) {

     // Then dynamicaly generating buttons for each movie in the array
     // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
     var a = $("<button>");
     // Adding a class of show to our button
     a.addClass("show");
     // Adding a data-attribute
     a.attr("data-show", topics[i]);
     // Providing the initial button text
     a.text(topics[i]);
     // Adding the button to the HTML
     $("#buttons-view").append(a);
   }
 }

 // This function handles events where one button is clicked
 $("#add-show").on("click", function(event) {
   // Preventing the buttons default behavior when clicked (which is submitting a form)
   event.preventDefault();
   // This line grabs the input from the textbox
   var show = $("#show-input").val().trim();

   // Adding the movie from the textbox to our array
   topics.push(show);

   // Calling renderButtons which handles the processing of our movie array
   renderButtons();

 });

 // Function for displaying the movie info
 // We're adding a click event listener to all elements with the class "movie"
 // We're adding the event listener to the document because it will work for dynamically generated elements
 // $(".movies").on("click") will only add listeners to elements that are on the page at that time
// 


// $(document).on("click", ".show", alertShowName);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();







// function tvbutton () {
//   for (var i = 0; i < topics.length; i++) {
//     document.getElementById("btndiv").innerHTML += "<button>" + topics[i] + "</button>";
//     // i need to set the internal data-show attribute value to topics[i]

//   }
// }

// tvbutton();

// for each topic make a button with a data show property of the tv show name


  // $.each(topics, function (indexInArray, valueOfElement) { 
  //   document.createElement.button
     
  // });

$("button").on("click", function() {
  // Grabbing and storing the data-show property value from the button
  var tvshow = $(this).attr("data-show");

  // Constructing a queryURL using the animal name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    tvshow + "&api_key=hFzmqKwBT6astLROhFMHhBWP5aTfsads&limit=10";



  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var showDiv = $("<div class='dyn-div'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var showImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        showImage.attr("src", results[i].images.fixed_height.url);
        
        
        // Appending the paragraph and image tag to the showDiv
        showDiv.append(p);
        showDiv.append(showImage);
        
        

        // Prependng the showDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(showDiv);
        
        $('.dyn-div').on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          console.log("asfasdf")
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

            
          }
          
        });
      }
    });
});
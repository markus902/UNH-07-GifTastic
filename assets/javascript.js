let topics = ["Bratwurst", "Hulk", "Sky", "Trumpet", "Law and Order"];
let key = "plDeGkLT5mfMoLkcJNrZi66kXLxQ02ce";
let queryLink;

//Click events for buttons

for(i = 0; i < topics.length; i++){
    let newButton = $("<a>");
    newButton.addClass("waves-effect waves-light btn").attr("value", topics[i]).text(topics[i]);
    $("#buttons").append(newButton);
}; 

$(".btn").on("click", function(){
    console.log(this);
    let name = $(this).attr("value");
    console.log(name);
  
    let queryLink = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${name}&limit=10`;

    $.ajax({
        url: queryLink,
        method: "GET",
    })

    .then(function(gifs){

        for(i = 0; i < gifs.data.length; i++){
            console.log(gifs.data[0].images.downsized.url);
            let newImg = $("<img>");
            let gifUrl = gifs.data[i].images.downsized.url;
            newImg.attr("src", gifUrl).addClass(`gif${i}`);
            $("#output").prepend(newImg);
            newImg = 0;
        }
    
        

    // Creating initial buttons
    
    
    
    }) 
});
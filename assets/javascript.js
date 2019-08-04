let topics = ["Bratwurst", "Hulk", "Sky", "Trumpet", "Law and Order"];
let key = "plDeGkLT5mfMoLkcJNrZi66kXLxQ02ce";
let queryLink;
let newButton = $("<a>");
let adding = false;

//Click events for buttons

$(document).ready(function () {

    //Creating initial buttons

    topics.forEach(function (topic) {
        newButton = $("<a>");
        newButton.addClass("waves-effect waves-light btn").attr("value", topic).text(topic);
        $("#buttons").append(newButton);
        newButton = 0;
    });

    // Creating new button
    $("#add-btn").on("click", function (event) {
        if ($("#search-field").val() == "") {
            $("#search-field").attr("placeholder", "Please enter a category");
        } else {
            newButton = $("<a>");
            let search = $("#search-field").val().trim();
            newButton.addClass("waves-effect waves-light btn")
                .attr("value", search)
                .text(search);
            $("#buttons").append(newButton);
        }
    });


    // Click event on button
    $(document).on("click", ".btn", function () {
        console.log(this);
        let name = $(this).attr("value");
        console.log(name);

        let queryLink = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${name}&limit=10`;

        $.ajax({
                url: queryLink,
                method: "GET",
            })

            .then(function (gifs) {
                console.log(gifs.data);

                $("#output").empty();
                for (i = 0; i < gifs.data.length; i++) {
                    console.log(gifs.data[0].images.fixed_height_still.url);
                    let newImgStill = $("<br><img>")
                        .attr("src", gifs.data[i].images.fixed_height_still.url);
                    let newImgActive = $("<img>")
                        .attr("src", gifs.data[i].images.fixed_height.url)
                        .css("display", "none");
                    let newRating = $("<span>")
                        .css("float", "none")
                        .text("Rating: " + gifs.data[i].rating);
                    let newDiv = $("<div>")
                        .css("width", "fit-content")
                        .css("float", "left")
                        .css("text-align", "center");

                    newDiv.append(newRating);
                    newDiv.append(newImgStill);
                    newDiv.append(newImgActive);

                    $("#output").prepend(newDiv);
                }
            });
    });

    $(document).on("click", "img", function () {
        $(this).siblings("img").show();
        $(this).hide();
    });
});
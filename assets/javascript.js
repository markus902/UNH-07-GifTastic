let topics = ["Monkey", "Hulk", "OMG", "Crazy Cat", "Law and Order"];
let key = "plDeGkLT5mfMoLkcJNrZi66kXLxQ02ce";
let queryLink;
let newButton = $("<a>");
let adding = false;

console.log(JSON.parse(localStorage.getItem("myCategoryList")));
console.log(localStorage.getItem("favGif"));

//Click events for buttons

$(document).ready(function () {

    //Loading fvorite Gif
    if (localStorage.getItem("favGif") == null) {
        $("#fav-gif").css("color", "white").text("No favorite yet. Select a category and click on your favorite gif. We will remember your last favorite.");
    } else {
        let favGif = $("<img>").attr("src", localStorage.getItem("favGif"));
        $("#fav-gif").append(favGif);
    }

    //Creating initial buttons, after checking local storage for earlier versions of buttons
    if (localStorage.getItem("myCategoryList") != undefined) {
        topics = JSON.parse(localStorage.getItem("myCategoryList"));
        console.log(topics);
    }
    topics.forEach(function (topic) {
        newButton = $("<a>");
        newButton.addClass("waves-effect waves-light btn").attr("value", topic).text(topic);
        $("#buttons").append(newButton);
        newButton = 0;
    });

    // Creating new button
    $("#add-btn").on("click", function () {
        addButton();
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
                if ($("#checkbox").is(":checked") === false) {
                    $("#output").empty();
                    console.log("true")
                }
                for (i = 0; i < gifs.data.length; i++) {
                    console.log(gifs.data[0].images.fixed_height_still.url);
                    let newImgStill = $("<br><img>")
                        .attr("src", gifs.data[i].images.fixed_height_still.url)
                        .attr("moving", gifs.data[i].images.fixed_height.url);
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




    // Submiting search when hitting enter
    document.onkeyup = function (key) {
        let checkInput = key
        if (checkInput.keyCode == 13) {
            console.log("yay");
            addButton();
        }
    };

    // Click event to switch image to moving
    $(document).on("click", "img", function () {
        $(this).siblings("img").show();
        $(this).hide();
        let favGif = $(this).attr("moving");
        console.log(favGif);
        localStorage.setItem("favGif", favGif);
        let favDisplay = $("<img>").attr("src", favGif);

        $("#fav-gif").empty().append(favDisplay);
    });
});

function addButton() {
    if ($("#search-field").val() == "") {
        $("#search-field").attr("placeholder", "Please enter a category and hit enter");
    } else {
        newButton = $("<a>");
        let search = $("#search-field").val().trim();
        newButton.addClass("waves-effect waves-light btn")
            .attr("value", search)
            .text(search);
        topics.push(search);
        localStorage.setItem("myCategoryList", JSON.stringify(topics));
        console.log(JSON.stringify(topics));
        $("#buttons").append(newButton);
    }
}
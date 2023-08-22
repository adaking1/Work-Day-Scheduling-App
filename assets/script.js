// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

function pressSave() {
    var saveButton = $(".saveBtn");
    saveButton.on("click", function(){
        if (this.previousElementSibling.value === " ") {
            return
        }
        else {
            localStorage.setItem(this.parentElement.id, this.previousElementSibling.value);
        }
    });
    
}

// maybe add this to the chunk of code, not a function
function init() {
    $(".time-block").each(function() {
        if (localStorage.getItem(this.id) !== null) {
            this.children[1].textContent = localStorage.getItem(this.id);
        }
    })
}

$(document).ready(function() {

    pressSave();
    init();

    var currentHour = parseInt(dayjs().format("H"));

    $(".time-block").each(function() {
        var time = parseInt(this.id.slice(5));

        if (time > currentHour) {
            $(this).addClass("future");
            console.log(time>currentHour);
            console.log(currentHour);
        }
        else if (time < currentHour) {
            $(this).addClass("past")
            $(this).removeClass("present");
        }
        else {
            $(this).addClass("present");
            $(this).removeClass("future");
        }


    });

    
});

// need to make it so the calendar is cleared at the start of the next day
// need to put the current date in the header






// $(function () {
//     // TODO: Add a listener for click events on the save button. This code should
//     // use the id in the containing time-block as a key to save the user input in
//     // local storage. HINT: What does `this` reference in the click listener
//     // function? How can DOM traversal be used to get the "hour-x" id of the
//     // time-block containing the button that was clicked? How might the id be
//     // useful when saving the description in local storage?
//     //
//     // TODO: Add code to apply the past, present, or future class to each time
//     // block by comparing the id to the current hour. HINTS: How can the id
//     // attribute of each time-block be used to conditionally add or remove the
//     // past, present, and future classes? How can Day.js be used to get the
//     // current hour in 24-hour time?
//     //
//     // TODO: Add code to get any user input that was saved in localStorage and set
//     // the values of the corresponding textarea elements. HINT: How can the id
//     // attribute of each time-block be used to do this?
//     //
//     // TODO: Add code to display the current date in the header of the page.
//   });
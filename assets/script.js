// this function saves text that was input in a calendar block. 
// if the save button is pressed with no text, the fuction will return
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


// this function sets the text of the calendar if there was text saved in local storage

function textSet() {
    $(".time-block").each(function() {
        if (localStorage.getItem(this.id) !== null) {
            this.children[1].textContent = localStorage.getItem(this.id);
        }
    })
}

// this function sets the date in the header
// it also sets the day in local storage so when the day changes, the local storage clears. The calendar is clear for each new day.
function dateSet() {
    var day = dayjs().format("D");
    var dayMonthYear = dayjs().format("D, MMM, YYYY");
    var suffix = "";

    if ((day.slice(-1) == 1) && (day.slice(0,1) !== 1)) {
        suffix = "st";
    }
    else if ((day.slice(-1) == 2) && (day.slice(0,1) !== 1)) {
        suffix = "nd";
    }
    else if ((day.slice(-1) == 3) && (day.slice(0,1) !== 1)) {
        suffix = "rd";
    }
    else {
        suffix = "th";
    }

    $("#currentDay").text(dayjs().format("dddd, MMM D"));
    $("#currentDay").append(suffix);
    $("#currentDay").append(dayjs().format(", YYYY"));

    if ((localStorage.getItem("date") !== dayMonthYear)){
        localStorage.clear();
        localStorage.setItem("date", dayMonthYear);
}

}

// this function sets the time block color by changing the class of the time blocks to "past", "present", and future
function timeBlockSet () {
    var currentHour = parseInt(dayjs().format("H"));

    $(".time-block").each(function() {
        var time = parseInt(this.id.slice(5));

        if (time > currentHour) {
            $(this).addClass("future");
            
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
}

// this is a jQuery call that initiates the enclosed function after the page has rendered the html
$(document).ready(function() {

    pressSave();
    dateSet();
    timeBlockSet();
    textSet();
    
});
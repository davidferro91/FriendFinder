var questions = ["Do you value justice higher than mercy?", "Do you rapidly get involved in the social life of a new workplace?", "Do you think that the more people with whom you can speak, the better?", "Do you tend to rely on your experience rather than on theoretical alternatives?", "As a rule, do you proceed only when you have a clear and detailed plan?", "Do you easily empathize with the concerns of other people?", "Do you often prefer to read a book than go to a party?", "When with a group of people, do you enjoy being directly involved and being at the centre of attention?", "Are you are more inclined to experiment than to follow familiar approaches?", "Are you strongly touched by the stories about people's troubles?"];
var questionIds = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
for (var i = 0; i < questions.length; i++) {
    var formGroup = $("<div>");
    formGroup.addClass("form-group");
    var questionLabel = $("<label>");
    questionLabel.attr("for", "question-input");
    var questionH = $("<h3>");
    questionH.text("Question " + (i+1));
    questionLabel.append(questionH);
    formGroup.append(questionLabel);
    var questionText = $("<h5>");
    questionText.text(questions[i]);
    formGroup.append(questionText);
    var questionSelect = $("<select>");
    questionSelect.attr("type", "text");
    questionSelect.addClass("question-input chosen-select");
    questionSelect.attr("id", questionIds[i]);
    formGroup.append(questionSelect);
    $("#question-box").append(formGroup);
    $("#question-box").append("<hr>");
}
var options = ["", "5 (Strongly Agree)", "4", "3", "2", "1 (Strongly Disagree)"];
var optionValues = ["", 5, 4, 3, 2, 1];
for (i = 0; i < options.length; i++) {
    let opt = $("<option>");
    opt.text(options[i]);
    opt.attr("value", optionValues[i]);
    $(".question-input").append(opt);
}
$(".question-input").chosen();

$("#submit").on("click", function(event) {
    event.preventDefault();

    function validateForm () {
        var isValid = true;
        $(".form-control").each(function () {
            if ($(this).val() === "") {
                isValid = false;
            }
        });

        $(".chosen-select").each(function () {
            if ($(this).val() === "") {
                isValid = false;
            }
        });
        return isValid;
    }

    if (validateForm()) {
        var userData = {
            name: $("#name").val(),
            photo: $("#photo").val(),
            scores: [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val()
            ]
        };

        $.post("/api/friends", userData, function(data) {
            $("#match-name").text(data.name);
            $("#match-img").attr("src", data.photo);

            $("#results-modal").modal("toggle");
        });
    } else {
        alert("You must fill out all fields before submitting.");
    }
});
(function() {

  $(function() {

    function NewQuestion() {
      //console.log("inside new question");
      $.get("http://jservice.io/api/random", function(data) {
        $.each(data, function(index, value) {
          category_title = value.category.title;
          question = value.question;
          points = value.value;
          answer = value.answer;
          $("#category").html(value.category.title);
          $("#question").html(value.question);
          $("#points").html(value.value);
          console.log(index + " : " + value.question + " : " + value.answer);
        }) //each

      }); //get
    } //newQuestion function
    let category_title = " ";
    let question = " ";
    let answer = " ";
    let guessButton = $("#submit");
    let total_points = $("#total_points");
    NewQuestion();

    $("#submit").click(function() {
      let input_text = $(".input").val();
      console.log($(".input").val());
      if (input_text.toLowerCase() == answer.toLowerCase()) {
        console.log("Answer is correct");
        var total = parseInt(total_points.html()) + points;
        $(total_points).html(total);
      } else {
        console.log("Anwer is wrong");
      }
      NewQuestion();
    })

  })
})();

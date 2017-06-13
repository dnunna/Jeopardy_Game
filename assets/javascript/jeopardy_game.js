(function() {

  $(function() {

    //declaring the variables - these can be used globally
    let category_title = $("#category");
    let question = $("#question");
    let actualanswer = $("#coranswer");
    let enteredanswer = $("#entanswer");
    let guessButton = $("#submit");
    let quespoints = $("#points");
    let message = $("#message");
    let total_points = $("#total_points");
    let cat_title;
    let nextquestion;
    let newpoints;
    let newanswer;


    // getting the data from API and assigning the required data into a variable
    function newquestion() {
      return $.get("http://jservice.io/api/random", function(data) {
        $.each(data, function(index, value) {
          cat_title = value.category.title;
          nextquestion = value.question;
          newpoints = value.value;
          newanswer = value.answer;
          console.log(cat_title + ":" + nextquestion + " : " + newpoints + ":" + newanswer);
        }) //each
      }); //get
    } //newQuestion function

    //writing the function to populate the data on DOM
    function populate(data) {
      category_title.html(cat_title);
      question.html(nextquestion);
      quespoints.html(newpoints);
    };

    // AND GO! take the info from newQuestion once it is done, and run populate so a question pops up
    let randomquestion = newquestion();
    randomquestion.done(function(data) {
      populate(data);
    });


    //on answer submit it will compare the anwer with actual answer and assign the points
    $("#submit").click(function() {
      let input_answer = $("#input").val();
      //console.log(input_answer);

      enteredanswer.html(input_answer);
      actualanswer.html(newanswer);
      //console.log(newanswer);

      if (input_answer.toLowerCase() == newanswer.toLowerCase()) {
        message.html("Hey.. you got the right answer ..!")
        var total = parseInt(total_points.html()) + newpoints;
        total_points.html(total);
      } else {
        message.html("Oops.. Wrong answer ..Try the next one...")
      }
      $("#input").val("");
      let randomquestion = newquestion();
      randomquestion.done(function(data) {
        populate(data);
      });
    })

  })
})();

(function() {

  $(function() {

    //declaring the variables - these can be used globally
    let category_title1 = $("#category1");
    let category_title2 = $("#category2");
    let category_title3 = $("#category3");
    let category = $("#category");
    let question = $("#question");
    let actualanswer = $("#coranswer");
    let enteredanswer = $("#entanswer");
    let guessButton = $("#submit");
    let quespoints = $("#points");
    let message = $("#message");
    let total_points = $("#total_points");
    let cat_id = [];
    let cat_title = [];
    let clues_count = [];
    let nextquestion;
    let newpoints;
    let newanswer;
    let quesnum;
    let categoryname;

    // this is the random integer function
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    //this random offset value is to get random categories from API
    let offsetrandom = getRandom(0, 5000);
    console.log("offset random" + offsetrandom);

    //this is to hide the questions section on initial html page load
    $(".quesSection").hide();

    // getting the data from API and assigning the required data into a variable
    function newCategories() {
      return $.get("http://jservice.io/api/categories?count=3&offset=" + offsetrandom, function(data) {
        $.each(data, function(index, value) {
          cat_id[index] = value.id;
          cat_title[index] = value.title;
          clues_count[index] = value.clues_count;
          console.log("my id: " + cat_id[index] + "& my title: " + cat_title[index] + "& my count: " + clues_count[index]);
        }) //each
      }); //get
    } //newCategories function closing braces



    //writing the function to pass the
    function populate(data) {
      category_title1.html(cat_title[0]);
      category_title2.html(cat_title[1]);
      category_title3.html(cat_title[2]);
    };

    // AND GO! take the info from newCategories once it is done, and run populate the categories pops up
    let randomcat = newCategories();
    randomcat.done(function(data) {
      populate(data);
    });


    //function to get the questions from clues api by passing category id
    //and populate one random question on DOM using the random clues_count
    function newQuestions() {
      clues_random = getRandom(0, clues_count[quesnum]);
      console.log("clues_random " + clues_random);
      return $.get("http://jservice.io/api/clues?category=" + cat_id[quesnum], function(data) {
        $.each(data, function(index, value) {
          nextquestion = data[clues_random].question;
          newanswer = data[clues_random].answer;
          newpoints = data[clues_random].value;
          categoryname = data[clues_random].category.title;
          console.log(categoryname + ":" + nextquestion + ":" + newanswer + " : " + newpoints);
        }) //each
      }); //get
    }; //newQuestion function closing braces

    //pass the data from API variables to DOM variables
    function quesPopulate(data) {
      question.html(nextquestion);
      quespoints.html(newpoints);
      category.html(categoryname);
    };

    // AND GO! take the info from newQuestion once it is done, and run populate so a question pops up
    //let randomquestion = newquestion();
    function quesSelect() {
      let randomquestion = newQuestions();
      randomquestion.done(function(data) {
        quesPopulate(data);
      });
    };

    //this is to display the quetion related to the category clicked
    $(".category").click(function() {
      quesnum = $(this).data("questionnum");
      $(this).addClass('selected');
      //console.log($(this).attr("id"));
      $(".quesSection").show();
      quesSelect();
    });

    //this is the function to submit the user enteredanswer and validate it
    $("#submit").click(function() {
      let input_answer = $("#input").val();
      console.log(input_answer);

      enteredanswer.html(input_answer);
      actualanswer.html(newanswer);

      if (input_answer.toLowerCase() == newanswer.toLowerCase()) {
        message.html("Hey.. you got the right answer ..!")
        var total = parseInt(total_points.html()) + newpoints;
        total_points.html(total);
      } else {
        message.html("Oops.. Wrong answer ..Try the next one...")
      }
      $("#input").val("");
      quesSelect();
    });


  })
})();

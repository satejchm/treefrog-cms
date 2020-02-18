function initButtons() {
  //when you click get started it leads you to add nav page
  $(".get-started").click(function(e) {
    $("#home div").removeClass("active");
    $("#addNav div").addClass("active");

    $(".text-wrapper").html(TREEFROG_SERVICE.getGetStartedContent());
    $(".btn-holder").html(TREEFROG_SERVICE.getCreateNavButtons());

    //when you click on create main nav it opens modal
    $(".main-nav").click(function(e) {
      $(".modal").css("display", "flex");
      $(".modal").css("color", "white");
      $(".alert-box").html(TREEFROG_SERVICE.getModalContent());
      //$(".cancel").addClass("btn btn-light");
      $(".cancel").click(function(e) {
        $(".modal").css("display", "none");
      });
    });

    //when you click on create sub nav it opens a modal
    $(".sub-nav").click(function(e) {
      $(".modal").css("display", "flex");

      $(".modal").css("color", "white");
      $(".alert-box").html(TREEFROG_SERVICE.getModalContentSub());
      $(".cancel").click(function(e) {
        $(".modal").css("display", "none");
      });
    });

    //when you clock on home it will take you back to home page
    $("#home").click(function(e) {
      $("#addNav div").removeClass("active");
      $("#home div").addClass("active");

      $(".text-wrapper").html(TREEFROG_SERVICE.getHomeContent());
      $(".btn-holder").html(TREEFROG_SERVICE.getHomeStartButton());
    });
  });
}

$(document).ready(function() {
  initButtons();
});

function initButtons() {
  addGetStartedListener();
  createMainNav();
  createSubNav();
  createHomeContent();
  validateInput();
}

function createHomeContent() {
  //when you clock on home it will take you back to home page
  $("#home").click(function(e) {
    $("#addNav div").removeClass("active");
    $("#home div").addClass("active");

    $(".text-wrapper").html(TREEFROG_SERVICE.getHomeContent());
    $(".btn-holder").html(TREEFROG_SERVICE.getHomeStartButton());
    $(".main-nav").off();
    $(".sub-nav").off();
    initButtons();
  });
}

function addGetStartedListener() {
  //when you click get started it leads you to add nav page
  $(".get-started").click(function(e) {
    $("#home div").removeClass("active");
    $("#addNav div").addClass("active");

    $(".text-wrapper").html(TREEFROG_SERVICE.getGetStartedContent());
    $(".btn-holder").html(TREEFROG_SERVICE.getCreateNavButtons());
    createMainNav();
    createSubNav();
    $(".get-started").off();
  });
}
function createMainNav() {
  //when you click on create main nav it opens modal
  $(".main-nav").click(function(e) {
    $(".modal").css("display", "flex");
    $(".alert-box").html(TREEFROG_SERVICE.getModalContent());
    //when you click on create main nav button it checks for empty or if there is a value, returns it
    $(".create-main-nav").click(function(e) {
      validateInput();
    });
    //close modal when you click on cancel or x button
    $(".closeModal").click(function(e) {
      $(".modal").css("display", "none");
    });
  });
}

function createSubNav() {
  //when you click on create sub nav it opens a modal
  $(".sub-nav").click(function(e) {
    $(".modal").css("display", "flex");
    $(".alert-box").html(TREEFROG_SERVICE.getModalContentSub());
    //when you click on create sub nav button it takes you to new page
    $(".create-sub-nav").click(function(e) {
      $(".text-wrapper").html(TREEFROG_SERVICE.getMainNavCreateContent());
      $(".modal").css("display", "none");
      $(".btn-holder").css("display", "none");
    });
    //close modal when you click on cancel or x button
    $(".closeModal").click(function(e) {
      $(".modal").css("display", "none");
    });
  });
}

function validateInput() {
  //if input box is empty or has no value return an error alert
  if ($(".inputBox").val() === "" || $("#inputBox").val() === null) {
    swal("Please enter navigation name.");
    return false;
  }
  if ($(".inputBox").val() === "home" || $("#inputBox").val() === "about") {
    swal(
      "You have already created a navigation with this name. Please create a new navigation name."
    );
    return false;
  }
  if ($(".inputBox").val()) {
    //if someone entered in the input, return the input value
    swal(
      "You added " +
        $(".inputBox")
          .val()
          .toLowerCase() +
        " to your navigation!"
    );
    console.log(
      $(".inputBox")
        .val()
        .toLowerCase()
    );
    $(".modal").css("display", "none");
    $(".text-wrapper").html(TREEFROG_SERVICE.getMainNavCreateContent());
    $(".btn-holder").html(TREEFROG_SERVICE.getSavePageInfoButton());
  }
}

$(document).ready(function() {
  initButtons();
  addGetStartedListener();
});

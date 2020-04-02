function addMainNav(navName) {
  console.log(navName);

  let pageFakeData = {
    navName: navName,
    content: "<h1>Sarah how'd ya get so dumb haha</h1>",
    subNavs: [
      {
        navName: "subNav",
        content: "<h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>"
      }
    ]
  };

  TREEFROG_SERVICE.saveData(pageFakeData);
}

function initButtons() {
  addGetStartedListener();
  createMainNav();
  createSubNav();
  createHomeContent();
  validateInput();
  saveQuillInfo();
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
  let newNavName = $(".inputBox")
    .val()
    .toLowerCase()
    .trim();

  TREEFROG_SERVICE.checkMainNavName(newNavName, addMainNav);

  /*
  //if input box is empty or has no value return an error alert
  if ($(".inputBox").val() === "" || $(".inputBox").val() === null) {
    swal("The name was left empty. Please enter navigation name.");
    return false;
  }
  if (
    $(".inputBox").val() == "home" ||
    $(".inputBox").val() == "about" ||
    $(".inputBox").val() == "blah"
  ) {
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
 */
  $(".text-wrapper").html(TREEFROG_SERVICE.getMainNavCreateContent());
  $(".inputBoxName").html("nav < " + $(".inputBox").val());
  addQuill();
  $(".btn-holder").html(TREEFROG_SERVICE.getSavePageInfoButton());
  saveQuillInfo();
}

function checkForDup() {
  /*let fakeList = [
    { navName: "home" },
    { navName: "about" },
    { navname: "contact" }
  ];*/
  let newNavName = $(".inputBox")
    .val()
    .toLowerCase()
    .trim();

  if (!newNaveName) {
    alert("inside if", newNaveName);
  } else {
    let isUnique = true;

    $.each(fakeList, function(idx, val) {
      if (val.navName == newNavName) {
        alert("same", val.navname);
        return false;
      }
    });
    if (isUnique) {
      fakeList.push({ navName: newNaveName });
      $(".inputBox").val("");
      closeModal();
    }
  }
}

var quill;
var justHtml;

function addQuill() {
  quill = new Quill("#editor-container", {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block", "image", "link"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"] // remove formatting button
      ]
    },
    placeholder: "Compose an epic...",
    theme: "snow" // or 'bubble'
  });
}

function saveQuillInfo() {
  $(".save-data").click(function(e) {
    console.log("clicked");
    e.preventDefault();
    justHtml = quill.root.innerHTML;
    $("#quillContent").html(justHtml);
    //setPages(justHtml);
    //$(".content-wrapper").css("display", "block");
    //$(".pageData").html(justHtml);
  });
}

$(document).ready(function() {
  TREEFROG_SERVICE.initFirebase();
  initButtons();
  addGetStartedListener();
});

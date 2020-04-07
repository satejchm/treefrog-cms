function addNavListener() {
  //when you click on the nav anchor it will update to what was entered in the update input
  $("nav a").click(function (e) {
    //get firebase id
    var id = e.currentTarget.id;
    //reference the input for the name change
    var newNavName = $("#updateContent").val();

    //reference database and return back
    PRACTICE_SERVICE.updateContent(id, newNavName, displayData);
    console.log("updated");
  });
  $("#updateContent").val("");
}

function deleteNavListener() {
  //when you click on delete button it will delete the selected nav name data from the database using the id
  $("#deleteData").click(function (e) {
    console.log("deleted");
    //references the nav data id
    $("nav a").click(function (e) {
      var id = e.currentTarget.id;

      PRACTICE_SERVICE.deleteContent(id, displayData);
    });
  });
}

function displayData(addData) {
  //start navigation using a string
  var container = "<nav> ";
  addData.forEach(function (doc) {
    var id = doc.id;
    var rawData = doc.data();
    console.log(id + " " + rawData.navName);
    container += `<a href="#" id="${id}">${rawData.navName}</a>`;
  });
  //close container nav information
  container += "</nav>";
  //add container string to html to display nav info
  $(".showData").html(container).css("display", "flex");
  addNavListener();
}

function init() {
  $(".getData").click(function (e) {
    PRACTICE_SERVICE.getAllData(displayData);
  });

  deleteNavListener();

  $("#addData").click(function (e) {
    e.preventDefault();
    //get info from input box
    //lowercase the data
    let nName = $("#nav-input").val().trim().toLowerCase();

    if (nName != "") {
      console.log("not empty");
      PRACTICE_SERVICE.checkPages(nName, alertUser);
      $("#nav-input").val("");
    } else {
      swal("add name");
    }
    console.log("add name");
  });

  /*  $("#checkPages").click(function(e) {
    e.preventDefault();
    console.log("check");
    PRACTICE_SERVICE.checkPages("home");
  });
  */
}

function alertUser(result) {
  swal(result);
}

$(document).ready(function () {
  PRACTICE_SERVICE.initFirebase(init);
  //init();
});

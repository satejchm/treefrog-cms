function addNavListener() {
  //when you click on the nav anchor it will update to what was entered in the update input
  $("nav a").click(function(e) {
    //get firebase id
    var id = e.currentTarget.id;
    var newNavName = $("#updateContent").val();

    //reference database and return back
    PRACTICE_SERVICE.updateContent(id, newNavName, displayData);
  });
  $("#updateContent").val("");
}
function deleteNavListener() {
  //when you click on the nav anchor it will update to what was entered in the update input
  $("#deleteData").click(function(e) {
    //get firebase id
    var id = e.currentTarget.id;
    var newNavName = $("nav a").val();

    //reference database and return back
    PRACTICE_SERVICE.updateContent(id, newNavName, displayData);
  });
  $("#updateContent").val("");
}
function displayData(addData) {
  //start navigation using a string
  var container = "<nav> ";
  addData.forEach(function(doc) {
    var id = doc.id;
    var rawData = doc.data();
    console.log(id + " " + rawData.navName);
    container += `<a href="#" id="${id}">${rawData.navName}</a>`;
  });
  //close container nav information
  container += "</nav>";
  //add container string to html to display nav info
  $(".showData")
    .html(container)
    .css("display", "flex");
  addNavListener();
}

function init() {
  $(".getData").click(function(e) {
    PRACTICE_SERVICE.getAllData(displayData);
  });

  $("#addData").click(function(e) {
    e.preventDefault();
    //get info from input box
    //lowercase the data
    let nName = $("#nav-input")
      .val()
      .trim()
      .toLowerCase();

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

$(document).ready(function() {
  PRACTICE_SERVICE.initFirebase(init);
  //init();
});

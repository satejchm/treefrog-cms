var PRACTICE_SERVICE = (function () {
  var _db;
  var currentPageID;

  //get data from pages
  var _getAllData = function (callback) {
    _db
      .collection("Pages")
      .get()
      .then(function (querySnapshot) {
        callback(querySnapshot);
      });
  };

  //update nav name data
  var _updateData = function (id, newContent, callback) {
    //create var that references nav name from firebase and update the newContent
    var newObj = { navName: newContent };

    _db
      .collection("Pages")
      .doc(id)
      .update(newObj)
      .then(function () {
        _getAllData(callback);
      });
  };

  //delete nav name data
  var _deleteData = function (id) {
    _db.collection("Pages").doc(id).delete();
  };

  //add nav name data to your database
  var _addData = function (navName, callback) {
    //start loading screen
    let pageFakeData = {
      navName: navName,
      content: "<h1>weehoo</h1>",
      subNavs: [],
    };

    _db
      .collection("Pages")
      .add(pageFakeData)
      .then(function (docRef) {
        //remove loading screen
        console.log("document written with ID: ", docRef.id);
        callback("New Navigation Added");
      })
      .catch(function (error) {
        //remove loading screen add alert for error

        console.error("error adding document: ", docRef.id);
      });
  };

  var _checkPages = function (mainNavName, callback) {
    var pages = _db.collection("Pages");
    pages
      .where("navName", "==", mainNavName)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          _addData(mainNavName, callback);
        } else {
          callback("Duplicate.");
        }
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  //run firebase
  var _initFirebase = function (callback) {
    //call spinning wheel for loading
    firebase
      .auth()
      .signInAnonymously()
      .then(function (result) {
        console.log("connected to database");

        _db = firebase.firestore();
        //remove loader
        callback();
      });
  };

  return {
    initFirebase: _initFirebase,
    checkPages: _checkPages,
    getAllData: _getAllData,
    updateContent: _updateData,
    deleteContent: _deleteData,
  };
})();

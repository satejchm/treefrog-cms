var TREEFROG_SERVICE = (function() {
  document.addEventListener("DOMContentLoaded", function() {
    try {
      let app = firebase.app();
      let features = ["auth", "database", "messaging", "storage"].filter(
        feature => typeof app[feature] === "function"
      );
      document.getElementById("load");
    } catch (e) {
      console.error(e);
    }
  });

  var _db;

  //initialize firebase connection
  var _initFirebase = function() {
    firebase
      .auth()
      .signInAnonymously()
      .then(function(result) {
        console.log("connected");
        _db = firebase.firestore();
      });
  };

  var _addContact = function() {
    let data = { fName: "Sarah", lName: "Tejchma" };
    _db
      .collection("contacts")
      .add(data)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        _saveData();
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  //goes to firebase and checks for info if it doesn't have it it creates it, if it does it fetches it
  var _saveData = function(pageData) {
    _db
      .collection("Pages")
      .add(pageData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  var _checkMainNavName = function(mainNavName, callback) {
    var pages = _db.collection("Pages");

    pages
      .get()
      .then(function(querySnapshot) {
        console.log("got something ", querySnapshot.empty);
        if (querySnapshot.empty) {
          callback(mainNavName);
        } else {
          let query = pages.where("navName", "==", "home");
          console.log("not empty ", query);
        }
      })
      .catch(function(error) {
        console.log("error", error);
      });
  };

  var _getGetStartedContent = function() {
    let contentStr = `<h1>Treefrog CMS</h1><p>This is the screen where you will create your navigation and page content.</p><p>First, you will need to create a main navigation. Once you have created a main navigation you can create a sub-navigation if you would like to.</p><p>Once you create either a nav or sub-nav a text editor will pop up and you will be allowed to create your page content.</p>`;

    return contentStr;
  };

  var _getCreateNavButtons = function() {
    let buttonString = `<span class="btn btn-dark main-nav" style="margin-right: 30px;">Create Main Nav</span><span class="btn btn-dark sub-nav">Create Sub Nav</span>`;

    return buttonString;
  };

  var _getHomeContent = function() {
    let homeContent = `<h1>Welcome to the Treefrog CMS</h1>
    <p>
      Here you will create your content for your webpages. You won't be able
      to create all page elements but only the content for the page.
    </p>
    <p>
      You must first create the navigation. Once you have the navigation
      created you can add page content and publish the page. You can even
      add sub navigation as well.
    </p>
    <p>
      Your fist step is to click on the Add Navigation link and add your
      first navigation link.
    </p></div>
    `;

    return homeContent;
  };

  var _getHomeStartButton = function() {
    let startBtn = `<span class="btn btn-dark get-started">Get Started</span></div>`;

    return startBtn;
  };

  var _getModalContent = function() {
    let modalContent = `<h2>Use this box to create navigation links.</h2>
    <p style="margin: 0 15px 50px 15px;">
      You can create main navigation and sub navigation. To create sub-navigation you will need to first select a main nav and then create the sub-nav.
    </p>
    <p>
      Using the text box below enter the name of your main navigation.
    </p>
    <form id="form">
    <input name="inputBox" class="inputBox" style="margin-bottom: 30px;" value="" type="text" placeholder="products"><br>
    <div style="flex-direction: row; margin-top: 30px;">
    <span class="btn btn-light create-main-nav">Create Main Nav</span></form><span class="btn btn-light closeModal">Cancel</span></div>`;

    return modalContent;
  };

  var _getModalContentSub = function() {
    let modalContent = `<h2>Create Sub Navigation</h2>
    <p>In order to create a sub navigation you need to select a main nav.</p>
    <p>
      Select a main navigation
    </p>
    <select class="inputBox" id="list"><option value="Products">Products</option><option value="Other">About</option><option value="Other">Contact</option></select>
    <p>
      Using the text box below enter the name of your sub navigation.
    </p>
    <input class="inputBox" type="text" name="navname" placeholder="Bikes">
    <div style="margin-top: 40px;">
    <span class="btn btn-light create-sub-nav">Create Sub Nav</span><span class="btn btn-light closeModal">Cancel</span></div>`;

    return modalContent;
  };

  var _getMainNavCreateContent = function() {
    let contentStr = `<h1>Treefrog CMS</h1><p>Now you have your navigation set now you can create your content. Below you will see your navigation name and a text editor. Create your content in the text editor and then click on "Save Page Info". Once you have done that click on "PREVIEW SITE" to see what your web page looks like.</p><h2 class="inputBoxName"></h2><div id="editor-container"></div>
    </div>`;

    return contentStr;
  };

  var _getSavePageInfoButton = function() {
    let savePage = `<div class="holder"><span class="btn btn-dark sub-page save-data">Save Page Info</span></div>`;

    return savePage;
  };

  return {
    getGetStartedContent: _getGetStartedContent,
    getCreateNavButtons: _getCreateNavButtons,
    getHomeContent: _getHomeContent,
    getHomeStartButton: _getHomeStartButton,
    getModalContent: _getModalContent,
    getModalContentSub: _getModalContentSub,
    getMainNavCreateContent: _getMainNavCreateContent,
    getSavePageInfoButton: _getSavePageInfoButton,
    initFirebase: _initFirebase,
    saveData: _saveData,
    addContact: _addContact,
    checkMainNavName: _checkMainNavName
  };
})();

var TREEFROG_SERVICE = (function() {
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
    </p>`;

    return homeContent;
  };

  var _getHomeStartButton = function() {
    let startBtn = `<span class="btn btn-dark get-started">Get Started</span>`;

    return startBtn;
  };

  var _getModalContent = function() {
    let modalContent = `<h1>Use this box to create navigation links.</h1>
    <p>
      You can create main navigation and sub navigation. To create sub-navigation you will need to first select a main nav and then create the sub-nav.
    </p>
    <p>
      Using the text box below enter the name of your main navigation.
    </p>
    <input class="inputBox" type="text" name="navname" placeholder="products"><br>
    <span class="btn btn-light">Create Main Nav</span><br><span class="btn btn-light cancel">Cancel</span>`;

    return modalContent;
  };

  var _getModalContentSub = function() {
    let modalContent = `<h1>Create Sub Navigation</h1>
    <p>In order to create a sub navigation you need to select a main nav.</p>
    <p>
      Select a main navigation
    </p>
    <select style="width: 50px" id="list"><option value="Products"></option><option value="Other"></option><option value="Other two"></option></select>
    <p>
      Using the text box below enter the name of your sub navigation.
    </p>
    <input class="inputBox" type="text" name="navname" placeholder="Bikes">
    
    <span class="btn btn-light">Create Sub Nav</span><span class="btn btn-light cancel">Cancel</span>`;

    return modalContent;
  };

  return {
    getGetStartedContent: _getGetStartedContent,
    getCreateNavButtons: _getCreateNavButtons,
    getHomeContent: _getHomeContent,
    getHomeStartButton: _getHomeStartButton,
    getModalContent: _getModalContent,
    getModalContentSub: _getModalContentSub
  };
})();

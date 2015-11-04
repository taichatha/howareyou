Moods = new Mongo.Collection("moods");
//Happys = new Mongo.Collection("happys");
if(Meteor.isClient){  
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  // Now render it
  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.body);
  });
}
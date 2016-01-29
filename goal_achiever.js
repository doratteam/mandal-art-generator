if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.download.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.download.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.goalGrid.events({
    'click button': function(e, template) {
      console.log(template);
      var mainGoal = template.find('.mainGoal');
      console.log(mainGoal);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

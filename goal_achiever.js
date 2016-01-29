if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('isDone', false);
  Session.setDefault('mainGoalSet', false);

  Template.download.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.download.events({
    'click button': function () {
      // increment the counter when button is clicked
      if (Session.get('isDone')) {
        alert('TODO: Download');
      } else {
        alert("You're not done yet!");
      }
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.goalGrid.helpers({
    isDone: function() {
      return Session.get('isDone');
    },
  });

  Template.goalGrid.events({
    'click button': function(e, template) {
      //console.log(template);
      var mainGoal = template.find('.mainGoal').textContent,
        subGoals = template.findAll('.subGoal');

        Session.set('mainGoal', mainGoal);
        Session.set('subGoals', subGoals);

        nextGoal();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

var parseInput = function(someStr) {
  return someStr.replace(' ', '').replace('\t', '');
};

var newGoal = function(goalStr) {
  $('.text').fadeOut(800);
  $('.mainGoal').append(goalStr);
  /*
  $('.mainGoal').fadeOut(400, function() {
    $('.subGoal').fadeOut();
  });
  */
};

var nextGoal = function(subGoalArray, template) {
  var mainGoal = subGoalArray[0].textContent;
  console.log(mainGoal);
  newGoal(mainGoal);
};
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('isDone', false);
  Session.setDefault('mainGoalSet', false);
  Session.setDefault('goalJSON', {});

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

  Template.goalGrid.events({
    'click button': function(e, template) {
      // CONTINUE BUTTON

      if (Session.get('mainGoalSet')) { // If the main goal is set, remove the current subGoal from todo and continue
        var subGoal = template.find('.mainGoal'),
            tasks = template.findAll('.subGoal');

            // TODO

            
      } else { // Otherwise, initialize the main goal and subgoal
        var mainGoal = template.find('.mainGoal'),
            subGoals = template.findAll('.subGoal'),
            goalJSON = {}; // JSON object to store all goals
            goalJSON['mainGoal'] = mainGoal.textContent;
            goalJSON['subGoals'] = {};

            for (var i = 0; i < subGoals.length; i++) {
              goalJSON['subGoals'][i] = {
                'content': subGoals[i].textContent,
                'filled': false,
              };
            }
            Session.set('goalJSON', goalJSON);
            Session.set('mainGoalSet', true);
            nextGoal();
      }
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
  console.log(Session.get('goalJSON'));
  
};

var nextGoal = function() {
  var goalJSON = Session.get('goalJSON'),
      nextGoal = '',
      subGoals = goalJSON['subGoals'];
  for (var i = 0; i < 8; i++) {
    var goal = subGoals[i];
    if (goal['filled'] == false) {
      nextGoal = goal['content'];
      break;
    }
  }
  console.log(nextGoal);

  newGoal(nextGoal);
};
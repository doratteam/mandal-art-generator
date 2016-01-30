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
    'click button': function (e, template) {
      // increment the counter when button is clicked
      if (Session.get('isDone')) {
        var tasks = template.findAll('.subGoal'),
            goalJSON = Session.get('goalJSON');

        for (var i = 0; i < tasks.length; i++) {
            console.log(tasks[i].textContent);
            if (tasks[i].textContent) {
              goalJSON['subGoals'][curGoal]['tasks'][i] = tasks[i].textContent;
            } else { // didn't fill in all the boxes. not good.
              alert('Please fill in EVERY box!');
              return;
            }
        }

        Session.set('counter', curGoal + 1);
        goalJSON['subGoals'][curGoal]['filled'] = true; // this subgoal's tasks are filled now
        Session.set('goalJSON', goalJSON); // update goal json


        // Formulate the mandalart table
        goalJSON = Session.get('goalJSON');
        $('.mainGoal_tb').text(goalJSON['mainGoal']);
        subGoals = goalJSON['subGoals'];
        for(var i = 0; i < 8; i++) {
          var subGoal = subGoals[i];
          var subGoalTag = '.subGoal' + (i+1);
          $(subGoalTag).text(subGoal['content']); // Make the subgoals appear
          for (var j = 0; j < 8; j++) { // Make the tasks appear
            var taskTag = '.task_' + (i+1) + '_' + (j+1);
            $(taskTag).text(subGoal['tasks'][j]);
          }
        }

        $('.goalGrid').fadeOut(400, function() {
          $('.mandalart-table').fadeIn();
        }); // Fade out the goal Grid and bring the mandalart table to visible

      } else {
        alert("You're not done yet!");
      }
    }
  });

  Template.goalGrid.events({
    'click button': function(e, template) {
      // CONTINUE BUTTON

      if (Session.get('mainGoalSet')) { // If the main goal is set, remove the current subGoal from todo and continue
        var subGoal = template.find('.mainGoal').textContent,
            tasks = template.findAll('.subGoal'),
            goalJSON = Session.get('goalJSON');

            var curGoal = Session.get('counter');
            console.log(goalJSON['subGoals'][curGoal]);


        for (var i = 0; i < tasks.length; i++) {
            console.log(tasks[i].textContent);
            if (tasks[i].textContent) {
              goalJSON['subGoals'][curGoal]['tasks'][i] = tasks[i].textContent;
            } else { // didn't fill in all the boxes. not good.
              alert('Please fill in EVERY box!');
              return;
            }
        }

        Session.set('counter', curGoal + 1);
        goalJSON['subGoals'][curGoal]['filled'] = true; // this subgoal's tasks are filled now
        Session.set('goalJSON', goalJSON); // update goal json
        nextGoal();

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
                  'tasks': {},
              };
          }
          Session.set('goalJSON', goalJSON);
          Session.set('mainGoalSet', true);
          $('.mainGoal').attr('contenteditable', false);
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
  console.log('in NEWGOAL');
  $('.text').fadeOut(400);
  $('.text-main').fadeOut(800, function() {
    $('.mainGoal').html('<span class="text-main">' + goalStr + '</span>');
    $('.subGoal').html(getEmptySpan());
  });
};

var nextGoal = function() {
  var goalJSON = Session.get('goalJSON'),
      nextGoalStr = '',
      subGoals = goalJSON['subGoals'];
  for (var i = 0; i < 8; i++) {
    var goal = subGoals[i];
    if (goal['filled'] == false) {
      if (i === 7) { // this is the last goal to fill in. disable the continue button
        $('.continue-btn').attr('disabled', true);
        Session.set('isDone', true);
      }
      nextGoalStr = goal['content'];
      break;
    }
  }
  console.log(nextGoalStr);

  newGoal(nextGoalStr);
};

var getEmptySpan = function() {
  return '<span class="text"></span>';
};
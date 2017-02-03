import { Meteor } from 'meteor/meteor';

Meteor.methods({
  checkData: function (fseries, fnumber) {
    if (fseries.length == 2 && fnumber.length == 7)
      return 'Правильно'
    else
      return 'Не правильно';
  }
});
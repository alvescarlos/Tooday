/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var i;
var tasksarray = [];
var menuitem = 0;

var today = new Date();
var todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var tomorrowdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
var midnight = "00:00:00";
var todayunixtime = new Date(todaydate + " " + midnight).getTime() / 1000;
var tomorrowunixtime = new Date(tomorrowdate + " " + midnight).getTime() / 1000;

var main = new UI.Card({
  title: "Tooday",
});

var menu = new UI.Menu({
  backgroundColor: 'white',
  textColor: 'black',
  highlightBackgroundColor: 'black',
  highlightTextColor: 'white',
  sections: [{ title: 'Tasks Today' }]
});

function getTasks() {
  ajax({ url: 'https://api.toodledo.com/3/tasks/get.php?access_token=2a668da7d77b8012af8edfa194c3e9e636349ff6&f=json&comp=0&fields=folder,duedate&start=0', type: 'json' },
    function(data) {
      console.log('Received data.');
      console.log('Today: ' + todaydate + ' (' + todayunixtime + ')');
      console.log('Tomorrow: ' + tomorrowdate + ' (' + tomorrowunixtime + ')');
      
      menu.item(0,0,{title: ""});
                     
      for (i = 1; i < data.length; i++) {
        //console.log('Task: ' + data[i].title + ' Due Date:' + data[i].duedate);
        if(data[i].duedate > todayunixtime && data[i].duedate < tomorrowunixtime && data[i].folder == "2895059"){
          console.log("found task " + data[i].title);
          menu.item(0,menuitem+1,{title: data[i].title});
          menuitem++;
        }
      }
    },
    function(error) {
      console.log('Error receiving Toodledo data.');  
      main.body("Could not retrieve Tasks.");
    }
  );
  
  ajax({ url: 'https://api.toodledo.com/3/tasks/get.php?access_token=2a668da7d77b8012af8edfa194c3e9e636349ff6&f=json&comp=0&fields=folder,duedate&start=1000', type: 'json' },
    function(data) {
      console.log('Received data.');
      console.log('Today: ' + todaydate + ' (' + todayunixtime + ')');
      console.log('Tomorrow: ' + tomorrowdate + ' (' + tomorrowunixtime + ')');
      
      menu.item(0,0,{title: ""});
                     
      for (i = 1; i < data.length; i++) {
        //console.log('Task: ' + data[i].title + ' Due Date:' + data[i].duedate);
        if(data[i].duedate > todayunixtime && data[i].duedate < tomorrowunixtime && data[i].folder == "2895059"){
          console.log("found task " + data[i].title);
          menu.item(0,menuitem+1,{title: data[i].title});
          menuitem++;
        }
      }
    },
    function(error) {
      console.log('Error receiving Toodledo data.');  
      main.body("Could not retrieve Tasks.");
    }
  );
}

getTasks();
menu.show();

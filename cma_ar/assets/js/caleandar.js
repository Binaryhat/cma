/*
  Author: Jack Ducasse;
  Version: 0.1.0;
  (◠‿◠✿)
*/
var Calendar = function(model, options, date){
  // Default Values
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model
  };
  // Overwriting default values
  for(var key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();

  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if(date){this.Selected = date}
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();

  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster){
  console.log("yo");
  console.log(calendar);
  if(typeof adjuster !== 'undefined'){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function AddSidebar(){
    var sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    var monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for(var i = 0; i < months.length - 3; i++){
      var x = document.createElement('li');
      x.className += 'cld-month';
      var n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Add Appropriate Class
      if(i==0){
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);});
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);} );
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += ' cld-pre';}
        else if(i > 4){x.className += ' cld-post';}
        else{x.className += ' cld-curr';}

        //prevent losing var adj value (for whatever reason that is happening)
        (function () {
          var adj = (i-4);
          //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
          x.addEventListener('click', function(){
            typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);} );
          x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }()); // immediate invocation

        if(n==0){
          var y = document.createElement('li');
          y.className += 'cld-year';
          if(i<5){
            y.innerHTML += calendar.Selected.Year;
          }else{
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if(calendar.Options.NavLocation){
      document.getElementById(calendar.Options.NavLocation).innerHTML = "";
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else{element.appendChild(sidebar);}
  }

  var mainSection = document.createElement('div');
  mainSection.className += "cld-main";

  function AddDateTime(){
      var datetime = document.createElement('div');
      datetime.className += "cld-datetime";
      
      var nav_group = document.createElement('div');
      nav_group.className+="nav_group";

      var cal_icon = document.createElement('div');
      cal_icon.className+="cal_icon";
      cal_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="calendar" width="31.139" height="31.139" viewBox="0 0 31.139 31.139"> <g id="Group_93" data-name="Group 93"> <g id="Group_92" data-name="Group 92"> <path id="Path_42" data-name="Path 42" d="M27.49,2.433h-1.46V0H23.6V2.433H7.542V0H5.109V2.433H3.649A3.653,3.653,0,0,0,0,6.082V27.49a3.653,3.653,0,0,0,3.649,3.649H27.49a3.653,3.653,0,0,0,3.649-3.649V6.082A3.653,3.653,0,0,0,27.49,2.433ZM28.707,27.49a1.218,1.218,0,0,1-1.216,1.216H3.649A1.218,1.218,0,0,1,2.433,27.49V11.434H28.707ZM28.707,9H2.433V6.082A1.218,1.218,0,0,1,3.649,4.866h1.46V7.3H7.542V4.866H23.6V7.3h2.433V4.866h1.46a1.218,1.218,0,0,1,1.216,1.216Z" fill="#0078ff"/> </g> </g> <g id="Group_95" data-name="Group 95" transform="translate(4.622 13.988)"> <g id="Group_94" data-name="Group 94"> <rect id="Rectangle_52" data-name="Rectangle 52" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_97" data-name="Group 97" transform="translate(9.488 13.988)"> <g id="Group_96" data-name="Group 96"> <rect id="Rectangle_53" data-name="Rectangle 53" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_99" data-name="Group 99" transform="translate(14.353 13.988)"> <g id="Group_98" data-name="Group 98"> <rect id="Rectangle_54" data-name="Rectangle 54" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_101" data-name="Group 101" transform="translate(19.219 13.988)"> <g id="Group_100" data-name="Group 100"> <rect id="Rectangle_55" data-name="Rectangle 55" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_103" data-name="Group 103" transform="translate(24.084 13.988)"> <g id="Group_102" data-name="Group 102"> <rect id="Rectangle_56" data-name="Rectangle 56" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_105" data-name="Group 105" transform="translate(4.622 18.854)"> <g id="Group_104" data-name="Group 104"> <rect id="Rectangle_57" data-name="Rectangle 57" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_107" data-name="Group 107" transform="translate(9.488 18.854)"> <g id="Group_106" data-name="Group 106"> <rect id="Rectangle_58" data-name="Rectangle 58" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_109" data-name="Group 109" transform="translate(14.353 18.854)"> <g id="Group_108" data-name="Group 108"> <rect id="Rectangle_59" data-name="Rectangle 59" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_111" data-name="Group 111" transform="translate(19.219 18.854)"> <g id="Group_110" data-name="Group 110"> <rect id="Rectangle_60" data-name="Rectangle 60" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_113" data-name="Group 113" transform="translate(4.622 23.719)"> <g id="Group_112" data-name="Group 112"> <rect id="Rectangle_61" data-name="Rectangle 61" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_115" data-name="Group 115" transform="translate(9.488 23.719)"> <g id="Group_114" data-name="Group 114"> <rect id="Rectangle_62" data-name="Rectangle 62" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_117" data-name="Group 117" transform="translate(14.353 23.719)"> <g id="Group_116" data-name="Group 116"> <rect id="Rectangle_63" data-name="Rectangle 63" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_119" data-name="Group 119" transform="translate(19.219 23.719)"> <g id="Group_118" data-name="Group 118"> <rect id="Rectangle_64" data-name="Rectangle 64" width="2.433" height="2.433" fill="#0078ff"/> </g> </g> <g id="Group_121" data-name="Group 121" transform="translate(24.084 18.854)"> <g id="Group_120" data-name="Group 120"> <rect id="Rectangle_65" data-name="Rectangle 65" width="2.433" height="2.433" fill="#0078ff"/> </g> </g></svg>';
      nav_group.appendChild(cal_icon);


      datetime.appendChild(nav_group);      
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var rwd = document.createElement('div');
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );
        // rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" stroke="#000" stroke-width="3" fill="none"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        rwd.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 8 19"><g id="Circle_nav_btn" transform="translate(0 0)"><text id="_" data-name="&lt;" transform="translate(0 14)" fill="#25c887" font-size="13" font-family="Poppins-Regular, Poppins" letter-spacing="0.05em"><tspan x="0" y="0">&lt;</tspan></text></g></svg>';
        nav_group.appendChild(rwd);
      }
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        // fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        fwd.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="30" viewBox="0 0 8 19"> <g id="Circle_nav_btn" transform="translate(-18 0)"> <text id="_" data-name="&lt;" transform="matrix(-1, 0, 0, 1, 26, 14)" fill="#25c887" font-size="13" font-family="Poppins-Regular, Poppins" letter-spacing="0.05em"><tspan x="0" y="0">&lt;</tspan></text> </g></svg>';
        nav_group.appendChild(fwd);
      }


      var today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);
      
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}

      var meeting_type = document.createElement('div');
      meeting_type.className += ' meeting_type';
      datetime.appendChild(meeting_type);

      var events = document.createElement('div');
      events.innerHTML = "Events"
      var meetings = document.createElement('div');
      meetings.innerHTML = "Meetings"
      meeting_type.appendChild(events);
      meeting_type.appendChild(meetings);
  }

  function AddLabels(){
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  function AddDays(){
    // Create Number Element
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";
    // Previous Month's Days
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day prevMonth";
      //Disabled Days
      var d = i%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);

      days.appendChild(day);
    }
    // Current Month's Days
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement('li');
      day.className += "cld-day currMonth";
      //Disabled Days
      var d = (i + calendar.Selected.FirstDay)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += "disableDay";
        }
        
      }
      var number = DayNumber(i+1);
      // Check Date against Event Dates
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        var isEventType = typeof calendar.Model[n].eventType;

        if(evDate.getTime() == toDate.getTime()){
          number.className += " eventday";
          if (isEventType !== "undefined" ){
            number.className += " meeting_event";
          }
          var title = document.createElement('span');
          title.className += "cld-title";
          if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML += calendar.Model[n].Title;
            if(calendar.Options.EventClick){
              var z = calendar.Model[n].Link;
              if(typeof calendar.Model[n].Link != 'string'){
                  a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  if(calendar.Options.EventTargetWholeDay){
                    day.className += " clickable";
                    day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  }
              }else{
                a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                if(calendar.Options.EventTargetWholeDay){
                  day.className += " clickable";
                  day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                }
              }
            }else{
              a.addEventListener('click', calendar.Model[n].Link);
              if(calendar.Options.EventTargetWholeDay){
                day.className += " clickable";
                day.addEventListener('click', calendar.Model[n].Link);
              }
            }
            title.appendChild(a);
          }else{
            title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
          }
          number.appendChild(title);
        }
      }
      day.appendChild(number);
      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }
    // Next Month's Days
    // Always same amount of days in calander
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //Disabled Days
      var d = (i + calendar.Selected.LastDay + 1)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels();
  AddDays();
}

function caleandar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}

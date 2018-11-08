<template>
<b-container>
  <b-container v-if="modification">
    <b-alert show variant="warning">
      The current schedule has been modified but not reviewed nor validated by your manager 
      <b-button  variant="warning" @click.prevent="toValidation" >
        Send it now for validation
      </b-button>
      </b-alert>
  </b-container>
  <b-container v-else-if="reviewing">
    <b-alert show variant="warning">
      This schedule has been sent to your manager for review!
    </b-alert>
  </b-container>
  <full-calendar :config="config" :events="events" @event-drop="updatingLocalSchedule"/>
</b-container>
</template>

<script>
import _ from 'lodash';


const schedule = require('../../static/schedule.json');
let tempSchedule = JSON.parse(window.localStorage.getItem('modifiedSchedule')) || {"horaires" : []}

let eventsToBe = [];
let eventsWaitingValidation = [];
let modified = false;
let reviewing = window.localStorage.getItem('reviewing') || false

if(tempSchedule.horaires === schedule.horaires){
  //TODO -> Update logic to get != between the 2 arrays
  //It will be a way to know if the planning as been reviewed
  //With the API, it may be easier to follow those kind of thing
  // IE, each time you send a schedule modification, you create an issue
  // and you can get the latest answer to your review
  window.localStorage.removeItem('modifiedSchedule');
  tempSchedule = {"horaires" : []}
}

if(tempSchedule.horaires.length <=0){
  schedule.horaires.forEach((element) => {
  const key = Object.keys(element)[0];
  const elemMorning = {
    title: `${key} Morning`,
    start: element[key].start_morning,
    end: element[key].end_morning,
  };
  const elemAfternoon = {
    title: `${key} Afternoon`,
    start: element[key].start_afternoon,
    end: element[key].end_afternoon,
  };
  eventsToBe.push(elemMorning, elemAfternoon);
});
}else {
  if(!reviewing){
      modified = true;
  }
  eventsToBe = eventsToBe.concat(tempSchedule.horaires);
}
eventsWaitingValidation = eventsToBe;

export default {
  name: 'calendar',
  data() {
    return {
      modification : modified,
      reviewing : reviewing,
      events: eventsToBe,
      config: {
        defaultView: 'month',
        eventRender(event, element) {
        },
      },
    };
  },
  methods: {
    updatingLocalSchedule(valReturn) {
      const fs = require('browserify-fs');
      let key = valReturn.title
      let baseEven = this.events.filter(x => x.title === key)[0]
      if(baseEven.start != valReturn.start || baseEven.end != valReturn.end){
        this.modification = true
        let element = { title : key , start : valReturn.start, end : valReturn.end}
        _.remove(eventsWaitingValidation, x => x.title === key)
        eventsWaitingValidation.push(element)
        this.events = eventsWaitingValidation
        console.log(eventsWaitingValidation)
        window.localStorage.removeItem('modifiedSchedule')
        window.localStorage.setItem('modifiedSchedule',JSON.stringify({horaires : eventsWaitingValidation}))
      }
    },
    toValidation(){
      // Here we will to create an issue on the API to notify the manager we have a change in the planning
      window.localStorage.setItem('reviewing', true)
      this.reviewing = true
      this.modification = false
      // Since the API is not a thing, we will simulate the process with the local storage
    }
  },
};

</script>

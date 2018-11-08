<template>
<b-container>
  <b-container v-if="modification">
    <b-alert show variant="warning">
      The current schedule has been modified but not reviewed nor validated by your manager 
      <b-button  variant="warning">
        Send it now for validation
      </b-button></b-alert>
  </b-container>
  <full-calendar :config="config" :events="events" @event-drop="test"/>
</b-container>
</template>

<script>
import _ from 'lodash';


const schedule = require('../../static/schedule.json');
let tempSchedule = JSON.parse(window.localStorage.getItem('modifiedSchedule')) || {"horaires" : []}

let eventsToBe = [];
let eventsWaitingValidation = [];
let modified = false;
if(tempSchedule.horaires === schedule.horaires){
  window.localStorage.removeItem('modifiedSchedule');
  tempSchedule = {"horaires" : []}
}

console.log(tempSchedule.horaires == schedule.horaires)

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
  modified = true;
  eventsToBe = eventsToBe.concat(tempSchedule.horaires);
}
console.log(eventsToBe)
eventsWaitingValidation = eventsToBe;

export default {
  name: 'calendar',
  data() {
    return {
      modification : modified,
      events: eventsToBe,
      config: {
        defaultView: 'month',
        eventRender(event, element) {
        },
      },
    };
  },
  methods: {
    test(valReturn) {
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
  },
};

</script>

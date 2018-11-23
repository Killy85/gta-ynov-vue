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
      {{user}} This schedule has been sent to your manager for review!
    </b-alert>
  </b-container>
  <full-calendar :config="config" :events="events" @event-drop="updatingLocalSchedule"/>
</b-container>
</template>

<script>
import _ from 'lodash';


const schedule = require('../../static/schedule.json');

const fs = require('browserify-fs');

const id = window.sessionStorage.getItem('SessionId');

let tempSchedule = JSON.parse(window.localStorage.getItem(`${id}-schedule.json`)) || { horaires: [] };

let eventsToBe = [];

let eventsWaitingValidation = [];
let modified = false;
const reviewing = window.sessionStorage.getItem('reviewing') || false;

if (tempSchedule.horaires === schedule.horaires) {
  // TODO -> Update logic to get != between the 2 arrays
  // It will be a way to know if the planning as been reviewed
  // With the API, it may be easier to follow those kind of thing
  // IE, each time you send a schedule modification, you create an issue
  // and you can get the latest answer to your review
  window.sessionStorage.removeItem('modifiedSchedule');
  tempSchedule = { horaires: [] };
}

if (tempSchedule.horaires.length <= 0) {
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
} else {
  if (!reviewing) {
    modified = true;
  }
  eventsToBe = eventsToBe.concat(tempSchedule.horaires);
}
eventsWaitingValidation = eventsToBe;

export default {
  name: 'calendar',
  props: {
    userProps: String,
    manager: Boolean,
  },
  data() {
    return {
      user: this.userProps,
      modification: modified && !this.manager,
      reviewing: !this.manager,
      events: eventsToBe,
      config: {
        defaultView: 'month',
        eventRender() {
        },
      },
    };
  },
  methods: {
    updatingLocalSchedule(valReturn) {
      const key = valReturn.title;
      const baseEven = this.events.filter(x => x.title === key)[0];
      if (baseEven.start !== valReturn.start || baseEven.end !== valReturn.end) {
        this.modification = true && !this.manager;
        const element = { title: key, start: valReturn.start, end: valReturn.end };
        _.remove(eventsWaitingValidation, x => x.title === key);
        eventsWaitingValidation.push(element);
        this.events = eventsWaitingValidation;
        window.sessionStorage.removeItem('modifiedSchedule');
        window.sessionStorage.setItem('modifiedSchedule', JSON.stringify({ horaires: eventsWaitingValidation }));
      }
    },
    toValidation() {
      // Here we will to create an issue on the API to notify the manager we have a
      // change in the planning
      window.localStorage.setItem(`${id}-schedule.json`, JSON.stringify({ horaires: this.events }))
      window.sessionStorage.setItem('reviewing', true);
      this.reviewing = true;
      this.modification = false;
      // Since the API is not a thing, we will simulate the process with the local storage
    },
  },
};

</script>

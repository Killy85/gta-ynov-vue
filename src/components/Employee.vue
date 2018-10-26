<template>
  <div class="hello">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">{{ app_name }}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">My info</b-dropdown-item>
            <b-dropdown-item href="#">Account Settings</b-dropdown-item>
            <b-dropdown-item href="#">Change my password</b-dropdown-item>
            <b-dropdown-item href="#">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <b-tabs>
      <b-tab title="Home" active>
        <b-container class="bv-example-row">
        <b-row class="text-center">
          <b-col>
            <b-container fluid class="p-4 bg-dark">
              <b-row>
                <b-col>
                  <b-img rounded="circle" width="75" height="75" blank-color="#777" class="m-1" src="https://picsum.photos/250/250/?image=54" alt="Thumbnail" />
                  <p class="text-light"> {{ name }}</p>
                  <p class="text-light"> {{ job }} </p>
                  <b-button variant="primary">
                    Request Time Off
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
            <b-container fluid class="p-4">
             <p> My contract: </p>
                <p>  Started at {{ beginDate }} </p>
                <p v-if="endDate">  Finish at {{ endDate }} </p>
                <p>  {{ hoursAWeek}} hours per week </p>
            </b-container>
          </b-col>
          <b-col cols="12" lg="8">
            <b-container fluid class="p-4">
            <label> Name </label> 
            <b-form-input v-model="form.name"></b-form-input>
            <label> Job </label> 
            <b-form-input v-model="form.job"></b-form-input>

            <p>Your infos : {{ form.name }} {{ form.job }}</p>
            </b-container>
          </b-col>
        </b-row>
        </b-container>
      </b-tab>
      <b-tab title="My info">
        <br>I'm the second tab content
      </b-tab>
      <b-tab title="Planning">
        <calendar></calendar>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>

import Calendar from '@/components/Calendar';

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export default {
  name: 'Employee',
  data() {
    return {
      app_name: 'GTA-Ynov-Vue',
      events: [],
      name: 'Basic Name',
      job: 'This is a job',
      beginDate: formatDate(new Date()),
      endDate : formatDate(new Date()),
      hoursAWeek : 'Too Much',
      form : {
        name : this.name,
        job : this.job
      }
    };
  },
  components: { Calendar },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }  
</style>

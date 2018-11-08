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
          <b-col lg="4" id="col_home">
            <b-container fluid class="p-4 bg-dark">
              <b-row>
                <b-col>
                  <b-img rounded="circle" width="75" height="75" blank-color="#777" class="m-1" src="https://picsum.photos/250/250/?image=54" alt="Thumbnail" />
                  <p class="text-light"> {{ name }}</p>
                  <p class="text-light"> {{ adress }} </p>
                  <p class="text-light"> {{ job }} </p>
                  <p class="text-light"> {{ email }} </p>
                  <p class="text-light"> {{ phone }} </p>
                  <p class="text-light"> {{ birthdate }} </p>

                  <b-button variant="primary">
                    Request Time Off
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
            <b-container fluid class="p-4">
            <p><h2> My contract:</h2></p>
                <p>  Started at {{ beginDate }} </p>
                <p v-if="endDate">  Finish at {{ endDate }} </p>
                <p>  {{ hoursAWeek}} hours per week </p>
            </b-container>
          </b-col>
          <b-col cols="12" lg="8">
            <b-alert variant="success" show dismissible>Welcome back {{name}}!</b-alert>
            <p>Your infos:</p>
          </b-col>
        </b-row>
        </b-container>
      </b-tab>
      <b-tab title="Updating my informations">
        <b-container fluid class="p-4">
            <label> Name </label>
            <b-form-input v-model="form.name_form"></b-form-input>
            <label>Birthdate</label>
            <b-form-input type="date" v-model="form.birthdate_form"></b-form-input>
            <label>Adress</label>,
            <b-form-input v-model="form.adress_form"></b-form-input>
            <label>Phone number</label>
            <b-form-input type="text" v-model="form.phone_form"></b-form-input>
            <label> Email </label>
            <b-form-input type="email" v-model="form.email_form"></b-form-input>
        </b-container>
      </b-tab>
      <b-tab title="Planning">
        <calendar v-model="events"></calendar>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>

import Calendar from '@/components/Calendar';

function formatDate(date) {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}`;
}

export default {
  name: 'Employee',
  data() {
    return {
      app_name: 'GTA-Ynov-Vue',
      events: [],
      name: 'Basic Name',
      adress : "7 rue du bout du monde, 44000 Nantes",
      birthdate : "10/10/1999",
      phone : "0606060606",
      email : "bonjour@company.com",
      job: 'This is a job',
      beginDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
      hoursAWeek: 'Too Much',
      event: [],
      form: {
        name_form: this.name,
        adress_form: this.adress,
        birthdate_form: this.birthdate,
        phone_form: this.phone,
        email_form: this.email
      },
    };
  },
  components: {
    Calendar
  },
  watch: {
    form: {
      handler(val, oldval) {
        this.name = val.name_form;
        this.adress = val.adress_form;
        this.birthdate = val.birthdate_form;
        this.phone = val.phone_form;
        this.email = val.email_form;
      },
      deep: true,
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #col_home{
    word-wrap: break-word
  }

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

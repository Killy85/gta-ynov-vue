<template>
  <div class="hello">
    <b-modal id="modal1" title="Changing Password" @ok="changePassVal">
      <b-form-input type="password"
                      placeholder="Enter your current password"
                      v-model="pass"></b-form-input>
      <b-form-input type="password"
                      placeholder="Enter your new password"
                      v-model="pass_new"></b-form-input>
    </b-modal>

      <b-modal id="reviewPlanning" title="Bootstrap-Vue" @ok="validatePlanning">
        <calendar :userProps="modal.people"
                  :manager="true"
                  v-model="events">
        </calendar>
      </b-modal>

    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">{{ app_name }}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ name }}</em>
            </template>
            <b-dropdown-item v-b-modal.modal1 >Change my password</b-dropdown-item>
            <b-dropdown-item @click="logout" >Logout</b-dropdown-item>
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
            <p>
              <h2>My contract:</h2>
            </p>
                <p>  Started at {{ beginDate }} </p>
                <p v-if="endDate">  Finish at {{ endDate }} </p>
                <p>  {{ hoursAWeek}} hours per week </p>
            </b-container>
          </b-col>
          <b-col cols="12" lg="8">
            <b-alert variant="success" show dismissible>Welcome back {{name}}!</b-alert>
            <b-alert variant="success" v-if="pass_changed" show dismissible>
              Your password has been changed!
              </b-alert>
            <b-alert variant="danger" v-if="error_on_change" show dismissible>
              There has been an error while changing your password
              </b-alert>
            <b-container>
              <p>This are the planning you have to review</p>
                <b-alert v-for="(review,mail) of reviews" variant="warning"  show>
                  {{ review }} has changed his/her planning <b-btn :click="setUser(mail)"
                  v-b-modal.reviewPlanning>Review it!</b-btn></b-alert>
            </b-container>
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
  name: 'Manager',
  data() {
    return {
      app_name: 'GTA-Ynov-Vue',
      events: [],
      name: 'I\'m a manager',
      adress: 'Somewhere',
      birthdate: '10/10/1999',
      phone: '0606060606',
      email: 'bonjour@company.com',
      job: 'This is a job',
      beginDate: formatDate(new Date()),
      endDate: formatDate(new Date()),
      hoursAWeek: 'Too Much',
      event: [],
      pass: '',
      pass_new: '',
      pass_changed: false,
      error_on_change: false,
      form: {
        name_form: this.name,
        adress_form: this.adress,
        birthdate_form: this.birthdate,
        phone_form: this.phone,
        email_form: this.email,
      },
      reviews: [
        ('John Doe', 'bonjour@company.com'),
        ('Irvin Mc Guire', 'else@company.com'),
        ('Another Nice Name', 'test@company.com'),
      ],
      managed_peoples: [
        'John Doe',
        'Irvin Mc Guire',
        'Another Nice Name',
        'Uther Pendragon',
        'Neil Pencer',
        'Raymond Holt',
      ],
      modal: {
        people: null,
      },
    };
  },
  components: {
    Calendar,
  },
  watch: {
    form: {
      handler(val, oldval) {
        if (val !== oldval) {
          this.name = val.name_form ? val.name_form : this.name;
          this.adress = val.adress_form ? val.adress_form : this.adress;
          this.birthdate = val.birthdate_form ? val.birthdate_form : this.birthdate;
          this.phone = val.phone_form ? val.phone_form : this.phone;
          this.email = val.email_form ? val.email_form : this.email;
        }
      },
      deep: true,
    },
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('SessionId');
      this.$router.push('/');
    },
    changePassVal() {
      const id = window.sessionStorage.getItem('SessionId');
      const credentials = require('../../static/credential.json');
      const user = credentials[id];
      if (this.pass === user.pass) {
        // This is of course not working - We'll have to call the API
        // to change the user pass
        this.pass = this.pass_new;
        this.pass_changed = true;
      } else {
        this.error_on_change = true;
      }
    },
    setUser(mail) {
      if (this.modal.people && this.monthIndex.people !== mail) { this.modal.people = mail; }
    },
    validatePlanning() {
        // Here is the method were we would validate planning updates
        // The fact we have no access to an API limitate this behaviour
        // We may use borwserify and fs to change the input value
        // But it would not be worth the work

        //api.updatePlanning(this.modal.people, window.localStorage.getItem(usermail-schedule)

        window.localStorage.removeItem(this.modal.people + '-schedule.json')
        window.sessionStorage.removeItem('modifiedSchedule');
        window.sessionStorage.removeItem('reviewing');
    }
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

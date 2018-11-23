<template>
<b-container id="login-container" fluid>
    <div id="background">
        <img src="../assets/img/bg_login.jpg">
    </div>
    <h1> Welcome to your work planning!</h1>
    <b-alert v-if="error_on_login" show variant="danger">
      Error while login you : Email or password does not match
    </b-alert>
    <b-jumbotron id ="jumbotron">
        <b-form @submit="onSubmit">
            <b-form-input id="exampleInput1"
                type="email"
                v-model="form.email"
                required
                placeholder="Enter email">
            </b-form-input>
            <br>
            <b-form-input id="psswrInput"
                type="password"
                v-model="form.pass"
                required
                placeholder="Enter password">
            </b-form-input>
            <br>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-jumbotron>
</b-container>
</template>

<script>


export default {
  name: 'Login',
  data() {
    return {
      app_name: 'GTA-Ynov-Vue',
      form: {
        email: '',
        pass: '',
      },
      error_on_login: false,
    };
  },
  methods: {
    onSubmit() {
      const credentials = require('../../static/credential.json');
      if (credentials[this.form.email]) {
        if (credentials[this.form.email].pass === this.form.pass) {
          if (credentials[this.form.email].role === 'employee') {
            window.sessionStorage.setItem('SessionId', this.form.email);
            this.$router.push('/home');
          } else if (credentials[this.form.email].role === 'manager') {
            window.sessionStorage.setItem('SessionId', this.form.email);
            this.$router.push('/manager');
          } else {
            this.$router.push('/error');
          }
        } else {
          this.error_on_login = true;
        }
      } else {
        this.error_on_login = true;
      }
    },
  },
  mounted() {
    if (window.sessionStorage.getItem('SessionId')) {
      this.$router.push('/home');
    }
  },
};
</script>


<style scoped>

h1 {
    color: beige;
}
#login-container {
    height: 100vh;
    padding: 10%;
    max-height: 100vh;
}

#background {
    filter: blur(18px);
    -webkit-filter: blur(18px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
}
img {
    width: 100vw;
    height: 100vh;
}
#background:hover {
    opacity: .6;
    filter: blur(.5px);
}


#jumbotron{
    filter: initial;
    -webkit-filter: initial;
    position: relative;
}
</style>

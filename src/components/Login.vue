<template>
<b-container id="login-container">
    <b-alert v-if="error_on_login" show variant="danger">Error while login you : Email or password does not match</b-alert>
    <b-jumbotron>
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
    form : {
        email : "",
        pass : ""
    },
    error_on_login : false
    };
},
methods : {
    onSubmit() {
        let credentials = require("../../static/credential.json")
        if(credentials[this.form.email]){
            if(credentials[this.form.email].pass === this.form.pass){
                if(credentials[this.form.email].role === "employee"){
                    window.sessionStorage.setItem('SessionId', this.form.email)
                    this.$router.push('/home')
                }
                else {
                    this.$router.push('/error')
                }
            } else {
                this.error_on_login = true
            }
        } else{
            this.error_on_login = true
        }
    }
},
mounted() {
    if(window.sessionStorage.getItem('SessionId')){
        console.log("Bonjour")
        this.$router.push('/home')
    }
}
};
</script>


<style scoped>
#login-container {
    margin-top: 10%;
}
</style>
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
        <br>I'm the first fading tab
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

export default {
  name: 'Employee',
  data() {
    return {
      app_name: 'GTA-Ynov-Vue',
      events: [],
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

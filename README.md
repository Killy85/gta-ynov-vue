# gta_ynov_vue

> This project aim to create an application which will help to manage work time for employees and manager

## Time Management

As asked by the speaker running the lesson, this section will be providing prevision en feedback on work done for each session

### 26 October 2018

#### TODO

As the application we were asked for is quite big, I will get to it a way I'm not used to : I'll start with the front !
Today, my goal is to setup a new Vue.js application, using boostrap-vue and to create an interface I may feed with the
large amount of data we need to display. I will focus on the employee interface and the differents tabs we will need.

### What I've done '?'

The main structure is here. I've got a Vue.js project running and webpack building my app correctly. I did begin the interface for the employee personna. This is really basic and need more thinking and refinment.

The problem here is that there is a lot of functionnalities to add to one interface. Next session work may be about filter functionnalities I feel I'm able to implements, and add values loading to this interface (loads user profile from json)

First time with webpack, and thanks to Vue.js it wasn't so hard. A lot of informations are already provided by the *vue-cli* template.

Thanks to boostrap, the interface is compatible with a mobile use. You may find [here](https://mega.nz/#!rBwlUQqQ!RcIQuLJ3RHk-x7MvStb0y4jGeaNos_R7QqtoUTNtHok) the vieo capture of the site from my mobile.

You'll of course see that none of the button are linked to methods. The application is pure view, no functionnalities are yet implemented.

### 08 November 2018

#### TODO

Today's goal is to add data to the first view, while finishing it. I will be using static JSON files to mock calls to a potential API. 
Also it may be great to begin the login portal and see how we may manage credentials. There again we will use JSON file to store fake data that will represent response of the API.

### What I've done '?'

The skeleton begin to use data. I used static json files to mock data API. I make processing less readable ( need to search a collection) but it works! You now have a home screen which display your main information, a tab you can use to update those and a last planning tab. This last tab show the next day of the employee (month view). Events are set as they are in the json file. The user may move those events (drag'em up or down) or resize them. This will trigger a method to store this in a temporary file. Also the user is prompted with a message saying the actual schedule has been modified and has to be validated before to be official.

Then, i've worked and a login page. Once again, valid credentials are stored in a json file. This is now the entry point of the application. You may log in with the following credentials : bonjour@company.com and password is `oui`.

This will lead you to the homepage. You may see there are others account, corresponding to others roles we may devellop later. Those point to a Not Found page at the moment.

### 09 November 2018

#### TODO

We only work half a day today. So goals will be lights. It first will be about to repair the form used to change infos about the user

### What I've done '?'

The current form is not emptying datas anymore. Also I've made the navbar button working. You can now logout and change your password. The first out send you back to the login page. The second one ask you for your current password and the new one. You are then prompted about the status of the change. Of course, it did not really change it, as we have no back-end running.


### 15 November 2018

#### TODO

Planning problem meaning only half a day of work. Today the task will be to think about an interface usable for a manager user. This is an important part in order to create a easy to use and read view which will display the planning of the employee who are managed.

This mean the work will not be in the code. I'll upload visuals at the end of the session

### What I've done '?'

You can see in the templates directory an idea of what the manager interface will look like. It's not finished but it is an idea of how a manager may see the differents planning. We now will have to try to recreate this interface using Vue in order to see how it adapt to a mobile view.


### 16 November 2018

#### TODO

Today's session will be about to implement the interface created yesterday. We will update the login page to accept manager account and display the new page.


### What I've done '?'

This has not worked out as expected. The vue-full-calendar did not include a timeline option, which is the solution I was looking for. It is a payinig option so we have to find something else. I did create the manager view, which is quite close to the employee view. For the moment I use to spawn a calendar for each person managed by this person.

### 22 & 23 November 2018

#### TODO

Those two days, I'll focus on making planning functionnalities available. For example, I'd like to find a way to transfer to temporary planning from the employee view to the manager view in order for the last one to validate/refuse it. This will use the localstorage and maybe json files.


### What I've done '?'

The manager interface now allows the manager to see and manager the planning changes asked by the user. Using alerts and modals we display planning changes in order to make it readable by the user. What is missing at the moment is the view which may allow the manager to get an oversee of the plannings of people he is managing.


## Access *state-of-the-art* application

The project is builded and pushed to [my github.io page](https://killy85.github.io/#/)


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

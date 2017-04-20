## Team-IT Web App

URL: team-it.gbirdtech.com
[Github:](https://github.com/gbird3/team-it) https://github.com/gbird3/team-it

[Team-It](team-it.gbirdtech.com) is meant to be a team management system. In its
perfect form, the app would be completely customizable so as to fulfil the needs
of any and all teams.

As of right now, it is merely a sad, and barely usable prototype (though a great
  starting point for when I completely redo it)

## Technologies
 1. React
 2. React Router
 3. Firebase
 4. [React Big Calendar](https://github.com/intljusticemission/react-big-calendar)

## Install
To use the project you will need node.js on your machine and the github repo cloned
locally.

Additionally, you will need to setup a firebase account (free) and add the env variables
to a .env file.

Once those are complete, you can do the following steps:
  1. npm install
  2. npm start

Those should bring the web application up on your local machine.

Enjoy!!

## Difficulties
The biggest lesson learned from this assignment is I am now starting to understand
why frameworks such as redux exist. I struggled for hours trying to get state to play
nicely with firebase and react-router.

I also struggled with date formatting when it came to the calendar aspect of the
application. The third-party library required everything to be in a specific format
for it to work correctly.

Because this was my first project using react and firebase, there are many things
I would do differently on future projects. The most notable of them being that I
need to spend more time planning out the project at the beginning.

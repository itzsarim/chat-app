# Documentation of the project

## Notes on starting the app
This app is built using create react app(CRA) as the starting point. To run this app, please downaload and install yarn on your machine(https://classic.yarnpkg.com/en/docs/install), then use command `yarn add` followed by `yarn start` to run the app. You will also need to run the server using `yarn api-server`

## Notes on what was built 

This app covers all the specifications given in the `detailed-design-specs` file.
* Its been taken care that the app is accessible(scores 97% on lighthouse audit). Try using keyboard to navigate through the app.
* Use of right function naming conventions and breaking down in component makes sure that comments are not needed to explain the flow. `index.js` loads the `App`. You can start reading the component floe from `App.js`.
* There is a `Login` page which takes in a username that should be between 3 and 16 characters and can contain nothing but alphanumeric characters, - and _.
* Once you login by entering a valid username, you are taken to the `MainView`, which has a `Sidebar` with name of the person who logged in and how long it has been since they logged in. There is a list of all rooms available based on the server response(Note: you cannot add a new room, as the server does not support it). 
* When you click on a list item(room) the `ChatView` gets populated with room details and messages in that room. 
* You can add new messages in the room , these messages get added to the bottom of the chat and is also scrolled to the bottom.
* The app is responsive on desktop.
* CSS follows a scalable and modular approach, and nowhere will you find any nested css or css tightly coupled with the HTML
* BONUS - users on 2 different windows can chat with each other \m/

## Things that could have been added/done better
No app is perfect, and specially not the one which was built in a tight time constraint :).
Nice to have things that i would want to add if i were to make it production ready.
* Internationalization - pretty straightforward with the structure of my app
* Unit tests - code is broken down into testable components
* Breaking some components further into components - towards the end my `ChatView` component became a little ugly, and could benefit from further breaking it down into further components. `Input` box on the `Login` as well as on the `ChatView` component could have been pulled out into a common component.
* Adaptive design - the app does not work well with mobile phones. I have not used any media-query/breakpoints in the CSS, the use of %'s and relative sizing has made the app responsive on the desktop and would also work well on a tablet.
* Persistence - I would also add persistence for the username, so that once logged in, you dont have to log in again on refresh.



## Context on design decisions and framework choices
* I chose to use React for this app as a realtime app fits very well with Reactive programming paradigm.
* To increase productivity I chose to spin up the basic app structure along with build and dev tolls using create react app. 
* To increase productivity in creating actions/reducers, I used redux-toolkit createslice.
* I chose to poll the server as that was the only feasible option without the ability to modify the server. Currently the polling happens every 1500 milliseconds.
* My redux state maintains 3 `slices` of data, `userInfo`, `roomInfo`, and `chatInfo`, which works well for current API design, but it could benefit from a normalized state for a complex system.

## Flow of data
* After Login, Selecting a room from sidebar changes the selectedRoomId in the global state, which triggers fetching of room details and starts the polling for the messages in the room. Selecting another room will clear this interval and start another polling for the new room. Posting a message makes the POST call, the polling then gets latest messages and updates the global state of messages, thus updating the chat room with latest messages.

-------------------------------------------------------------------------------------------------

# DoorDash Frontend Interview Project
* TLDR: *Build a chat app with real APIs*
* Time: *3hr - 6hrs*
* Allowed tools & frameworks: *anything*
* Show us what you got!

## Howdy! 👋  

This is the frontend interview project for DoorDash! We're going to ask you to build something with whatever tools you want, whatever language you want, or whatever.

If you want to keep it vanilla, that's fine—this should take you 2/3 hours with jQuery, plain ol' HTML and CSS. If you want to use other tools, (like Angular, React, Vue, Ember) that's fine too—*just make sure you have enough documentation for us to be able to build and run the app*. We just want you to build something that's maintainable, testable, and that you're proud of.

The goal here is not to demonstrate your pure coding ability—we're here to give you a problem that's not totally spec'd out for you, and we want to see far you can go. How good can you make it without much guidance? What are the sort of improvements and choices you'll make as you build this thing, and where do your priorities lie?

Remember, building stuff is supposed to be fun, so be creative! Happy coding!

## Getting started
There's a few things you need to get started on to get this to work.

### 1. Installing minimum deps
Make sure you have `node` installed, with a version greater than `7.0.0`. We highly recommend [`nvm`](https://github.com/creationix/nvm), or just installing the latest version of `node` with `brew install node` on macOS.

Once you have a good `node` installed, run `npm install` in this repo to get your dependencies.

### 2. Serving your app
By default, you can run `npm start` to run your app, serving the files from `/public`. You can, however, change this to whatever you want! Just make sure you document the changes somewhere so we can run this.

### 3. Running the api server
We have provided a simple api server for you. You can run `npm run api-server` to start it. Read the [spec](./spec/api-endpoints.md) for more details on the api.

### 4. Read the spec
There's a pretty fleshed out spec in the `./spec` directory. Checkout the [design specs here](./spec/designs/detailed-design-specs.md) to understand what you're building!

## What you can use to build
You can use literally _anything_ that can be served on the web. You should use what you're most comfortable with, no matter what (even if you heard that we use React). **We want you to use the tools you know, and we want to see you at your best and most productive.** 

Secondly, don't worry much about setting up build tools—use something simple and fast to spin up:
* If you're using Ember, it's fast to spin up something with [`ember-cli`](https://ember-cli.com/)
* If you're using Angular 1.x, you can use [this yeoman generator](https://github.com/yeoman/generator-angular) to spin up a scaffold
* If you're using Angular 2+, you can use [Angular CLI](https://cli.angular.io/) to create a new app scaffolding
* If you're using React, it's easy to use [`create-react-app`](https://github.com/facebookincubator/create-react-app) to start the project
* If you're using Vue, [`vue-cli`](https://github.com/vuejs/vue-cli) will be a fast way to get started.
* For anything else, use your favorite generators or templates!

## How we'll test this
We're going to review your code to see how you work and how you make tradeoffs—no automated tests for this one. We'll schedule a call with you after you submit this to walk through the code to understand your thought process. If you come on-site, we'll take your code here, and we'll build on it to test other things—how you write tests, how you build out new features and refactor old code, etc.

## We'll be evaluating for:
* Solid UX without strict guidance
* Chat Features
* Code quality
* Readability
* Testability
* Maintainability
* Communication 

## Submission Instructions
1. Write up instructions on how to run your project and ensure there's ample documentation on your intent
2. Create a zip file containing your solution and all the starter files provided by us. Make sure we can run the application using just the files in the zip. Delete `node_modules` before zipping the project files.
3. Name your zip file as `dd_takehome_<framework>.zip` (for example, if you used react for the project, your zip file would be named `dd_takehome_react.zip`
4. Share the zip file with the recruiter using any file sharing service (Google Drive, Dropbox, etc.) - GMail unfortunately blocks .js files even if they're zipped. Make sure the recruiter has permissions to access the zip file.
5. We'll review and get back to you soon!

## Extra notes

A couple of things to say:

1. Feel free to change the language you're writing this in. We want to see what good code looks like for you - feel free to add a `gulpfile`, setup `webpack`, or just use the plain JS, CSS, and HTML you're given. It's all up to you!

2. Feel free to use any libraries or frameworks you want, with the idea that they're increasing your productivity, not writing the app for you.

3. **Please don't** modify the server.js file. We're looking to see your front-end skills!

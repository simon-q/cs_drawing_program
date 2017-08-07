# cs_drawing_program
credit suisse coding test

requires
* Node.js > 6.5.0
* npm > 3.10.10

## install
```sh
$ npm install
```

## run
```sh
$ node main
```

## run tests
```sh
$ npm test
```

## test coverage
```sh
$ npm run coverage
```

# notes
Application is structured into 3 layers - similar to MVC
The model layer contains the Canvas and Renderer that uses the canvas to draw shapes on it.
The View relies on system's stdin and stdout.
The data between Model and View flows only through the middle layer - Controller.
Controller uses asynchronous Commands to implement the logic for deciding how should application react to the input from user.
## to add a new command
* Create a new class extending *Command*
* Make sure all the services the command needs are injected via constructor to the *CommandFactory*
* In the *CommandFactory* Add code that instantiates the command and injects all that is needed into the constructor.
* In you *Command* subclass implement *_execute* function where you perform the action that the command should carry out.
Use *resolve* or *reject* to finish the command.
* Add a rule in *Controller* to dispatch the command according to previous command and it's result.

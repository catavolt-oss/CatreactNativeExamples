CatreactNativeExamples
=================

These examples use the Catavolt React Libraries (Core)


## Example Apps

**Buzz Feed**
Use React Native and the ‘Core’ Catavolt React Components.  A good example of a completely custom application.
                                                
# Project Setup

* If using Typescript (recommended), [WebStorm](https://www.jetbrains.com/webstorm/) is recommended as an ide, as it has very good Typescript support

* Follow the [React Native Instructions]( https://facebook.github.io/react-native/docs/getting-started.html#content) to get setup for your particlar platform

* Globally install the react-native command line tools with: npm install -g react-native-cli

* From this project's root directory (CatreactNativeExamples), run 'npm install'  

# Component Model Overview can be found [here] (https://rawgit.com/catavolt-oss/catreact-examples/master/docs/componentOverview.pdf)
# Core Component User's Guide can be found [here] (https://rawgit.com/catavolt-oss/catreact-examples/master/docs/CatavoltReactSDKUserGuide.pdf)
# Catavolt React Component API docs can be found [here](https://rawgit.com/catavolt-oss/catreact-examples/master/docs/catreact/index.html)
# SDK API docs can be found [here](https://rawgit.com/catavolt-oss/catreact-examples/master/docs/catavolt-sdk/index.html)

# Configuring WebStorm for Typescript:

* Open the catreact project root folder in WebStorm
* Go to WebStorm -> Preferences -> Languages and Frameworks -> Javascript
* Set the Language Level to JSX Harmony
* Go to WebStorm -> Preferences -> Languages and Frameworks -> TypeScript panel
* Choose 'Enable TypeScript Compiler'
* Make sure the path to the Node interpreter is correct
* Optionally choose to use a custom version of the Typescript Compiler (1.8+ is required)
* Choose 'Use tsconfig.json' radio option
* Click 'Apply' and 'Ok'
* Open the TypeScript Compiler panel at the bottom of WebStorm and Choose 'Compile All' from the buttons on the left

# Runing the projects

* For android, start the package manager in a terminal with 'react-native start'.  Then run 'react-native run-android'
* For iOS, open the ios project in XCode and run it



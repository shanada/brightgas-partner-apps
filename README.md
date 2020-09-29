# BRIGHT GAS PARTNER APPS
[![react-native](https://img.shields.io/badge/react--native-0.60.5-blue)](https://facebook.github.io/react-native/)
[![react](https://img.shields.io/badge/react-16.8.6-blue)](https://reactjs.org)
[![Android](https://img.shields.io/badge/platform-android-green)](https://www.android.com)
[![Ios](https://img.shields.io/badge/platform-ios-lightgrey)](https://www.apple.com/id/ios/)

This repository contain alot of modules and library, which is you can see in [package.json](https://gitlab.com/devhoz-id/mobile-apps/brightgas-partner-apps/blob/master/package.json). Carefully about running from source, maybe you should read about [Instruction]() from [Wiki Page]().

## Package Depencies
This repository are using [npm](https://www.npmjs.com) for primary package management, if you're prefer using another package management, such like [yarn](https://yarnpkg.com/), you should read from [Wiki]() for more instructions.

## Contributing
To be make sure for us, for contributing on this repository, you must make a choice, which one you're on contribute,are you prefer code ? such a finding bugs, request and discussion about features idea or documentation, like readme,wiki, or even correction language, like wrong phrase or sentences. If you wanna both for contribute, feel free but don't screw one on another just contact each other for sake of a goodnes to everyone.

## Code of Conduct
This Section are special for contributing on codes, there are some plenty code ethic on this stuff,
1. If you wanna logging a result from API or a function use syntax like `console.warn(param)` or `console.log(param)`.

2. Please before doing logging, use comment syntax like this:
   ```
   _someFunction = (valueParam) => {
       this.setState({ nameState: valueParam }, () => {
           this._otherFunction()
       })
       // here you must include the comment section
       console.warn(valueParam)
   }
   ```
3. If you wanna create a new function please use *underscore* before function name like this below:
    ```
    // this function for bla bla
    _newNameFunction = () => {
        ......
    }
    ```
    and don't forget to add comment before function, this is for make everyone easy to read for your function and purposes.

4. We have a rule in *variable* and *state* name to, each variable have type value and purpose for make everyone easy to understand, please see the example:
   ```
   // variable for boolean value
   isSomethingElse

   // please use camelCase style and use same phrase for first sentances and then purpose sentences
   userID
   userPassword
   ```
5. For *state* and *props* , please use deconstruction code style like this example:
   ```
   // state deconstruction
   const { nameState1, nameState2 } = this.state
   // props deconstruction
   const { navigate } = this.props.navigation
   ```
6. Please create space between functions, this is to be make sure for us if these function have different purpose or not, because is easy to read and not to much like noodles.
   ```
   // function 1
    _functionName1 = () => {
       .....
   }

   // function 2
    _functionName2 = () => {
       .....
    }
   ```

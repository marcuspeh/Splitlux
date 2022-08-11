# Splitlux
When we go on trips in groups, expenses are often paid by one (or two) person. Our project is on splitting expenses within the group at the end of the trip. It will provide a clear breakdown of the expenses as well as reduces the effort required to decide on how the payment works.

# Background
Since almost everyone will have their phones with them whatever they go, our frontend will be based on React Native, which supports both Android and iOS devices. Refer to the branch for more info.

# Requirements
* NodeJs
* Android Studio

# Getting started
1) Clone this repo twice (1 for [backend](https://github.com/marcuspeh/Splitlux/tree/backend) and 1 for the [app](https://github.com/marcuspeh/Splitlux/tree/frontend_2))
2) Run the backend server (Instructions are in [backend](https://github.com/marcuspeh/Splitlux/tree/backend) branch)
3) Run android simulator on android studio. Follow the setup [here](https://reactnative.dev/docs/environment-setup)
4) In `pacakge.json`, update emulator id in `prestart`
5) Update `API_URL` in `src/common.ts`
6) Run `npm run start`
7) Run the app in android studio to compile


## Useful Resouces
* [React Native shadow generator](https://ethercreative.github.io/react-native-shadow-generator/)
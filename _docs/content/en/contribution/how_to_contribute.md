---
title: 'Want to contribute? We want your help!'
description: 'how to contribute to vue_deckgl'
position: 20
category: 'Contributing'
version: 1.4
fullscreen: false
menuTitle: 'How to Contribute'
---

- Fork the repo and checkout a branch (named off issue vd-XX) based off development. 
- Make changes
- Create a PR!
- Once reviewed and approved, we will merge in the code into development. 

## Running test app
- To run the example component to test development, you need [vue-cli](https://cli.vuejs.org/) installed.
- Then change directory into dev `cd dev`
- Then you can run `vue serve` to serve the example vue component.
- You'll also need a env.js file to keep your mapbox token in until we find a clever way of handling this. 
  - Place a .env.js file in your root directory with the following details. Gitignore is set up to ignore this file.
  ```
  export default 'TOKEN GOES HERE
  ```
- You should be able to start adding/making changes now and see it represented in the example App.
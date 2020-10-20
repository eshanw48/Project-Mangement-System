# Project Management System

A platform to help managers and teams keep track of their tasks

<br/>

### Project Structure
The platform's front end is built using [`react`](https://reactjs.org/), a `javascript` library that makes building dynamic user interfaces easier. As such, all `.js` files containing `react` based code must be transpiled using [`babel`](https://babeljs.io/), and then packaged together into one, bundled file, using [`webpack`](https://webpack.js.org/). The project directory structure is as follows:

```json
package.json        // config for npm and dependencies
.babelrc            // config for babel
webpack.config.js   // config for webpack
server.js           // express server for hosting during development
src/                // contains primary source code
    assets/         // contains images and other asset files
    styles/         // contains custom css styles
    components/     // contains custom react components
    index.js        // entry point for platform
dist/               // contains all build assets
    index.html      // main HTML file that uses the bundled js
```

<br/>

### Setup and Usage
First clone the repository, and `cd` into the project root. Install all `node` dependencies with
```shell
npm install
```
Since `react-router` is used to have page routes (e.g. `/login` for the login page), a temporary development server with `express` is used. As mentioned before, `webpack` will be used to build and bundle the `src/` files, so:

Navigate to the project directory in two separate shells

In one shell, tell `webpack` to start building/bundling the files (rebuilds automatically on saved changes) with:
```shell
npm run build
```

In the other shell, run the server (defaults to hosting at `localhost:8080` or the environment port) with:
```shell
npm run serve
```

<br/>


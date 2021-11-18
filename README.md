# Webpack configuration:
* app initialization: `npm init`
* add webpack and webpack-cli (for running command from console): `npm i -D webpack webpack-cli`
* add `webpack.config.js` file to the root of the project
* add html-webpack-plugin for working with html template: `npm i -D html-webpack-plugin`
* add clean-webpack-plugin for auto-clean dist folder:`npm i -D clean-webpack-plugin`
* add some loaders `npm i -D [loader-name]`:
    * `style-loader` adds css into html template
    * `npm i --D mini-css-extract-plugin` import css file to the template
    * `css-loader` works with css files
    * `file-loader` works with files like images, fonts
    * `xml-loader` works with xml files
    * `csv-loader` works with csv files (papaparse is needed)
* add normilize.css: `npm i normalize.css`
* add hot-reload: `npm i -D webpack-dev-server`
* `npm i -D copy-webpack-plugin` copy files (from src to dist, for example)
* `npm i -D cross-env` - it helps to set env variables regardless OS
* `npm i -D terser-webpack-plugin` - minify JS
* `npm i -D css-minimizer-webpack-plugin` - minify CSS
* preprocessors: 
  * loader: `less-loader` or `sass-loader` 
  * library:`less` or `sass`
* Babel:
  * `npm i -D babel-loader @babel/core`
  * presets: 
    * `npm i -D @babel/preset-env`
    * `npm i -D @babel/preset-typescript`
    * `npm i -D @babel/preset-react`
  * polyfill: `npm i @babel/polyfill`
  * plugins: `npm i -D @babel/plugin-proposal-class-properties`
* Eslint: 
  * Add loader: `npm i -D eslint eslint-loader`
  * Add  file `.eslintrc` in the root
  * Add parser `npm i -D babel-eslint`
# VueSP Starter

VueSP Starter is a scaffolded VueJS application for rapid SharePoint app/webpark development. This package contains everything you need to get started to work with VueJS on the SharePoint platform. VueSP Starter can be used for something as small as a custom view/new/edit form for a SharePoint list to a full fledge SharePoint hosted add-in application.

<a href="src/help/getting_started.md">Getting Started Guide</a>

---

# VueSP Starter - Indepth
1. [Template Composition](#template_composition)
2. [Directory Structure](#directory_structure)
3. [Files](#files)
4. [Getting Started](#getting_started)

---

## <a id="template_composition"></a>Template Composition

The VueSP Starter is basically just the shell of a VueJS application. It gets your started by creating and organizing the VueJS structure so you don't have to. To accomplish this, a number of development tools, listed below.

- **[NodeJS](#nodejs)**: A JavaScript runtime which allows you to use NPM, webpack and more to make developing easier and faster.
- **[NPM](#npm)**: **N**ode **P**ackage **M**anager is used to pull in NPM packages used in VueSP Starter.
- **[Webpack](#webpack)**: Compiles your VueJS components, CSS and JS down to a single JavaScript app file.
- **[Babel](#babel)**: Transpiles your ES6 code down to ES5 code compatible with more browsers.

#### <a id="nodejs"></a> NodeJS

NodeJS can be installed on most operating systems and allows you to execute Node commands, applications and scripts via the console. This is a common tool to use for developing in many languages. For VueSP Starter, we use NodeJS's commands to do the following:

- Add other JavaScript libraries to our application such as VueJS (via NPM).
- Compile advanced ES6 JavaScript code to ES5 so it's compatible with more browsers (via Babel).
- Compile Vue, CSS and JavaScript files into one single file (called a bundle) so we can load our application easier (via Webpack).

#### <a id="npm"></a> NPM

NPM (Node Package Manager) is a NodeJS application and allows you to include (install) other JavaScript libraries into your application. For example, if you are starting with a empty project and want to use VueJS you would add the following code to your index.html

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>

<!-- Then ... -->

<script src="myApplicationHere.js"></script>
```

However, what if you wanted to include the Vue library **into** your application? Well, using the NodeJS application "NPM" allows you to configure all the various scripts which your application will use. This way, when your application is combined using Webpack (a NodeJS application) everything is included into a single file allowing you to only have one include statement in your HTML files.

#### <a id="webpack"></a> Webpack

Webpack is a NodeJS application which specializes in combining all of your application components into a single file. This includes, JavaScript files, Vue component files, CSS & SASS files and more into a single JavaScript file.

Webpack can help turn this:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="libraryXYZ.js"></script>
<script src="libraryABC.js"></script>
<script src="myApplication.js"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="myCustomStyling.css">
```

Into this:

```html
<script src="myBundle.js"></script>
```

#### <a id="babel"></a> Babel

Babel is used in VueSP Starter in order to manage the transpiling of your application from ES6 to ES5 code. ES6 is the latest JavaScript version which is only compatible with the newest browsers. ES6 gives JavaScript developers features and functions that are not compatible with old browsers.

VueSP Starter is developed with ES6 code, this means that it's only compatible with the newest browsers. However, if we convert (transpile) the ES6 code to ES5 code then it will be compatible with most browsers!

Babel is a NodeJS application that manages that conversion process for you.

---

## <a id="directory_structure"></a>Directory Structure
The basic directory structure of the VueSP package looks like this:

```text
--- dist
	--- css
    --- img
    --- js
--- src
	--- help
	--- assets
    	--- scss
        --- css
        --- img
	--- components
	--- mixins
	--- router
	--- store
		--- modules
```

- /**dist**/: This directory stores your compiled (production) application and uncompiled assets.
	- /dist/**css**/: Stores your uncompiled CSS assets.
	- /dist/**img**/: Stores your uncompiled images assets.
	- /dist/**js**/: Stores your uncompiled JavaScript assets.
- /**src**/: This directory stores all your pre-compiled components.
	- /src/**help**/: Stores the help markdown files for VueSP Starter.
	- /src/**assets**/: Stores your pre-compiled assets.
		- /src/assets/**scss**/: Stores your SASS files used in your package.
		- /src/assets/**css**/: Stores your CSS files used in your package.
		- /src/assets/**img**/: Stores your image files used in your package.
	- /src/**components**/: Stores your Vue component files.
	- /src/**mixins**/: Stores your Vue mixin scripts.
	- /src/**store**/: Stores your Vuex store scripts.
		- /src/store/**moduels**/: Stores the Vuex store modules.

---

## <a id="files"></a>Files
VueSP Starter is made up of a number of files. Belong is a description of each.

- /**.babelrc**: Stores the configuration details for how the Babel transpiler should work.
- /**package.json**: Stores the configuration details for what the NodeJS package includes.
- /**webpack.config.js**: Stores the configuration details for how Webpack should combine components.
- /**README.md**: This file.

- /src/**index.js**: The main NodeJS starting file. This file imports all the major components.
- /src/assets/scss/**index.scss**: The main styling file for the application. This file imports all other styles. Add your custom imports here.
- /src/assets/scss/**custom.scss**: Where your custom stylings should be stored. This file is imported in index.scss.
- /src/components/**App.vue**: The main VueJS component. This is the most parent Vue component for your application and where configure your VueSP Starter options.
- /src/mixins/**.js**: The various mixin files are multi-use Vue functionality included with the Vue application.
- /src/store/**index.js**: The main Vuex store file. This imports and registers all the various store modules.

## <a id="getting_started"></a>Getting Started

Check out the dedicated <a href="src/help/getting_started.md">Getting Started Guide</a> to all the details needed to learn and use the variables features of VueSP Starter.

# VueSP Starter

VueSP Starter is a VueJS scaffolding for rapid SharePoint app/add-in/webpart development. This package contains everything you need to get started to work with VueJS on the SharePoint platform. Whether you need to make a custom form within an existing SharePoint site or an entire custom JavaScript SharePoint App (Add-In), VueSP Starter is here to get your ramped up quickly.

Jump right in with the **<a href="src/help/getting_started.md">Getting Started Guide</a>**.

For beginners check out the **Scaffold Details** sections to learn more about the basics.

## Features
- VueJS Framework (<a href="https://vuejs.org/">Vue</a>)
- Routing (<a href="https://router.vuejs.org/">Vue Router</a>)
- State Management (<a href="https://vuex.vuejs.org/">Vuex</a>)
- spHelper (<a href="https://www.npmjs.com/package/sphelper">NPM</a>)
- Components
	- Loader
	- List
	- Message (Modal)
	- Form
- Component Theming
- Mixins
- Event Hub

## Scaffold Details
1. [Scaffold Composition](#scaffold)
2. [Directory Structure](#directory)
3. [Files](#files)
4. [Getting Started](#started)

### <a id="scaffold"></a>Scaffold Composition

VueSP Starter is fundamentally just the shell of a VueJS application. It gets your started by creating and organizing a VueJS application so you don't have to. In addition, it includes a number of SharePoint specific features and components. This package is made possible with a number of development tools:

- **GIT / GitHub**: Versioning system and repository for storing projects.
- **NodeJS**: A JavaScript runtime which allows you to use NPM, webpack and more to make developing easier and faster.
- **NPM**: Node Package Manager is used to pull in NPM packages used in VueSP Starter.
- **Webpack**: Compiles your VueJS components, CSS and JS down to a single JavaScript app file.
- **Babel**: Transpiles your ES6 code down to ES5 code compatible with more browsers.

##### Git / GitHub

GIT is a version/change management application which keeps track of all the changes you make to a project. This is a console application that can be installed onto Windows and many other operating systems.

> More Details: <a href="https://git-scm.com/download/win">https://git-scm.com/download/win</a>

GitHub is a repository service used to store the VueSP Starter application.

> More Details: <a href="https://github.com/">https://github.com/</a>

##### NodeJS

NodeJS can be installed on most operating systems and allows you to execute Node commands, applications and scripts via the console. This is a common tool to use for developing in many languages. For instance, **VueSP Starter** is stored on a GIT repository without any of the required NPM packages. NPM is a site/application which manages packages created by developers for all sorts of platforms and languages. The NPM application is built using NodeJS. Therefore, once the GIT repository is downloaded, we can use NodeJS to execute a NPM command that allows users to install required NPM packages.

In addition, NodeJS allows us to use other tools such as those explained below.

> More Details: <a href="https://nodejs.org/en/">https://nodejs.org/en/</a>

##### NPM

NPM (Node Package Manager) is a NodeJS application/site that stores and manages libraries and application packages to make it easier to install. In addition, since one NPM package can utilize and require other NPM packages, NPM helps manage all those connections and relationships for the user. **VueSP Starter** uses a number of NPM packages.

> More Details: <a href="https://www.npmjs.com/">https://www.npmjs.com/</a>

##### Webpack

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

> More Details: <a href="https://webpack.js.org/">https://webpack.js.org/</a>

##### <a id="babel"></a> Babel

VueSP Starter is coded in JavaScript using ES6 features. These ES6 features are not fully supported by all web browsers. As such, to ensure compatibility with as many browsers as possible we use a transpiler called **Babel** to convert the ES6 code to the ES5 version.

> More Details: <a href="https://babeljs.io/">https://babeljs.io/</a>

---

### <a id="directory"></a>Directory Structure
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
- /**src**/: This directory stores all your pre-compiled components. This is your working directory.
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

### <a id="files"></a>Files
VueSP Starter is made up of a number of files. Some of which you don't need to make any changes.

- /**.babelrc**: Stores the configuration details for how the Babel transpiler should work.
- /**package.json**: Stores the configuration details for what the NPM package includes.
- /**webpack.config.js**: Stores the configuration details for how Webpack should combine components.
- /**README.md**: This file.

- /src/**index.js**: The main NodeJS starting file. This file imports all the major components.
- /src/assets/scss/**index.scss**: The main styling file for the application. This file imports all other styles. Add your custom imports here.
- /src/assets/scss/**custom.scss**: Where your custom stylings should be stored. This file is imported in index.scss.
- /src/components/**App.vue**: The main VueJS component. This is the most parent Vue component for your application and where configure your VueSP Starter options.
- /src/mixins/**.js**: The various mixin files are multi-use Vue functionality included with the Vue application.
- /src/router/**index.js**: The main Vue Router file. This is where you register and configure your routes.
- /src/store/**index.js**: The main Vuex store file. This imports and registers all the various store modules.

---

### <a id="started"></a>Getting Started

Check out the dedicated <a href="src/help/getting_started.md">Getting Started Guide</a> for all the details needed to learn and use the various features of VueSP Starter.

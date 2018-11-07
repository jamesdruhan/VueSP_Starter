# VueSP Starter - Getting Started

- [Installation](#installation)
- [Usage](#usage)
- [spHelper](#sphelper)
- [Vue Router](#router)
- [Vuex](#vuex)
- [Event Hub](#event)
- [Mixins](#mixins)
- [Components](#components)


## <a id="installation"></a>Installation

> If you do not already have GIT installed, visit <a href="https://git-scm.com/download/win">https://git-scm.com/download/win</a>.

1. Clone the repository:

```shell
	git clone git@brm-git.cci.canon.info:SharePoint/VueSP_Starter.git
```

> If you do not already have NodeJS installed, visit <a href="https://nodejs.org/en/">https://nodejs.org/en/</a>.

2. Install the NPM packages:

```shell
	cd <cloned-directory>
    npm install
```

3. Configure **webpack.config.js** for path and public path output settings.

## <a id="usage"></a>Usage
There are two ways to use VueSP Starter with SharePoint.

##### App (Add-In)
In addition to your normal script includes for a SharePoint App (Add-In), you will also include the bundle file and create a div element for the Vue instance.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <title>Device Agreement</title>

      <link rel="icon" type="image/png" href="favicon.png?v=3">

      <!-- START: META -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <!--  END: META  -->

      <!-- START: SHAREPOINT JS -->
      <script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/init.js"></script>
      <script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/MicrosoftAjax.js"></script>
      <script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/SP.Runtime.js"></script>
      <script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/SP.core.js"></script>
      <script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/SP.js"></script>
      <script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/SP.RequestExecutor.js"></script>
      <!--  END: SHAREPOINT JS  -->
  </head>
  <body>
      <!-- START: APPLICATION TEMPLATE -->
      <div id="vueApplication"></div>
      <!--  END: APPLICATION TEMPLATE  -->

      <!-- START: APPLICATION JS -->
      <script type="text/javascript" src="dist/appBundle.js"></script>
      <!--  END: APPLICATION JS  -->
  </body>
</html>
```

Compile your VueSP Starter application using the following console command. This will output the bundled file to the /dist/ directory locally on your computer.

```shell
	npm run build
```

All that is left to do is to upload the bundle to your SharePoint site referenced above.

##### Content Editor

When using a content editor it is recommended to store your editor code in a file, rather than writing it directly into the editor box. This is because SharePoint formats and strips your code according to its standards. It does not do this when running from a file.

As such, create an initialization script with the following code and store it in a document/asset library. Be sure to update the paths in the code below. This code will force load the MicrosoftAjax.js script which must be loaded before your app along with the script bundle for your application.

Create a content editor webpart on your SharePoint site then point it to the newly uploaded intialize script.

**appInit.js**

```html
<script type="text/javascript" src="http://sharepoint.domain.com/site/mySiteName/_layouts/15/MicrosoftAjax.js"></script>

<div id="vueApplication"></div>

<script>
	// This function will add the vue application script the HTML's pages JavaScript's.
	function initVue ()
	{
		// Create a empty script tag element.
		var scriptTag = document.createElement('script');

		// Assign the source for the new script tag to the vue application.
		scriptTag.src = '/site/mySiteName/myLibraryName/appBundle.js';

		// Get the current loaded first script element.
		firstScriptTag = document.getElementsByTagName('script')[0];

		// Insert your new script before the current first.
		firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
	}

	// Run the initVue function immediately after the sp.js has be loaded.
	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', initVue);
</script>
```

Compile your VueSP Starter application using the following console command. This will output the bundled file to the /dist/ directory locally on your computer.

```shell
	npm run build
```

All that is left to do is to upload the bundle to your SharePoint site referenced in the initialize script.

## <a id="sphelper"></a>spHelper

spHelper is a JavaScript library designed to make it easier to issue requests to SharePoint via JavaScript. It uses JSOM to communicate with a target site. By default, spHelper is configured for the site the script is running from. The spHelper object can be accessed from within VueSP Starter with the $spHelper global variable.

**To Configure**:

- File: /src/index.js

```javascript
// --------------------------
// Global Object for spHelper
// --------------------------

Vue.prototype.$spHelper = new spHelper
({
      // Defaults to current site.
 	  crossDomain : false,
 	  targetSite  : ''
});
```

If you want to issue requests to a different site change the above noted defaults accordingly.

## <a id="router"></a>Vue Router

Vue Router is available to use in VueSP Starter and allows you to create SPA (Single Page Applications). More information about Vue Router can be found here: https://router.vuejs.org/.

**Default**: Disabled

**To Enable**:

- File: /src/index.js

```javascript
	// Enable Vue Router -- Uncomment Line Below.
	import VueRouter from './router/index.js';

	// Enable Vue Router -- Uncomment Line Below.
	router : VueRouter,
```

**To Configure**:

- File: /src/router/index.js

**To Use**:

- File: /src/components/App.vue

```html
	<!-- START : Router -->
	<transition name="transitionFadeNoOut">
		<router-view/>
	</transition>
	<!-- END   : Router -->
```

## <a id="vuex"></a>Vuex

Vuex is a state management add-on for Vue. This allows you to have one or more "Stores" which are logical containers that store variables. VueSP Starter deploys multiple global stores which can be accessed by any component. You may also create your own store for custom application content.

Vuex should not be disabled in VueSP Starter as it is integrated into nearly all components.

**Available Stores**:

- <a href="./stores/app.md">App</a>
- <a href="./stores/list.md">List</a>
- <a href="./stores/message.md">Message</a>
- <a href="./stores/user.md">User</a>

**To Configure**:

- File: /src/store/index.js

	Add custom stores to the /store/modules/ folder then register them in this file.

## <a id="event"></a>Event Hub

VueSP Starter initializes a secondary Vue instance which acts as an event hub for your application. This allows any component to broadcast an event to any other component via the event hub Vue instance.

**Default**: Enabled

**To Disable**:

- File: /src/index.js
- Note: The event hub is used by various spForm components.

```javascript
	// Comment this line to disable the Event Hub.
	Vue.prototype.$eventHub = new Vue();
```

**To Use**:

```javascript
	// Register a listener event in the Event Hub.
	this.$eventHub.$on( 'myEventName', ( myVariable ) =>
	{
		console.log( myVariable );
	});

	// Trigger an event from any component.
	this.$eventHub.$emit( 'myEventName', 'Hello World' );
```

## <a id="mixins"></a>Mixins

Mixins are reusable component code which is combined with your component. A mixin may have all the same properties as a component: data, methods, components, watches, etc. This makes it perfect for that repeatable code used by multiple components. In addition, you may override mixin properties and Vue will ignore the mixin property in favor for your components.

**Available Mixins**:

- <a href="./stores/app.md">App</a>
- <a href="./stores/spList.md">spList</a>
- <a href="./stores/spMessenger.md">spMessenger</a>
- <a href="./stores/spUI.md">spUI</a>
- <a href="./stores/spUser.md">spUser</a>

**Default**: By default, the App.vue (primary component) utilizes the App mixin (appMix). This mixin utilizes spUI, spUser and spList mixins to perform specific tasks when the application is loaded. Review each of the mixin details to see what features are offered.

## <a id="components"></a>Components

VueSP Starter includes a number of helpful components which helps reduce development time of small to large SharePoint apps. These reusable components have their own unique properties and settings that can be customized to your needs.

**Available Components**:

- <a href="./comonents/spLoader.md">Loader</a>
- <a href="./comonents/spMessenger.md">Messenger</a>
- <a href="./comonents/spTable.md">Table</a>
- <a href="./comonents/spForm.md">Form</a>
	- <a href="./comonents/spFormTitle.md">Title</a>
	- <a href="./comonents/spFormSubTitle.md">Sub-Title</a>
	- <a href="./comonents/spFormButton.md">Button</a>
	- <a href="./comonents/spFormInputText.md">Input: Text</a>
	- <a href="./comonents/spFormInputNote.md">Input: Note</a>
	- <a href="./comonents/spFormInputUser.md">Input: User</a>
	- <a href="./comonents/spFormInputMultiChoice.md">Input: Multi-Choice</a>
	- <a href="./comonents/spFormControls.md">Controls</a>

# VueSP Starter - Getting Started

- [Installation](#installation)
- [Vue Router](#vue_router)
- [Vuex](#vuex)
- [Event Hub](#event_hub)
- [Mixins](#mixins)
- [Components](#components)

## <a id="installation"></a>Installation

via NPM:
```nodejs
    npm install vue-sp-starter
```

Install all required NodeJS modules:

```nodejs
	cd vue-sp-starter

	npm install
```

## <a id="vue_router"></a>Vue Router

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

---

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

---

## <a id="event_hub"></a>Event Hub

VueSP Starter intializes a secondary Vue instance which acts as an event hub for your application. This allows any component to broadcast a event to any other component via the event hub Vue instance.

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

---

## <a id="mixins"></a>Mixins

Mixins are reusable component code which is combined with your component. A mixin may have all the same properties as a component: data, methods, components, watches, etc. This makes it perfect for those repeatable items used by multiple components. In addition, you may override mixin properties and Vue will ignore the mixin property in favor for your components.

**Available Mixins**:

- <a href="./stores/app.md">App</a>
- <a href="./stores/spList.md">spList</a>
- <a href="./stores/spMessenger.md">spMessenger</a>
- <a href="./stores/spUI.md">spUI</a>
- <a href="./stores/spUser.md">spUser</a>

**Default**: By default, the App.vue (primary component) utilizes the App mixin (appMix). This mixin utilizes spUI, spUser and spList mixins to perform specific tasks when the application is loaded. Review each of the mixin details to see what features are offered.

---

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

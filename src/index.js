// ------------------
// Import NPM Modules
// ------------------

import Vue      from 'Vue';
import spHelper from 'spHelper';

// -----------------
// Import VUE Router
// -----------------

// Enable Vue Router -- Uncomment Line Below.
// import VueRouter from './router/index.js';

// ---------------------
// Import VUE Components
// ---------------------

import App         from './components/App.vue';
import spLoader    from './components/global/spLoader.vue';
import spMessenger from './components/global/spMessenger.vue';

// -----------------
// Import VUE Mixins
// -----------------

import spMessengerMix from './mixins/spMessengerMix.js';

// ---------------------------------------
// Import Vuex Store [Global Data Storage]
// ---------------------------------------

import store from './store';

// ------------------------------
// Import SCSS for Global Styling
// ------------------------------

import './assets/scss/index.scss';

// --------------------------
// Global Object for spHelper
// --------------------------

Vue.prototype.$spHelper = new spHelper
({
	// Defaults to current site.
	crossDomain : false,
	targetSite  : ''
});

// ------------------------------
// Global Components Registration
// ------------------------------

Vue.component('spLoader', spLoader);
Vue.component('spMessenger', spMessenger);

// -------------------------
// Global Mixin Registration
// -------------------------

Vue.mixin(spMessengerMix);

// -------------------
// Main VueJS Instance
// -------------------

const app = new Vue
(
	{
		components :
		{
			App
		},

		// Initializes the VUE Router. Enable Vue Router -- Uncomment Line Below.
		// router : VueRouter,

		// Vuex Store
		store : store,

		// The index.html element which VUE will show its component.
		el   : '#vueApplication',

		// The initial root component which will be rendered in the 'el' element.
		render : h => h ( App )
	}
);

// -------------------------------
// Event Management VueJS Instance
// -------------------------------

Vue.prototype.$eventHub = new Vue();

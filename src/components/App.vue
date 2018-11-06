<!-- Component HTML: Start -->
<template>
	<div>
		<!-- START : Messenger -->
		<spMessenger v-if="spMessengerVisible"></spMessenger>
		<!-- END   : Messenger -->

		<!-- START : Loader -->
		<transition name="transitionFadeNoOut">
			<div class="windowCenter">
				<spLoader v-if="!appIsLoaded" :message="'Loading Data ..'"></spLoader>
			</div>
		</transition>
		<!-- END   :  Loader -->

		<!-- START : Vue Container Area -->
		<transition name="transitionFade">
			<div v-if="appIsLoaded" class="vueContainer">

				<myComponent></myComponent>

				<!-- START : Router -->
				<!-- <transition name="transitionFadeNoOut"> -->
					<!-- <router-view/> -->
				<!-- </transition> -->
				<!-- END   : Router -->

			</div>
		</transition>
		<!-- END  :  Vue Container Area -->
	</div>
</template>
<!-- Component HTML: End -->

<!-- Component JavaScript: Start -->
<script>
	import appMix from '../mixins/appMix';

	// Register your components here.
	import myComponent from './custom/myComponent.vue';

	export default
	{
		// Vue name for this component.
		name : 'App',

		// Other components this component uses.
		components :
		{
			myComponent
		},

		// Vue mixin components this component uses.
		mixins:
		[
			appMix
		],

		// Local variables to this component.
		data ()
		{
			return {
				// Set the title of the SharePoint page.
				// pageTitle : 'New Request',

				// Set the title of the SharePoint modal dialog.
				// modalTitle : 'New Request',

				// Removes the 'Edit' tab from the page ribbon.
				// removeEditTab : true,

				// Loads user details into the store including name, manager and more.
				preLoadUserDetails : true,

				// Load setting and field details for the following lists.
				loadListData :
				[
					// Title of the libraries.
					// 'Documents',
				],

				formError : '',

				message : false,
			}
		},

		// Executed when component is created.
		created : function ()
		{ },

		// Local functions available to this component.
		methods :
		{ },

		// Vue watches which execute on a variable change.
		watch :
		{ }
	}
</script>
<!--  Component JavaScript: End  -->

<!-- Component CSS/SCSS: Start -->
<style lang="scss">
	[v-cloak]
	{
		display : none;
	}

	.windowCenter
	{
		height   : 9rem;
		position : absolute;
		top      : 0;
		bottom   : 0;
		left     : 0;
		right    : 0;
		margin   : auto;
	}
</style>
<!-- Component CSS/SCSS: End -->

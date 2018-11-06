import spUIMix      from './spUIMix';
import spUserMix    from './spUserMix';
import spListMix    from './spListMix';
import { mapState } from 'vuex';

export default
{
	mixins:
	[
		spUIMix,
		spUserMix,
		spListMix
	],

	data ()
	{
		return {
			spUserTasksComplete : false,
			spListTasksComplete : false,
			spUITasksComplete   : false
		}
	},

	// Vue computed properties.
	computed :
	{
		// Maps the Vuex Store data to local data so they are easier to access.
		...mapState
		({
			// Indicates if the app is loaded.
			appIsLoaded : state => state.app.isLoaded // Direct access: this.$store.getters['app/isLoaded']
		}),

		// Returns true if all mixin tasks are complete.
		allTasksComplete : function ()
		{
			return (this.spUITasksComplete === true && this.spUserTasksComplete === true && this.spListTasksComplete === true);
		}
	},

	// Vue watched properties.
	watch :
	{
		allTasksComplete : function ( to, from )
		{
			// If all the tasks are complete. Mark the app as being loaded.
			if ( to === true )
			{
				console.log('App is loaded.');

				this.$store.commit( 'app/endLoading' );
			}

			// If
			if ( to === false )
			{
				this.$store.commit( 'app/startLoading' );
			}
		}
	}
}

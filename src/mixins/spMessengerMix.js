import { mapState } from 'vuex';

export default
{
	// Local functions available to this component.
	methods :
	{
		// Tell the message store to show the spMessenger modal.
		showMessage : function ()
		{
			this.$store.commit( 'message/showMessage' );
		},

		// Tell the message store to hide the spMessenger modal.
		hideMessage : function ()
		{
			this.$store.commit( 'message/hideMessage' );

			this.$store.commit( 'message/setDefaults' );
		},

		// Tell the message store what the message details are to be.
		setMessage : function ( details )
		{
			this.$store.commit( 'message/setMessage', details );
		},

		// Ask the message store for the message details.
		getMessage : function ()
		{
			return this.$store.getters['message/allDetails'];
		}
	},

	// Calculated local variables that update when states change.
	computed :
	{
		// Maps the state of the spMessenger visibile flag to a local component variable for easy access.
		...mapState
		({
			// Indicates if the app is loaded.
			spMessengerVisible : state => state.message.visible // Direct access: this.$store.getters['message/visible']
		}),
	}
}

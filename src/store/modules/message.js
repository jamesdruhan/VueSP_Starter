// ----------------------------------------
// ******* Message Module for Vuex ********
// ----------------------------------------
// This manages global messages from app.
// ----------------------------------------

// Collection of values to store.
const state =
{
    // Indicates if the message is shown or not.
    visible : false,

    // Title for the modal.
    title : '',

    // Body for the modal.
    body : '',

    // Indicates if the body should be treated as HTML.
    bodyHTML : false,

    // Size of modal (width): small (20rem), medium (30rem) or large (40rem).
    size : 'medium',

    // Type of font awesome icon (https://fontawesome.com/icons?d=gallery&m=free)
    icon : 'fas fa-info',

    // Colour of the icon background.
    iconColour : '#1565C0',

	// Indicates the type of message. This dictates the buttons available.
	type : 'OK',

    // Callback for when type === 'Confirm' and user clicks no.
	confirmNo : null,

    // Callback for when type === 'Confirm' and user clicks yes.
	confirmYes : null,

	// Callback for when type === 'OK' and user clicks OK.
	after : null,

	// Indicates that the message window should display a loader.
	loading : false,
};

// Getter functions for the collection of values in the store.
const getters =
{
    // Returns current state (visibility) of the message modal.
    visible : ( state ) =>
    {
        return state.visible;
    },

    // Returns the title of the modal.
    title  : ( state ) =>
    {
        return state.title;
    },

    // Returns the body of the modal.
    body : ( state ) =>
    {
        return state.body;
    },

    // Returns the bodyHTML flag of the modal.
    bodyHTML : ( state ) =>
    {
        return state.bodyHTML;
    },

    // Returns the size of the modal.
    size : ( state ) =>
    {
        return state.size;
    },

    // Returns the icon of the modal.
    icon : ( state ) =>
    {
        return state.icon;
    },

    // Returns the iconColour of the modal.
    iconColour : ( state ) =>
    {
        return state.iconColour;
    },

    // Returns the type of the modal.
    type : ( state ) =>
    {
        return state.type;
    },

    // Returns the callback for 'No' confirmation.
    confirmNo : ( state ) =>
    {
        return state.confirmNo;
    },

    // Returns the callback for 'Yes' confirmation.
    confirmYes : ( state ) =>
    {
        return state.confirmYes;
    },

    // Returns the callback for 'OK' confirmation.
    after : ( state ) =>
    {
        return state.after;
    },

	// Returns the loading state of the modal.
	loading : ( state ) =>
	{
		return state.loading;
	},

    // Returns the iconColour of the modal.
    allDetails : ( state ) =>
    {
        return {
            visible    : state.visible,
            title      : state.title,
            body       : state.body,
            bodyHTML   : state.bodyHTML,
            size       : state.size,
            icon       : state.icon,
            iconColour : state.iconColour,
			type       : state.type,
            confirmNo  : state.confirmNo,
            confirmYes : state.confirmYes,
            after      : state.after,
            loading    : state.loading
        }
    },
};

// Mutation functions for the collection of values in the store.
const mutations =
{
    // Displays the message.
    showMessage ( state )
    {
        state.visible = true;
    },

    // Hides the message.
    hideMessage ( state )
    {
        state.visible = false;

        mutations.setDefaults( state );
    },

	// Sets the various details of a message.
    setMessage ( state, details )
    {
        if ( details.title )
        {
            state.title = details.title;
        }

        if ( details.body )
        {
            state.body = details.body;
        }

        if ( typeof(details.bodyHTML) == 'boolean' )
        {
            state.bodyHTML = details.bodyHTML;
        }

        if ( details.size )
        {
            state.size = details.size;
        }

        if ( details.icon )
        {
            state.icon = details.icon;
        }

        if ( details.iconColour )
        {
            state.iconColour = details.iconColour;
        }

        if ( details.type )
        {
            state.type = details.type;
        }

        if ( details.confirmNo )
        {
            state.confirmNo = details.confirmNo;
        }

        if ( details.confirmYes )
        {
            state.confirmYes = details.confirmYes;
        }

        if ( details.after )
        {
            state.after = details.after;
        }

        if ( details.loading )
        {
            state.loading = details.loading;
        }
        else
        {
            state.loading = false;
        }
    },

    // Returns the message modal to default values.
	setDefaults ( state )
	{
		state.title      = '',
		state.body       = '',
		state.bodyHTML   = false,
		state.size       = 'medium',
		state.icon       = 'fas fa-info',
		state.iconColour = '#1565C0',
        state.type       = 'OK',
        state.confirmNo  = null,
        state.confirmYes = null,
        state.after      = null,
        state.loading    = false
	}
};

// NPM Export
export default
{
    namespaced : true,
    state,
    getters,
    mutations
}

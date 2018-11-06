// -------------------------------------
// ******* List Module for Vuex ********
// -------------------------------------
// This manages global list details for
// the application.
// ------------------------------------

// Collection of values to store.
const state =
{
    // Holds list library settings.
    setting : { },

    // Holds list library field/column details.
    column  : { },

	// Holds list data.
	data    : { }
};

// Getter functions for the collection of values in the store.
const getters =
{
    // Returns the full setting object for the list specified.
    settingsByListTitle : ( state ) => ( listTitle ) =>
    {
        return state.setting[listTitle];
    },

    // Returns all of the column details for the list specified.
    columnsByListTitle  : ( state ) => ( listTitle ) =>
    {
        return state.column[listTitle];
    },

	// Returns all of the list data.
	dataByListTitle  : ( state ) => ( listTitle ) =>
	{
		return state.data[listTitle];
	},

    // Returns the setting details for the specified list and setting name.
    settingByName : ( state ) => ( listTitle, settingName ) =>
    {
        return state.setting[listTitle][settingName];
    },

    // Returns the column details for the specified list and column name.
    columnByName : ( state ) => ( listTitle, columnName ) =>
    {
        return state.column[listTitle][columnName];
    }
};

// Mutation functions for the collection of values in the store.
const mutations =
{
	// Adds a SharePoint list library details object for setting and column to the store.
    addListDetails ( state, { listTitle, details } )
    {
        // Assign the setting details.
        state.setting[listTitle] = details.settings;

        // Create a empty object for the column details.
        state.column[listTitle] = {};

		details.columns.forEach ( (column) =>
		{
			// Assign the column details.
			state.column[listTitle][column.internalName] = column;
		});
    },

    // Adds SharePoint list library data for each list.
    addListData ( state, { listTitle, rows } )
    {
        // Assign the data.
        state.data[listTitle] = rows;
    },

	// Clears the data.
	clearListData ( state )
	{
        // Clear the data.
		state.data = {};
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

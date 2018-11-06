// ------------------------------------
// ******* App Module for Vuex ********
// ------------------------------------
// This manages the general application
// global variables.
// ------------------------------------

// Collection of values to store.
const state =
{
    // Indicates if the application is loaded or not (still waiting for tasks to complete).
    isLoaded : false,
};

// Getter functions for the collection of values in the store.
const getters =
{
    isLoaded : ( state ) =>
    {
        return state.isLoaded;
    }
};

// Mutation functions for the collection of values in the store.
const mutations =
{
    startLoading ( state )
    {
        state.isLoaded = false;
    },

	endLoading ( state )
	{
		state.isLoaded = true;
	},
};

// NPM Export
export default
{
    namespaced : true,
    state,
    getters,
    mutations
}

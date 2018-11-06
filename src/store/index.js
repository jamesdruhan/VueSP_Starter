import Vue  from 'Vue';
import Vuex from 'vuex';

// -------------------
// Vuex Module Imports
// -------------------

import app     from './modules/app';
import list    from './modules/list';
import user    from './modules/user';
import message from './modules/message';

// -------------------------
// Vuex Storage Registration
// -------------------------

Vue.use(Vuex);

// ------------------
// Main Vuex Instance
// ------------------

export default new Vuex.Store
(
	{
		modules :
		{
			app,
			list,
			user,
			message
		},
	}
)

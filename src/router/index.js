import Vue    from 'Vue';
import Router from 'vue-router';

// -----------------------------
// Import Route Files/Components
// -----------------------------

// import myVueComponent from '../components/custom/myComponent.vue';

Vue.use(Router);

// --------------------
// Router Configuration
// --------------------

export default new Router({
	// Uses the # URL method.
	// Note: History mode can't be used in SharePoint unless URLRewrite is installed.
	mode : 'hash',

	// Root path of site.
	base : '/site/siteCollection/siteName/',

    routes :
    [
		{
			path      : '/',
			name      : 'myComponent',
			component : myComponent,
		}
    ],

	// Controls what happens with window scroll position when a route is changed. If the route has meta
	// data 'focus' set to true then scroll will be repositioned to the meta 'scroll' variable.
	// If not, it will scroll to the top of the page.
	scrollBehavior (to, from, savedPosition)
	{
		if (to.meta.focus)
		{
			return {
				selector: `[id='${to.meta.scroll}']`
			}
		}
		else
		{
			return {
				y : 0
			}
		}
	}
});

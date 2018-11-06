export default
{
	// Local variables to this component.
	data ()
	{
		return {
			spUserTasksComplete : false,
			preLoadUserDetails : false,
		}
	},

	// Executed when component is created.
	created : function ()
	{
		// Register the SP.UserProfile.JS (SharePoint) library.
		SP.SOD.registerSod( 'SP.UserProfiles.js', '\\_layouts\\15\\SP.UserProfiles.js' );

		// Force the registered library to load.
		SP.SOD.executeFunc( 'SP.UserProfiles.js', false, () => {} );

		// Once the library is successfully loaded, run the related user tasks.
		ExecuteOrDelayUntilScriptLoaded( this.executeUserTasks, 'SP.UserProfiles.js' );
	},

	// Local functions available to this component.
	methods :
	{
		// Creates and executes the user mixin tasks.
		executeUserTasks : function ()
		{
			// Holds a array of promises for each task of spUserMix.
			let spUserMixTasks = [];

			if (this.preLoadUserDetails)
			{
				// Create a new spListMix task.
				let loadUserDataTask = new Promise ( ( resolve, reject ) =>
				{
					// If all task promises are completed
					Promise.all( this.getUserData() ).then( () =>
					{
						resolve ();
					})
					// Error occured in the task.
					.catch( (errorMessage) =>
					{
						reject (errorMessage);
					});
				});

				spUserMixTasks.push ( loadUserDataTask );
			}

			// Error of the task that failed.
			Promise.all ( spUserMixTasks ).catch ( (errorMessage) =>
			{
				this.setMessage
				({
					title      : 'List Error',
					body       : 'A problem has occured while processing user details. <br/><br/><b>Details</b><br/><code>' + errorMessage + '</code>',
					bodyHTML   : true,
					icon       : 'fas fa-times',
					iconColour : '#B71C1C',
					size       : 'medium',
					type       : 'OK'
				});

				this.showMessage();
			})
			// All tasks are processed (success or failed).
			.finally ( () =>
			{
				// Indicate that the spListMix tasks are complete.
				this.spUserTasksComplete = true;
			});
		},

		// Objects the user details from SharePoint and sends them to the user store. Returns a array of promises to be completed.
		getUserData : function ()
		{
			// Array to hold the promises for user data request.
			let dataPromises = [];

			// This promise gets and sets user details to the store.
			let userProfilePromise = new Promise ( ( resolve, reject ) =>
			{
				let onSuccess = (userResult) =>
				{
					// Commit user details to the store.
					this.$store.commit( 'user/setFirstName'    , { who : 'user', value : userResult.FirstName } );
					this.$store.commit( 'user/setLastName'     , { who : 'user', value : userResult.LastName } );
					this.$store.commit( 'user/setAccountName'  , { who : 'user', value : userResult.AccountName } );
					this.$store.commit( 'user/setEmployeeID'   , { who : 'user', value : userResult.UserName } );
					this.$store.commit( 'user/setDepartment'   , { who : 'user', value : userResult.Department } );
					this.$store.commit( 'user/setOffice'       , { who : 'user', value : userResult.Office } );
					this.$store.commit( 'user/setPreferredName', { who : 'user', value : userResult.PreferredName } );
					this.$store.commit( 'user/setPictureURL'   , { who : 'user', value : userResult.PictureURL } );
					this.$store.commit( 'user/setWorkEmail'    , { who : 'user', value : userResult.WorkEmail } );
					this.$store.commit( 'user/setWorkPhone'    , { who : 'user', value : userResult.WorkPhone } );

					// If exists, Commit users manager account name to store.
					if (typeof(userResult.Manager) !== 'undefined' && userResult.Manager !== '')
					{
						this.$store.commit( 'user/setManager'    , { who : 'user', value : userResult.Manager } );
						this.$store.commit( 'user/setAccountName', { who : 'manager', value : userResult.Manager } );
					}

					resolve();
				}

				let onFailure = (errorMessage) =>
				{
					reject( errorMessage );
				}

				// spHelper to get current user info.
				this.$spHelper.getCurrentUser( onSuccess, onFailure );
			});

			dataPromises.push(userProfilePromise);

			// This promise gets and sets users manager details to the store.
			let managerProfilePromise = new Promise ( ( resolve, reject ) =>
			{
				let onSuccess = (managerResult) =>
				{
					// Commit user details to the store.
					this.$store.commit( 'user/setFirstName'    , { who : 'manager', value : managerResult.FirstName } );
					this.$store.commit( 'user/setLastName'     , { who : 'manager', value : managerResult.LastName } );
					this.$store.commit( 'user/setEmployeeID'   , { who : 'manager', value : managerResult.UserName } );
					this.$store.commit( 'user/setDepartment'   , { who : 'manager', value : managerResult.Department } );
					this.$store.commit( 'user/setOffice'       , { who : 'manager', value : managerResult.Office } );
					this.$store.commit( 'user/setPreferredName', { who : 'manager', value : managerResult.PreferredName } );
					this.$store.commit( 'user/setPictureURL'   , { who : 'manager', value : managerResult.PictureURL } );
					this.$store.commit( 'user/setWorkEmail'    , { who : 'manager', value : managerResult.WorkEmail } );
					this.$store.commit( 'user/setWorkPhone'    , { who : 'manager', value : managerResult.WorkPhone } );
					this.$store.commit( 'user/setManager'      , { who : 'manager', value : managerResult.Manager } );

					resolve();
				}

				let onFailure = ( errorMessage ) =>
				{
					reject(errorMessage);
				}

				// spHelper to get current user manager info.
				this.$spHelper.getCurrentUserManager( onSuccess, onFailure );
			});

			// Push all the promises to a single array.
			dataPromises.push(managerProfilePromise);

			// Return the array of promises to be processed.
			return dataPromises;
		}
	},
}

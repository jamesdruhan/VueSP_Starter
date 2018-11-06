export default
{
	// Local variables to this component.
	data ()
	{
		return {
			processOnCreatedSPListMix : true,
			spListTasksComplete       : false,
			loadListDetails           : [],
			loadListData              : [],
			columnsToGet              : {},
		}
	},

	// Executed when component is created.
	created : function ()
	{
		if ( this.processOnCreatedSPListMix )
		{
			this.processListTasks();
		}
	},

	// Local functions available to this component.
	methods :
	{
		// Manages all the tasks for the list mixin. Method is setup to process multiple tasks, even if there is only one.
		processListTasks : function ()
		{
			this.spListTasksComplete = false;

			// Holds a array of promises for each task of spListMix.
			let spListMixTasks = [];

			// List details task processing.
			if ( this.loadListDetails.length > 0 )
			{
				// Create a new spListMix task.
				let loadListDetailsTask = new Promise ( ( resolve, reject ) =>
				{
					// Task completed successfully.
					Promise.all( this.getListDetails() ).then( () =>
					{
						resolve ();
					})
					// Error occured in the task.
					.catch( ( errorMessage ) =>
					{
						reject ( errorMessage );
					});
				});

				spListMixTasks.push ( loadListDetailsTask );
			}

			// List data task processing.
			if ( this.loadListData.length > 0 )
			{
				// Create a new spListMix task.
				let loadListDataTask = new Promise ( ( resolve, reject ) =>
				{
					// Task completed successfully.
					Promise.all( this.getListData() ).then( () =>
					{
						resolve ();
					})
					// Error occured in the task.
					.catch( ( errorMessage ) =>
					{
						reject ( errorMessage );
					});
				});

				spListMixTasks.push ( loadListDataTask );
			}

			// Error of the task that failed.
			Promise.all ( spListMixTasks ).catch ( (errorMessage) =>
			{
				this.setMessage
				({
					title      : 'List Error',
					body       : 'A problem has occured while processing a list. <br/><br/><b>Details</b><br/><code>' + errorMessage + '</code>',
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
				this.spListTasksComplete = true;
			});
		},

		// Loops through the registered lists and gathers their details from SharePoint.
		getListDetails : function ()
		{
			// Array to hold the promises for each list.
			let listPromises = [];

			if ( this.loadListDetails.length > 0 )
			{
				this.loadListDetails = [...new Set(this.loadListDetails)];

				// For each list in the registered lists, get the details and assign them.
				this.loadListDetails.forEach( ( listName ) =>
				{
					let listPromise = new Promise ( ( resolve, reject ) =>
					{
						// Executes this callback when spHelper command is successful.
						let onSuccess = ( results ) =>
						{
							// Ensure the results are good.
							if ( results )
							{
								// Commit to the store.
								this.$store.commit( 'list/addListDetails', { listTitle : listName, details : results } );
							}

							resolve();
						};

						// Executes this callback when sHelper command fails.
						let onFailure = ( errorMessage ) =>
						{
							reject( errorMessage );
						};

						this.$spHelper.getListDetails( listName, onSuccess, onFailure );
					});

					listPromises.push( listPromise );
				});
			}

			return listPromises;
		},

		// Loops through the registered lists and gathers their data from SharePoint.
		getListData : function ()
		{
			// Array to hold the promises for each list.
			let listPromises = [];

			if ( this.loadListData.length > 0 )
			{
				this.loadListData = [...new Set( this.loadListData )];

				// Clear any existing data in the store.
				this.$store.commit( 'list/clearListData' );

				// For each list in the registered lists, get the data.
				this.loadListData.forEach( ( listName ) =>
				{
					let listPromise = new Promise ( ( resolve, reject ) =>
					{
						// Intialize the spHelper query for list data.
						let queryDetails =
						{
							listName : listName,
						};

						// If there are columns registered, only get those columns (+ID);
						if ( this.columnsToGet[listName].length > 0 )
						{
							this.columnsToGet[listName] = [...new Set( this.columnsToGet[listName] )];

							queryDetails['listColumns'] = this.columnsToGet[listName];

							// Ensure the column 'ID' exists - this is always received.
							if ( !this.columnsToGet[listName].includes('ID') )
							{
								// Add 'ID' to the columns to get.
								queryDetails['listColumns'].push('ID');
							}
						}

						// Executes this callback when spHelper command is successful.
						let onSuccess = ( results ) =>
						{
							// Ensure the results are good.
							if ( results && results.length > 0 )
							{
								// Commit to the store.
								this.$store.commit( 'list/addListData', { listTitle : listName, rows : results } );
							}

							resolve();
						};

						// Executes this callback when sHelper command fails.
						let onFailure = ( errorMessage ) =>
						{
							reject( errorMessage );
						};

						this.$spHelper.getListData(queryDetails, onSuccess, onFailure);
					});

					listPromises.push(listPromise);
				});
			}

			return listPromises;
		}
	},
}

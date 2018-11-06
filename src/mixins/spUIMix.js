export default
{
	// Local variables to this component.
	data ()
	{
		return {
			spUITasksComplete : false,
			pageTitle         : null,
			modalTitle        : null,
			removeEditTab     : false,
		}
	},

	// Executed when component is created.
	created : function ()
	{
		// Holds a array of promises for each task of spUIMix.
		let spUIMixTasks = [];

		// If the pageTitle data variable is set in the component, will execute change.
		if (this.pageTitle !== null)
		{
			// Create a new spUIMix task.
			let pageTitleTask = new Promise ( ( resolve, reject ) =>
			{
				// Task completed successfully.
				this.setmodalTitle(this.pageTitle).then( () =>
				{
					resolve ();
				})
				// Error occured in the task.
				.catch( (errorMessage) =>
				{
					reject (errorMessage);
				});
			});

			spUIMixTasks.push ( pageTitleTask );
		}

		// If the modalTitle data variable is set in the component, will execute change.
		if (this.modalTitle !== null)
		{
			// Create a new spUIMix task.
			let modalTitleTask = new Promise ( ( resolve, reject ) =>
			{
				// Task completed successfully.
				this.setItemPageTitle(this.pageTitle).then( () =>
				{
					resolve ();
				})
				// Error occured in the task.
				.catch( (errorMessage) =>
				{
					reject (errorMessage);
				});
			});

			spUIMixTasks.push ( modalTitleTask );
		}

		// If the removeEditTab data variable is set to true in the component, will execute change.
		if (this.removeEditTab)
		{
			// Create a new spUIMix task.
			let removeEditTabTask = new Promise ( ( resolve, reject ) =>
			{
				// Task completed successfully.
				this.removeRibbonEditTab().then( () =>
				{
					resolve ();
				})
				// Error occured in the task.
				.catch( (errorMessage) =>
				{
					reject (errorMessage);
				});
			});

			spUIMixTasks.push ( removeEditTabTask );
		}

		// Error of the task that failed.
		Promise.all ( spUIMixTasks ).catch ( (errorMessage) =>
		{
			this.setMessage
			({
				title      : 'List Error',
				body       : 'A problem has occured while processing SharePoint UI changes. <br/><br/><b>Details</b><br/><code>' + errorMessage + '</code>',
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
			// Indicate that the spUIMix tasks are complete.
			this.spUITasksComplete = true;
		});
	},

	// Local functions available to this component.
	methods :
	{
		// Changes the active SharePoint modal dialog title. This actiion will only occure if a SP modal dialog is active.
		setmodalTitle : function ( newTitle )
		{
			// Promise that will run the setTitle method if a SharePoint Modal Dialog is active.
			let setModalTitlePromise = new Promise ( ( resolve, reject) =>
			{
				this.$spHelper.spModalDialog().isActive().then ( (isActive) =>
				{
					// SharePoint modal dialog is active. Set the title.
					if ( isActive )
					{
						// Modal title was successfully set.
						this.$spHelper.spModalDialog().setTitle(newTitle).then( () =>
						{
							resolve ();
						})
						// There was a problem setting the modal title.
						.catch ( (errorMessage) =>
						{
							reject (errorMessage);
						});
					}
					// SharePoint modal dialog is not active. Not attempting to set the title.
					else
					{
						resolve ();
					}
				})
				// Error occured.
				.catch ( (errorMessage) =>
				{
					reject ( errorMessage );
				});
			});

			return setModalTitlePromise;
		},

		// Changes the active SharePoint list item page title. This actiion will only occure if a SP modal dialog is NOT active.
		setItemPageTitle : function ( newTitle )
		{

			// Promise that will change the title of a list item page if a SharePoint Modal Dialog is active.
			let setItemPageTitlePromise = new Promise ( ( resolve, reject) =>
			{
				this.$spHelper.spModalDialog().isActive().then ( (isActive) =>
				{
					// SharePoint modal dialog is NOT active. Set the title.
					if ( !isActive )
					{
						// Get the item page title element.
						let titleElement = document.getElementById('DeltaPlaceHolderPageTitleInTitleArea');

						// Set the page title.
						titleElement.childNodes[1].childNodes[1].text = newTitle;

						resolve ();
					}
					// SharePoint modal dialog is active. Not attempting to set the title.
					else
					{
						resolve ();
					}
				})
				// Error occured.
				.catch ( (errorMessage) =>
				{
					reject ( errorMessage );
				});
			});

			return setItemPageTitlePromise;
		},

		// Changes the active ribbon tab to "Browse" and removes the "Edit" tab completely. Only works on SharePoint page (not modal dialogs).
		removeRibbonEditTab : function ()
		{
			// Promise that will remove the edit tab in the ribbon of a SP page, if a SharePoint Modal Dialog is NOT active.
			let removeRibbonEditTabPromise = new Promise ( ( resolve, reject) =>
			{
				this.$spHelper.spModalDialog().isActive().then ( (isActive) =>
				{
					// SharePoint modal dialog is NOT active. Set the title.
					if ( !isActive )
					{
						// Edit tab was successfully removed.
						this.$spHelper.spRibbon().removeEdit().then( () =>
						{
							resolve ();
						})
						// There was a problem removing the edit tab.
						.catch ( (errorMessage) =>
						{
							reject (errorMessage);
						});
					}
					// SharePoint modal dialog is active. Not attempting to remove the edit tab.
					else
					{
						resolve ();
					}
				})
				// Error occured.
				.catch ( (errorMessage) =>
				{
					reject ( errorMessage );
				});
			});

			return removeRibbonEditTabPromise;
		}
	}
}

## <a id="options"></a>Options
Before starting to build your application with VueSP, review and change any of the default options available to you. This is done in two places:

1. For Styling ==> /src/assets/scss/index.scss

	Here you can configure:
    - SCSS colours
    - Bootstrap components
    - Font packages
    - and more ..

2. For SharePoint ==> /src/components/App.vue

	Here you can configure:
	- **pageTitle**: [STRING] Sets the title of a SharePoint page. This is handy for forms that open in a a full page.

	- **modalTitle**: [STRING] Sets the title of a SharePoint modal. This is handy for forms that open in a modal window.

	- **removeEditTab**: [BOOL] Removes the "Edit" tab from a SharePoint page. This is handy for forms that open in a full page.

	- **preLoadUserDetails**: [BOOL] Loads the Vuex store for users with user and manager details. This makes it easier to show and use user details.

	- **loadListData**: [OBJECT] Loads setting and field details into a the Vuex store for lists.

	## <a id="store"></a>Store

	The VueJS template deploys Vuex application state management. Vuex creates a 'store' that holds the global data for your application. The store is organized into modules:

	- **[App](#store_app)**: Holds general application data.
	- **[List](#store_list)**: Holds list details [optional] such as list settings and column information.
	- **[User](#store_user)**: Holds current user information.

	In order to access store variables you must call a "getter" and to modify a store variable you make a "commit". Some variables of a store are mapped so you may access it easier. An example of a mapped store variable is **isLoaded** under the App module.

	#### <a id="store_app"></a> Store Module: App
	---

	- **Variables (State)**
	- *isLoaded [Boolean]*: Indicates if the application is loaded or not (still waiting for tasks to complete).

	- **Getters**
	- *isLoaded*: Returns the isLoaded variable.
	<br><br>
	```javascript
	this.$store.getters[ 'app/isLoaded' ];
	```

	- **Mutations (Commits)**
	- *startLoading*: Sets the isLoaded variable to false to indicate the application is not ready.
	- *endLoading*: Sets the isLoaded variable to true to indicate the application is ready.
	<br><br>
	```javascript
	this.$store.commit( 'app/startLoading' );
	this.$store.commit( 'app/endLoading' );
	```

	- **Mapped**
	- *isLoaded > appIsLoaded*: The store variable "isLoaded" is mapped to the application App.vue component as appIsLoaded.
	<br><br>
	```javascript
	this.appIsLoaded;
	```
	<br>

	#### <a id="store_list"></a>Store Module: List
	---

	This store module holds SharePoint list library details. By default it holds nothing unless the app initializes the array **loadListData** in the App.vue file. When initalized, before the app is marked as loaded (isLoaded), your app will retrieve details of the list libraries denoted in **loadListData**.

	#### Initialize: App.vue

	```javascript
		data ()
		{
			return {
				... // Other Variables Here ...

				// Load setting and field details for the following lists.
				loadListData  :
				[
					// Title of the libraries.
					'Documents',
					'My List Title Here'
				],

	            ... // Other Variables Here ...
			}
		},
	```

	#### Loaded Data
	- List Settings
		- SharePoint list specific details such as Title, Template, Server Relative URL, Root Folder and more.

	- List Column
		- SharePoint list field specific details such as Internal Name, ID, Field Type, Description and more.

	- **Variables (State)**
		- *setting [Object]*: Holds one or more SharePoint list library settings. The settings are stored in a key of the library title.

		- *column [Object]*: Holds one or more SharePoint column/field information. The columns are stored in a key of the library title.

	- **Getters**
		- *allSettings (listTitle)*: Returns an object containing all the settings of the passed list reference.
		<br><br>
	    ```javascript
	    this.$store.getters[ 'list/allSettings' ]( 'Documents' );
	    ```

		- *allColumns (listTitle)*: Returns an object containing all the columns details of the passed list reference.
		<br><br>
	    ```javascript
	    this.$store.getters[ 'list/allColumns' ]( 'Documents' );
	    ```

	    - *settingByName (listTitle, settingName)*: Returns the specific passed setting based on the name of a specific list.
		<br><br>

	#### <a id="store_user"></a>Store Module: User
	---

	This store module holds SharePoint user details. Enabled by default, it can be disabled by setting the '**preLoadUserDetails**' variable in App.vue to false.

	#### Initialize: App.vue

	```javascript
		data ()
		{
			return {
				... // Other Variables Here ...

				// Loads user details into the store including name, manager and more.
				preLoadUserDetails : true,

	            ... // Other Variables Here ...
			}
		},
	```

	#### Loaded Data
	- User Details
		- First Name
		- Last Name
		- Account Name (CCI/*****)
		- Employee ID
		- Department
		- Office
		- Preferred Name
		- SharePoint Picture URL
		- Work Email
		- Work Phone
		- Manager

	- Manager Details
		- First Name
		- Last Name
		- Account Name (CCI/*****)
		- Employee ID
		- Department
		- Office
		- Preferred Name
		- SharePoint Picture URL
		- Work Email
		- Work Phone
		- Manager

	- **Variables (State)**
		- *user [Object]*: Holds the user SharePoint details.

		- *manager [Object]*: Holds the manager SharePoint details.

	- **Getters**
		- *firstName (who)*: Returns the first name of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/firstName']('user')
	    ```

		- *lastName (who)*: Returns the last name of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/lastName']('user')
	    ```

	    - *accountName (who)*: Returns the employee ID of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/accountName']('user')
	    ```

		- *department (who)*: Returns the department of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/department']('user')
	    ```

		- *office (who)*: Returns the office of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/office']('user')
	    ```

	    - *preferredName (who)*: Returns the preferred name of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/preferredName']('user')
	    ```

		- *pictureURL (who)*: Returns the SharePoint picture URL of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/pictureURL']('user')
	    ```

		- *workEmail (who)*: Returns the work email of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/workEmail']('user')
	    ```

	    - *workPhone (who)*: Returns the work phone of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/workPhone']('user')
	    ```

	    - *manager (who)*: Returns the manager of the passed who (user or manager).
		<br><br>
	    ```javascript
	    this.$store.getters['user/manager']('user')
	    ```

	- **Mutations (Commits)**
		- *setFirstName*: Sets the first name.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setFirstName', { who : 'user', value : 'James' } );
	    ```

		- *setLastName*: Sets the last name.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setLastName', { who : 'user', value : 'Druhan' } );
	    ```

		- *setAccountName*: Sets the account name.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setAccountName', { who : 'user', value : 'CCI/T02915' } );
	    ```

		- *setEmployeeID*: Sets the employee ID.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setEmployeeID', { who : 'user', value : 'T02915' } );
	    ```

		- *setDepartment*: Sets the department.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setDepartment', { who : 'user', value : 'IT' } );
	    ```

		- *setOffice*: Sets the office.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setOffice', { who : 'user', value : 'Brampton' } );
	    ```

		- *setPreferredName*: Sets the preferred name.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setPreferredName', { who : 'user', value : 'James Druhan' } );
	    ```

		- *setPictureURL*: Sets the SharePoint picture URL.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setPictureURL', { who : 'user', value : 'http://intranet.canoncanada.canon.com/temp.jpg' } );
	    ```

		- *setWorkEmail*: Sets the work email.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setWorkEmail', { who : 'user', value : 'jdruhan@canada.canon.com' } );
	    ```

		- *setWorkPhone*: Sets the work phone.
		<br><br>
	    ```javascript
	    this.$store.commit( 'user/setWorkPhone', { who : 'user', value : '905-555-4444 Ext. 8123' } );
	    ```

		- *setManager*: Sets the managers account name.
		<br><br>
		```javascript
		this.$store.commit( 'user/setManager', { who : 'user', value : 'CCI/T01234' } );
		```

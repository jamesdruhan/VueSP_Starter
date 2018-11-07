## Store Module: List

This store module is used for the spList mixin which gets both SharePoint list library details and data. Once configured, when the component loads, the List store module will store library information in the setting, column and data state objects.

To learn more about using the spList mixin go <a href="../nixins/spList.md">here</a>.

### **State**
- *setting [Object]*: Holds one or more SharePoint list library settings. The settings are stored in a key of the library title.

- *column [Object]*: Holds one or more SharePoint column/field information. The columns are stored in a key of the library title.

- *data [Object]*: Holds list data. Each key is named after the list and is an array, holding the rows of data.

### **Getters**
- *settingsByListTitle( listTitle )*: Returns the full setting object for the list specified.

```javascript
	this.$store.getters[ 'list/settingsByListTitle' ]( 'myListTitle' );
```

- *settingByName( listTitle, settingName )*: Returns the setting details for the specified list and setting name.

```javascript
	this.$store.getters[ 'list/settingByName' ]( 'myListTitle', 'Title' );
```

- *dataByListTitle( listTitle )*: Returns all of the list data.

```javascript
	this.$store.getters[ 'list/dataByListTitle' ]( 'myListTitle' );
```

- *columnsByListTitle( listTitle )*: Returns all of the column details for the list specified.

```javascript
	this.$store.getters[ 'list/columnsByListTitle' ]( 'myListTitle' );
```

- *columnByName( listTitle, columnName )*: Returns the column details for the specified list and column name.

```javascript
	this.$store.getters[ 'list/columnByName' ]( 'myListTitle', 'columnName' );
```

### **Mutations**
- *addListDetails( { listTitle, details } )*: Adds a SharePoint list library details object for setting and column to the store.

```javascript
	this.$store.commit( 'list/addListDetails', { listTitle : 'myList', details : listDetails } );
```

- *addListData*: Adds SharePoint list library data for each list.

```javascript
	this.$store.commit( 'list/addListData', { listTitle : 'myList', rows : listDataRows } );
```

- *clearListData*: Clears the data.

```javascript
	this.$store.commit( 'list/clearListData' );
```

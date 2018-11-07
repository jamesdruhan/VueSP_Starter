## Store Module: User

This store module holds details of the current user accessing the application. It is used by and populated via the spUser mixin.

To learn more about using the spUser mixin go <a href="../mixins/spUser.md">here</a>.

### **State**
- *user [Object]*: Holds details of the current user.
	- *firstName*
	- *lastName*
	- *accountName*
	- *employeeID*
	- *department*
	- *office*
	- *preferredName*
	- *pictureURL*
	- *workEmail*
	- *workPhone*
	- *manager*

- *manager [Object]*: Holds details of the current users manager.
	- *firstName*
	- *lastName*
	- *accountName*
	- *employeeID*
	- *department*
	- *office*
	- *preferredName*
	- *pictureURL*
	- *workEmail*
	- *workPhone*
	- *manager*

### **Getters**
- *firstName( [STRING] who )*: Returns the first name of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/firstName' ]( 'user' );
    this.$store.getters[ 'user/firstName' ]( 'manager' );
```

- *lastName( [STRING] who )*: Returns the last name of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/lastName' ]( 'user' );
    this.$store.getters[ 'user/lastName' ]( 'manager' );
```

- *accountName( [STRING] who )*: Returns the account name of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/accountName' ]( 'user' );
    this.$store.getters[ 'user/accountName' ]( 'manager' );
```

- *employeeID( [STRING] who )*: Returns the employee ID of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/employeeID' ]( 'user' );
    this.$store.getters[ 'user/employeeID' ]( 'manager' );
```

- *department( [STRING] who )*: Returns the department of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/department' ]( 'user' );
    this.$store.getters[ 'user/department' ]( 'manager' );
```

- *office( [STRING] who )*: Returns the office of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/office' ]( 'user' );
    this.$store.getters[ 'user/office' ]( 'manager' );
```

- *preferredName( [STRING] who )*: Returns the preferred name of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/preferredName' ]( 'user' );
    this.$store.getters[ 'user/preferredName' ]( 'manager' );
```

- *pictureURL( [STRING] who )*: Returns the SharePoint picture URL of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/pictureURL' ]( 'user' );
    this.$store.getters[ 'user/pictureURL' ]( 'manager' );
```

- *workEmail( [STRING] who )*: Returns the work email of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/workEmail' ]( 'user' );
    this.$store.getters[ 'user/workEmail' ]( 'manager' );
```

- *workPhone( [STRING] who )*: Returns the work phone of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/workPhone' ]( 'user' );
    this.$store.getters[ 'user/workPhone' ]( 'manager' );
```

- *manager( [STRING] who )*: Returns the manager of the passed who (user or manager).

```javascript
	this.$store.getters[ 'user/manager' ]( 'user' );
    this.$store.getters[ 'user/manager' ]( 'manager' );
```

### **Mutations**
- *setFirstName( { who, value } )*: Sets the first name.

```javascript
	this.$store.commit( 'user/setFirstName', { who : 'user', value : 'James' } );
    this.$store.commit( 'user/setFirstName', { who : 'manager', value : 'Fred' } );
```

- *setLastName( { who, value } )*: Sets the last name.

```javascript
	this.$store.commit( 'user/setLastName', { who : 'user', value : 'Druhan' } );
    this.$store.commit( 'user/setLastName', { who : 'manager', value : 'Chan' } );
```

- *setAccountName( { who, value } )*: Sets the account name.

```javascript
	this.$store.commit( 'user/setAccountName', { who : 'user', value : 'T0000' } );
    this.$store.commit( 'user/setAccountName', { who : 'manager', value : 'T11111' } );
```

- *setEmployeeID( { who, value } )*: Sets the employee ID.

```javascript
	this.$store.commit( 'user/setEmployeeID', { who : 'user', value : 'COMPANY/T0000' } );
    this.$store.commit( 'user/setEmployeeID', { who : 'manager', value : 'COMPANY/T11111' } );
```

- *setDepartment( { who, value } )*: Sets the department.

```javascript
	this.$store.commit( 'user/setDepartment', { who : 'user', value : 'IT' } );
    this.$store.commit( 'user/setDepartment', { who : 'manager', value : 'IT' } );
```

- *setOffice( { who, value } )*: Sets the office.

```javascript
	this.$store.commit( 'user/setOffice', { who : 'user', value : 'Toronto' } );
    this.$store.commit( 'user/setOffice', { who : 'manager', value : 'Toronto' } );
```

- *setPreferredName( { who, value } )*: Sets the preferred name.

```javascript
	this.$store.commit( 'user/setPreferredName', { who : 'user', value : 'James Druhan' } );
    this.$store.commit( 'user/setPreferredName', { who : 'manager', value : 'Fred Chan' } );
```

- *setPictureURL( { who, value } )*: Sets the picture URL.

```javascript
	this.$store.commit( 'user/setPictureURL', { who : 'user', value : 'http://sharepoint.com/image.jpg' } );
    this.$store.commit( 'user/setPictureURL', { who : 'manager', value : 'http://sharepoint.com/image.jpg' } );
```

- *setWorkEmail( { who, value } )*: Sets the work email.

```javascript
	this.$store.commit( 'user/setWorkEmail', { who : 'user', value : 'jdruhan@company.com' } );
    this.$store.commit( 'user/setWorkEmail', { who : 'manager', value : 'fchan@company.com' } );
```

- *setWorkPhone( { who, value } )*: Sets the work phone.

```javascript
	this.$store.commit( 'user/setWorkPhone', { who : 'user', value : '555-555-5555' } );
    this.$store.commit( 'user/setWorkPhone', { who : 'manager', value : '555-555-5555' } );
```

- *setManager( { who, value } )*: Sets the manager.

```javascript
	this.$store.commit( 'user/setManager', { who : 'user', value : 'COMPANY/T0000' } );
    this.$store.commit( 'user/setManager', { who : 'manager', value : 'COMPANY/T11111' } );
```

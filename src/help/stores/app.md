## Store Module: App
This store holds a state variable indicating whether or not the application is loaded. This is based on the tasks performed in the App mixin and includes various basic tasks such as getting user information and list details/data.

To learn more about using the App mixin go <a href="../mixins/app.md">here</a>.

### **State**
- *isLoaded [Boolean]*: Indicates if the application is loaded or not (still waiting for tasks to complete).

### **Getters**
- *isLoaded*: Returns the isLoaded variable.

```javascript
	this.$store.getters[ 'app/isLoaded' ];
```

### **Mutations (Commits)**
- *startLoading*: Sets the isLoaded variable to false to indicate the application is not ready.
- *endLoading*: Sets the isLoaded variable to true to indicate the application is ready.

```javascript
  this.$store.commit( 'app/startLoading' );
  this.$store.commit( 'app/endLoading' );
```

### **Mapped**
- *isLoaded > appIsLoaded*: The store variable "isLoaded" is mapped to the application App.vue component as appIsLoaded.

```javascript
	this.appIsLoaded;
```

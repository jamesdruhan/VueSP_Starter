## Store Module: Message

This store module holds details outlining when and how to show the spMessenger component. This is a popup (modal style) component that allows you to easily notify users.

To learn more about using the spMessenger mixin go <a href="./src/help/spMessenger.md">here</a>.

### **State**
- *visible [Boolean]*: Indicates if the message is shown or not.

- *title [String]*: Title for the modal.

- *body [String]*: Body for the modal.

- *bodyHTML [Boolean]*: Indicates if the body should be treated as HTML.

- *size [String]*: Size of modal (width): small (20rem), medium (30rem) or large (40rem).

- *icon [String]*: Type of font awesome icon (https://fontawesome.com/icons?d=gallery&m=free)

- *iconColour [String]*: Colour of the icon background.

- *type [String]*: Indicates the type of message. This dictates the buttons available.

- *confirmNo [Function]*: Callback for when type === 'Confirm' and user clicks no.

- *confirmYes [Function]*: Callback for when type === 'Confirm' and user clicks yes.

- *after [Function]*: Callback for when type === 'OK' and user clicks OK.

- *loading [Boolean]*: Indicates that the message window should display a loader.

### **Getters**
- *visible()*: Returns current state (visibility) of the message modal.

```javascript
	this.$store.getters[ 'message/visible' ];
```

- *title()*: Returns the title of the modal.

```javascript
	this.$store.getters[ 'message/title' ];
```

- *body()*: Returns the body of the modal.

```javascript
	this.$store.getters[ 'message/body' ];
```

- *bodyHTML()*: Returns the bodyHTML flag of the modal.

```javascript
	this.$store.getters[ 'message/bodyHTML' ];
```

- *size()*: Returns the size of the modal.

```javascript
	this.$store.getters[ 'message/size' ];
```

- *icon()*: Returns the icon of the modal.

```javascript
	this.$store.getters[ 'message/icon' ];
```

- *iconColour()*: Returns the iconColour of the modal.

```javascript
	this.$store.getters[ 'message/iconColour' ];
```

- *type()*: Returns the type of the modal.

```javascript
	this.$store.getters[ 'message/type' ];
```

- *confirmNo()*: Returns the callback for 'No' confirmation.

```javascript
	this.$store.getters[ 'message/confirmNo' ];
```

- *confirmYes()*: Returns the callback for 'Yes' confirmation.

```javascript
	this.$store.getters[ 'message/confirmYes' ];
```

- *after()*: Returns the callback for 'OK' confirmation.

```javascript
	this.$store.getters[ 'message/after' ];
```

- *loading()*: Returns the loading state of the modal.

```javascript
	this.$store.getters[ 'message/loading' ];
```

- *allDetails()*: Returns the iconColour of the modal.

```javascript
	this.$store.getters[ 'message/allDetails' ];
```

### **Mutations**
- *showMessage()*: Displays the message.

```javascript
	this.$store.commit( 'message/showMessage' );
```

- *hideMessage()*: Hides the message.

```javascript
	this.$store.commit( 'message/hideMessage' );
```

- *setMessage()*: Sets the various details of a message.

```javascript
	this.$store.commit( 'message/setMessage' );
```

- *setDefaults()*: Returns the message modal to default values.

```javascript
	this.$store.commit( 'message/setDefaults' );
```

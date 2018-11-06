<template lang="html">

	<transition appear name="transitionSlideLeft">
	<!-- START : spFormInput -->
		<div class="spFormInput">

			<!-- START : Left Border -->
			<div class="spFormInputBorder"></div>
			<!-- END   : Left Border -->

			<!-- START : Required Icon -->
			<div v-if="details.required" class="spFormInputRequired">
				<i class="fas fa-star"></i>
			</div>
			<!-- END   : Required Icon -->

			<!-- START : Text Label -->
			<label>{{ details.label }}</label>
			<!-- END   : Text Label -->

			<!-- START : Text Description -->
			<span class="spFormInputDescription">{{ details.description }}</span>
			<!-- END   : Text Description -->

			<!-- START : User Input -->
			<div class="spFormInputUser" :class="userSearch ? 'spinningLoad' : details.locked ? 'lockedIcon' : validInput ? 'successIcon' : ''">
				<input ref="inputUser"
					v-model="inputValue"
					v-on:input="searchUser"
					v-on:blur="onBlurInput"
					@keyup.delete="onDeleteInput"
					@keyup.esc="onEscapeInput"
					@keydown.up.prevent="onKeyUpInput"
					@keydown.down.prevent="onKeyDownInput"
					@keydown.enter.prevent="onKeyEnterInput"
					@keydown.tab.prevent="onKeyTabInput"
					v-bind:disabled="details.locked"
					class="spFormInputText"
					type="text"
				>

				<!-- START : User Results -->
				<div v-if="userResultsDropdown" class="spFormInputUserResults">
					<div v-if="userSearch" class="spFormInputUserResultsItem justifyCenter">
						Searching ..
					</div>
					<div v-if="!userSearch && userData.length === 0" class="spFormInputUserResultsItem justifyCenter">
						No Results
					</div>
					<div v-for="( user, index ) in userData" v-bind:key="index" @mousedown.prevent="selectUser( user )" @mouseover="currentHighlight = index" class="spFormInputUserResultsItem" :class="{ highlight : index === currentHighlight }">
						<span>{{ user.PreferredName }}</span>
						<span class="alignRight">{{ user.UserName }}</span>
					</div>
				</div>
				<!-- END   : User Results -->
			</div>
			<!-- END   : User Input -->

			<!-- START : Text Error -->
			<transition name="transitionSlideLeftThenRight">
				<span v-if="error" class="spFormInputError">
					<i class="fas fa-exclamation-triangle"></i>
					{{ error }}
				</span>
			</transition>
			<!-- END   : Text Error -->

		</div>
		<!-- END   : spFormInput -->
	</transition>

</template>

<script>
export default
{
	// Vue name for this component.
    name : 'spFormInputUser',

	// Properties passed in when the component is called.
	props :
	{
		details :
		{
			type    : Object,
			default : function ()
			{
				return {
					value       : '',
					error       : '',
					label       : '',
					name        : '',
					description : '',
					required    : false,
					type        : '',
					minValue    : 2,
					locked      : false
				}
			}
		},

		error :
		{
			type    : String,
			default : ''
		}
	},

	data ()
	{
		return {
			// The value entered into the input box.
			inputValue : '',

			// A timer object which searches for a user when input is detected.
			userSearch : null,

			// Holds the found user details.
			userData : [],

			// Indicates if the search results dropdown is should be open.
			userResultsDropdown : false,

			// Indicates the current highlighted item in the list.
			currentHighlight : 0,

			// Indicates if the current data in the input box is a valid user.
			validInput : false,
		}
	},

	// Executed when component is created.
	created : function ()
	{
		// Register a listener for clearning input errors.
		this.$eventHub.$on( 'clearInputValue', ( name ) =>
		{
			if ( name === this.details.name )
			{
				this.clearInput();
			}
		});

		// If the component has pre-populated details.
		if ( this.details.value.name )
		{
			this.inputValue = this.details.value.name;
			this.validInput = true;
		}
	},

	methods :
	{
		// Clears the input value.
		clearInput : function ()
		{
			this.inputValue          = '';
			this.userResultsDropdown = false;
			this.currentHighlight    = 0;
			this.validInput          = false;
			this.userData            = [];

			// Create the object which will be sent to the form.
			let userValue =
			{
				name     : '',
				username : '',
			}

			// Emit the value to the parent form.
			this.$emit('input', userValue);
		},

		// Occures then input is defocused.
		onBlurInput : function ()
		{
			// If data exists, select the current highlighted item.
			if ( this.userResultsDropdown && this.userData.length > 0 )
			{
				this.selectUser( this.userData[this.currentHighlight] );
			}

			// High the dropdown.
			this.userResultsDropdown = false

			// Stop any searches.
			this.userSearch = null;

			// If the input isn't valid, clear whatever is in the box.
			if ( !this.validInput )
			{
				this.clearInput();
			}
		},

		// Executes when user hits escape key in the user search box.
		onEscapeInput : function ()
		{
			if ( this.inputValue.length )
			{
				this.clearInput();
			}
			else
			{
				// Deselect the user input.
				this.$refs.inputUser.blur();
			}
		},

		// Executes when user hits the delete key in the user search box.
		onDeleteInput : function ()
		{
			// If there is no more data in the input, clear the results.
			if ( !this.inputValue )
			{
				this.clearInput();
			}
		},

		// Moves the highlighted user item up.
		onKeyUpInput : function ()
		{
			if ( this.currentHighlight > 0 )
			{
				this.currentHighlight--;
			}
		},

		// Moves the highlighted user item down.
		onKeyDownInput : function ()
		{
			if ( this.currentHighlight < ( this.userData.length -1 ) )
			{
				this.currentHighlight++;
			}
		},

		// Select the current highlighted user if enter is pressed.
		onKeyEnterInput : function ()
		{
			this.selectUser( this.userData[this.currentHighlight] );
		},

		// Select the current highlighted user if tab is pressed.
		onKeyTabInput : function ()
		{
			this.selectUser( this.userData[this.currentHighlight] );
		},

		// Searches for the user name or ID.
		searchUser : function ()
		{
			// Emit a clear error call.
			this.$eventHub.$emit( 'clearFormInputError', this.details.name );

			// Clear the validity of the selection.
			this.validInput = false;

			// Clear any existing user data.
			this.userData = [];

			// Show the results drop down.
			this.userResultsDropdown = true;

			// Reset the highlight.
			this.currentHighlight = 0;

			// Enforce the minimal value.
			if ( this.inputValue.length >= this.details.minValue )
			{
				// Clear the current results.
				this.userData = [];

				// Callback when user search is successful.
				const onSuccess = ( result ) =>
				{
					// Remove the user search timer.
					this.userSearch = null;

					this.userData = result;
				}

				// Callback when user search fails.
				const onFailure = ( errorMessage ) =>
				{
					// Remove the user search timer.
					this.userSearch = null;

					// Sets the message details and sends the callbacks for confirm.
					this.setMessage
					({
						title      : 'Search Error',
						body       : 'There was a server error while searching for employee\'s:<br /><br />' + errorMessage,
						bodyHTML   : true,
						icon       : 'fas fa-exclamation-circle',
						iconColour : '#B71C1C',
						size       : 'medium',
						type       : 'ok'
					});

					// Shows the user message.
					this.showMessage();
				}

				// If there is a user search already in process, cancel it so a new one can be created.
				if ( this.userSearch )
				{
					clearTimeout( this.userSearch );
				}

				// Create a user search timer object.
				this.userSearch = setTimeout( () =>
				{
					// Search for the user.
					this.$spHelper.searchUsers( this.inputValue, onSuccess, onFailure );
				}, 500);
			}
		},

		// Registers the selected user in the input box.
		selectUser : function ( user )
		{
			// Set the selected user.
			this.inputValue = user.PreferredName;

			// Create the object which will be sent to the form.
			let userValue =
			{
				name     : user.PreferredName,
				username : user.UserName,
			}

			// Emit the value to the parent form.
			// NOTE: Emitting 'input' binds to a $parent's v-model.
			this.$emit('input', userValue);

			// Denote as valid.
			this.validInput = true;

			// Clear the search results.
			this.userResultsDropdown = false;

			// Deselect the user input.
			this.$refs.inputUser.blur();

			// Reset the highlight.
			this.currentHighlight = 0;
		}
	}
}
</script>

<style lang="scss"></style>

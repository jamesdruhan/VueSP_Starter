<template lang="html">

	<!-- START : spFormButton -->
	<button v-on:click="$emit(action)" type="button" class="spFormButton" :class="getClasses()" :disabled="locked">{{ buttonText }}</button>
	<!-- END   : spFormButton -->

</template>

<script>
export default
{
	// Vue name for this component.
    name : 'spFormButton',

	// Properties passed in when the component is called.
	props :
	{
		// The text displayed in the button.
		buttonText :
		{
			type    : String,
			default : ''
		},

		// The size of the button: small, medium or large.
		size :
		{
			type    : String,
			default : ''
		},

		// The colour class of the button: primary, primary-light, primary-dark, danger.
		colour :
		{
			type    : String,
			default : ''
		},

		// Where the button should be aligned: left or right.
		align :
		{
			type    : String,
			default : ''
		},

		// The emitted action when the button is clicked.
		action :
		{
			type    : String,
			default : ''
		},

		// Indicates if the button should be locked.
		locked :
		{
			type    : Boolean,
			default : false
		}
	},

	methods :
	{
		// Returns a collection of classes that should be applied to the button based on the props.
		getClasses : function ()
		{
			let classes = '';

			// Small Button
			if ( this.size === 'small' )
			{
				classes = classes + ' spFormButtonFixedSmall'
			}

			// Medium Button
			if ( this.size === 'medium' )
			{
				classes = classes + ' spFormButtonFixedMedium';
			}

			// Large Button
			if ( this.size === 'large' )
			{
				classes = classes + ' spFormButtonFixedLarge'
			}

			if ( this.colour === 'danger' )
			{
				classes = classes + ' spFormButtonDanger'
			}

			if ( this.colour === 'success' )
			{
				classes = classes + ' spFormButtonSuccess'
			}

			if ( this.colour === 'light' )
			{
				classes = classes + ' spFormButtonLight'
			}

			if ( this.colour === 'primary' )
			{
				classes = classes + ' spFormButtonPrimary'
			}

			if ( this.colour === 'primary-light' )
			{
				classes = classes + ' spFormButtonPrimaryLight'
			}

			if ( this.colour === 'primary-dark' )
			{
				classes = classes + ' spFormButtonPrimaryDark'
			}

			if ( this.colour === 'secondary' )
			{
				classes = classes + ' spFormButtonSecondary'
			}

			if ( this.colour === 'secondary-light' )
			{
				classes = classes + ' spFormButtonSecondaryLight'
			}

			if ( this.colour === 'secondary-dark' )
			{
				classes = classes + ' spFormButtonSecondaryDark'
			}

			if ( this.align === 'left' )
			{
				classes = classes + ' spFormButtonAlignLeft'
			}

			if ( this.align === 'right' )
			{
				classes = classes + ' spFormButtonAlignRight'
			}

			return classes;
		}
	}
}
</script>

<style lang="scss"></style>

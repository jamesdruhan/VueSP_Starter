<template lang="html">

	<!-- START : spForm -->
	<div class="spForm" :class="classes">

		<slot></slot>

	</div>
	<!-- END   : spForm -->

</template>

<script>
export default
{
	// Vue name for this component.
    name : 'spForm',

	// Properties passed in when the component is called.
	props :
	{
		// Colour of the background.
		colour :
		{
			type    : String,
			default : 'primary-dark'
		},

		// Colour of the background.
		blend :
		{
			type    : Boolean,
			default : false
		},

		// Adds/Removes the top separator effect.
		top :
		{
			type    : Boolean,
			default : true
		},

		// Adds/Removes the bottom separator effect.
		bottom :
		{
			type    : Boolean,
			default : true
		}
	},

	computed :
	{
		classes : function ()
		{
			let classToAdd = 'formColour-' + this.colour;

			if ( this.blend )
			{
				classToAdd = classToAdd + ' formBlend';
			}

			if ( this.bottom === false )
			{
				classToAdd = classToAdd + ' formNoBottom';
			}

			if ( this.top === false )
			{
				classToAdd = classToAdd + ' formNoTop';
			}

			return classToAdd;
		}
	}
}
</script>

<style lang="scss"></style>

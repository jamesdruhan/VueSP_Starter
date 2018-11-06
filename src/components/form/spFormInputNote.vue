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
			<label>{{details. label }}</label>
			<!-- END   : Text Label -->

			<!-- START : Text Description -->
			<span class="spFormInputDescription">{{ details.description }}</span>
			<!-- END   : Text Description -->

			<!-- START : Text Input -->
			<textarea v-bind:inputValue="inputValue" :value.prop="inputValue" v-on:input="setValue( $event )" class="spFormInputText spFormInputNote" type="text" :disabled="details.locked" :rows="details.rows"></textarea>
			<!-- END   : Text Input -->

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
    name : 'spFormInputNote',

	model :
	{
		prop  : 'inputValue',
		event : 'input'
	},

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
					minValue    : 0,
					locked      : false,
					rows        : 2
				}
			}
		},

		inputValue :
		{
			type    : String,
			default : ''
		},

		error :
		{
			type    : String,
			default : ''
		},
	},

	methods :
	{
		setValue : function ( $event )
		{
			// Emit a clear error call.
			this.$eventHub.$emit( 'clearFormInputError', this.details.name );

			// Emit the value to parent.
			this.$emit( 'input', $event.target.value )
		}
	}
}
</script>

<style lang="scss"></style>

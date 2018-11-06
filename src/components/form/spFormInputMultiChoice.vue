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

			<!-- START : Select Input -->
			<div class='spFormInputMultiChoice'>
				<div v-for="choice in details.choices" class="spFormInputMultiChoiceItem">
					<input type="checkbox" :id="choice.value" :value="choice.value" v-model="selectedItems" v-on:change="setValue()" :disabled="details.locked">
	  			  	<label :for="choice.value" class="noSelect">{{ choice.label }}</label>
				</div>
			</div>
			<!-- END   : Select Input -->

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
    name : 'spFormInputMultiChoice',

	// Properties passed in when the component is called.
	props :
	{
		details :
		{
			type    : Object,
			default : function ()
			{
				return {
					value       : [],
					error       : '',
					label       : '',
					name        : '',
					description : '',
					required    : false,
					type        : '',
					minValue    : 1,
					choices     : [],
					locked      : false,
					force       : []
				}
			}
		},

		error :
		{
			type    : String,
			default : ''
		},
	},

	// Local variables to this component.
	data ()
	{
		return {
			selectedItems : []
		}
	},

	// Executes when the component is fully mounted.
	mounted : function ()
	{
		// Set pre-selected values.
		if ( this.details.value.length > 0 )
		{
			this.selectedItems = this.details.value;
		}
		else
		{
			// Check for forced values.
			this.checkForcedValues();
		}
	},

	methods :
	{
		setValue : function ()
		{
			// Emit a clear error call.
			this.$eventHub.$emit( 'clearFormInputError', this.details.name );

			// Emit the value to parent.
			this.$emit( 'input', this.selectedItems );
		},

		// Checks the forced values setting and checks them off if exist.
		checkForcedValues : function ()
		{
			if ( this.details.force.length > 0 )
			{
				this.details.choices.forEach( ( choice ) =>
				{
					if ( this.details.force.includes( choice.label ) )
					{
						// Add the choice value to selected.
						this.selectedItems.push( choice.value );
					}

					// Push the selected values.
					this.setValue();
				})
			}
		}
	}
}
</script>

<style lang="scss"></style>

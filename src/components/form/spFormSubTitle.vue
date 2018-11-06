<template lang="html">

	<transition appear name="transitionFade">
		<!-- START : spFormSubTitle -->
		<div class="spFormSubTitle" :style="colour !== '' ? { color : colour } : ''">
			{{ titleText }}
		</div>
		<!-- END   : spFormSubTitle -->
	</transition>

</template>

<script>
export default
{
	// Vue name for this component.
    name : 'spFormSubTitle',

	// Properties passed in when the component is called.
	props :
	{
		titleText :
		{
			type    : String,
			default : ''
		},

		colour :
		{
			type    : String,
			default : ''
		}
	}
}
</script>

<style lang="scss"></style>

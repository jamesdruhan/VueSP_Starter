<template lang="html">

	<transition appear name="fade">
		<!-- START : spFormTitle -->
		<div class="spFormTitle">
			{{ titleText }}
		</div>
		<!-- END   : spFormTitle -->
	</transition>

</template>

<script>
export default
{
	// Vue name for this component.
    name : 'spFormTitle',

	// Properties passed in when the component is called.
	props :
	{
		titleText :
		{
			type    : String,
			default : ''
		}
	}
}
</script>

<style lang="scss"></style>

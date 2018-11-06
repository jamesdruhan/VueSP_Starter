<template lang="html">
	<!-- START : Loader -->
	<div class="spLoader">
		<div class="loadAnimation">
			<semipolar-spinner :animation-duration="2500" :size="60" :color="colour" />
		</div>

		<span>{{ message }}</span>
	</div>
	<!-- END  :  Loader -->
</template>

<script>
import { SemipolarSpinner } from 'epic-spinners'; //https://github.com/epicmaxco/epic-spinners

export default
{
	// Vue name for this component.
    name : 'spLoader',

	// Properties passed in when the component is called.
	props :
	{
		message :
		{
			type    : String,
			default : ''
		},

		colour :
		{
			type    : String,
			default : '#0072C6'
		}
	},

	// Other components this component uses.
	components :
	{
		SemipolarSpinner
	},
}
</script>

<style lang="scss">
	.spLoader
	{
		padding-top     : 1rem;
		padding-bottom  : 1rem;
		display         : flex;
		flex-direction  : column;
		align-self      : center;

		.loadAnimation
		{
			align-self : center;
		}

		span
		{
			text-align : center;
			margin-top : 1rem;
			font-size  : 1rem;
		}
	}
</style>

<template lang="html">
	<!-- START : Messenger -->
	<transition name="transitionFade">
		<div class="spMessenger-Modal">
			<div class="spMessenger-Container" :style="{ width : modalWidth }">
				<div class="spMessenger-Header"></div>

				<div class="spMessenger-Title">
                    <div class="spMessenger-Title-Icon" :style="{ 'background-color' : iconColour }">
                        <i :class="icon"></i>
                    </div>
                    <span>{{ title }}</span>
				</div>

				<div class="spMessenger-Body">
                    <spLoader v-if="loading" :message="body" :colour="'#819CA9'"></spLoader>
                    <span v-if="!loading && bodyHTML" v-html="body"></span>
                    <span v-if="!loading && !bodyHTML">{{ body }}</span>
				</div>

				<div v-if="!loading" class="spMessenger-Controls">
					<!-- START : 'OK' Type -->
                    <button v-if="type.toUpperCase() === 'OK'" v-on:click="okClick()" type="button" class="spFormButton spFormButtonPrimaryLight spFormButtonFixedSmall">OK</button>
					<!-- END   : 'OK' Type -->

					<!-- START : 'Confirm' Type -->
					<button v-if="type.toUpperCase() === 'CONFIRM'" v-on:click="confirmNo" type="button" class="spFormButton spFormButtonDanger spFormButtonFixedSmall">No</button>
                    <button v-if="type.toUpperCase() === 'CONFIRM'" v-on:click="confirmYes" type="button" class="spFormButton spFormButtonSuccess spFormButtonFixedSmall">Yes</button>
					<!-- END   : 'Confirm' Type -->
				</div>

				<div class="spMessenger-Footer"></div>
			</div>
		</div>
	</transition>
	<!-- END  :  Messenger -->
</template>

<script>
import { mapState } from 'vuex';

export default
{
    // Vue name for this component.
    name : 'spMessenger',

    // Local functions available to this component.
    methods :
    {
        // Executes when type === 'OK' and user clicks OK.
        okClick : function ()
        {
            // Executes the after callback (if exists.)
            if ( this.after )
            {
                this.after();
            }

            // Hide the message.
            this.hideMessage();
        }
    },

	// Calculated local variables that update when states change.
    computed :
    {
        // Maps the state of the spMessenger details to local component variables for easy access.
        ...mapState
        ({
            title      : state => state.message.title,
            body       : state => state.message.body,
            bodyHTML   : state => state.message.bodyHTML,
            size       : state => state.message.size,
            icon       : state => state.message.icon,
            iconColour : state => state.message.iconColour,
            type       : state => state.message.type,
            confirmNo  : state => state.message.confirmNo,
            confirmYes : state => state.message.confirmYes,
			after      : state => state.message.after,
			loading    : state => state.message.loading
        }),

        // Determines the modal width.
        modalWidth : function ()
        {
            return ( ( this.size === 'small' ) ? '20rem' : ( this.size === 'medium' ) ? '30 rem' : '40rem' );
        }
    }
}
</script>

<style lang="scss"></style>

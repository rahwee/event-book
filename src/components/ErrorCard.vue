<template>
    <SectionCard>
        <div class="space-y-4 items-center flex flex-col">
            <div class="text-red-500"><slot></slot></div>
            <RoundButton 
            @click="retry" 
            variant="danger"
            v-if="retry">Retry</RoundButton>
        </div> 
    </SectionCard>
</template>

<script setup>
import RoundButton from '@/components/RoundButton.vue';
import SectionCard from '@/components/SectionCard.vue';

defineProps({
    retry : {
        type: Function,
        required: false
    }
})

</script>
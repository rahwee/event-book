<template>
  <RoundCard>
    <div class="p-4 flex justify-between">
      <div>{{ title }} {{ status }}</div>
      <RoundButton variant="danger" @click="$emit('cancel')">Cancel</RoundButton>
    </div>
  </RoundCard>
</template>

<script setup>
import RoundCard from '@/components/RoundCard.vue';
import RoundButton from '@/components/RoundButton.vue';


defineEmits(['cancel']);
defineProps({
    title: String,
    status: String
})

</script>

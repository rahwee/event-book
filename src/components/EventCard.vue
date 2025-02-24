<template>
  <SectionCard>

    <template #header>
      {{ title }}
    </template>

    {{ date }}

    <template #footer>
      {{ description }}
      <RoundButton @click="$emit('register')">
        Register
      </RoundButton>
    </template>

  </SectionCard>
  

</template>

<script setup>
import SectionCard from '@/components/SectionCard.vue';
import RoundButton from '@/components/RoundButton.vue';


defineProps({
    title: String,
    date: String,
    description: String
})

defineEmits(['register'])
</script>

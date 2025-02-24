<template>
    <section class="flex justify-end">
      <button @click="$emit('click')" :class="['px-4 py-2 rounded-full', variants[variant] ?? variants.default]">
        <slot></slot>
      </button>
    </section>
</template>

<script setup>
  const variants = {
    'default':'border border-gray-200 hover:bg-gray-200',
    'danger': 'bg-red-200 enabled:hover:bg-red-100 text-red-900', 
  };

  defineProps({
    variant: {
      type: String,
      default: 'default'
    }
  })
  defineEmits(['click'])
</script>

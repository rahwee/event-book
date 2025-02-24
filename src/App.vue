<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl">Event booking app</h1>
    <h2 class="text-2xl font-semibold">All Events</h2>
    <EventList/>
    <BookingList/>
  </main>
</template>

<script setup>

import EventList from '@/components/EventList.vue';
import BookingList from '@/components/BookingList.vue';

</script>

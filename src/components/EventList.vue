<template >
    <template v-if="error">
        <ErrorCard :retry="fetchEvents">
          Can not get the event. Please try again
        </ErrorCard>
    </template>
    <template v-else>
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <template v-if="!loading">
            <template v-if="events.length">
                <EventCard v-for="event in events" 
                :key="event.id" 
                :title="event.title"
                :date="event.date"
                :description="event.description" 
                @register="handleRegister(event)"
                />
            </template>
            <template v-else>
                <div class="col-span-2 text-center text-gray-500">No events available</div> 
            </template>
        </template>
        <template v-else>
          <LoadingEventCard v-for="i in 4" :key="i"/>
        </template>
       
    </section>
</template>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import EventCard from '@/components/EventCard.vue';
import LoadingEventCard from '@/components/LoadingEventCard.vue';
import useBookings from '@/compossible/useBookings';
import ErrorCard from '@/components/ErrorCard.vue';

const { handleRegister } = useBookings();

const loading = ref(false);
const events  = ref([]);
const error   = ref(null);

const fetchEvents = async () => {

  loading.value = true;
  error.value   = null;

  try{
    const response     = await fetch('http://localhost:3001/events');
    events.value = await response.json();
  }catch(err){
    error.value = err.message;

  }finally{
    loading.value = false;
  }
};


onMounted( () =>{
  fetchEvents();
}
);

</script>
<template>
    <h2 class="text-2xl font-semibold">Your booking</h2>
    <template v-if="error">
        <ErrorCard :retry="fetchBookings">
          Can not get any booking. Please try again
        </ErrorCard>
    </template>
    <template v-else>
    <section class="grid grid-cols-1 gap-8">
        
        <div class="grid grid-cols-1 md:grid-clos-1 gap-8">
            <template v-if="!loading">
                <BookingItem v-for="booking in bookings" 
                :key="booking.id"
                :title="booking.eventTitle"
                :status="booking.status"
                @cancel="handleCancelBooking(booking.id)"
                />
            </template>
            <template v-else>
                <LoadingBookingCard v-for="i in 2" :key="i"/>
            </template>
            
        </div>
        </section>
    </template>
</template>

<script setup>
import { onMounted } from 'vue';
import BookingItem from '@/components/BookingItem.vue';
import LoadingBookingCard from '@/components/LoadingBookingCard.vue';
import useBookings from '@/compossible/useBookings';
import ErrorCard from '@/components/ErrorCard.vue';


const { 
  bookings, 
  loading, 
  error,
  fetchBookings,
  handleCancelBooking
} = useBookings();

onMounted( () =>{
  fetchBookings();
}
);

</script>
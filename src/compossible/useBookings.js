import { ref } from 'vue';


const bookings = ref([]);
const loading  = ref(false);
const error    = ref(null);

const findBooking = (bookingId) => bookings.value.findIndex((b) => b.id === bookingId);

const fetchBookings = async () => {

    loading.value = true;
    error.value   = null

    try{
      const response = await fetch('http://localhost:3001/bookings');
      bookings.value = await response.json();
    }catch(er){
      error.value = er;
    }
    finally{
      loading.value = false;
    }
}

const handleRegister = async (event) => {

  if(bookings.value.some(
    (b) => b.eventId === event.id && b.userId === 1
  )){
    alert('You have already registered for this event');
    return
  }
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    status: 'pending'
  }
  bookings.value.push(newBooking);
  try{
    const response = await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  });

  if(response.ok){
    const index = findBooking(newBooking.id);
    bookings.value[index] = await response.json();
  }else{
    throw new Error('Failed to confirm booking');
  }
  }catch(error){
    console.error('Failed to register for event', error);
    bookings.value = bookings.value.filter((b) => b.id !== newBooking.id);
  }
}

const handleCancelBooking = async (bookingId) => {
  
  const index = findBooking(bookingId);
  const originalBooking = bookings.value[index];

try{
  const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
    method: 'DELETE'
  });
  if(!response.ok){
    throw new Error('Failed to cancel booking');
  }

  bookings.value.splice(index, 1);

}catch(error){
  console.error('Failed to cancel booking', error);
  bookings.value.splice(index, 0, originalBooking);
}
}

export default function useBookings() {
    return {
        bookings,
        loading,
        error,
        fetchBookings,
        handleCancelBooking,
        handleRegister

    }
}


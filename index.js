// ------------------------------ booking data ---------------------------------
const bookingData = [
  {
    "id": 1,
    "roomId": "A101",
    "startTime": "2019-09-28 13:00:00",
    "endTime": "2019-09-28 14:00:00",
    "title": "Lunch with Petr"
  },
  {
    "id": 2,
    "roomId": "A101",
    "startTime": "2019-09-28 14:00:00",
    "endTime": "2019-09-28 15:00:00",
    "title": "Sales Weekly Meeting"
  },
  {
    "id": 3,
    "roomId": "A101",
    "startTime": "2019-09-28 16:00:00",
    "endTime": "2019-09-28 18:00:00",
    "title": "Anastasia Website Warroom"
  },
  {
    "id": 4,
    "roomId": "A101",
    "startTime": "2019-09-29 13:00:00",
    "endTime": "2019-09-29 14:00:00",
    "title": "One-on-One Session"
  },
  {
    "id": 5,
    "roomId": "A101",
    "startTime": "2019-09-29 16:00:00",
    "endTime": "2019-09-29 18:00:00",
    "title": "UGC Sprint Planning"
  },
  {
    "id": 6,
    "roomId": "A102",
    "startTime": "2019-09-30 09:00:00",
    "endTime": "2019-10-04 18:00:00",
    "title": "5-Day Design Sprint Workshop"
  },
  {
    "id": 7,
    "roomId": "Auditorium",
    "startTime": "2019-09-19 09:00:00",
    "endTime": "2019-09-23 19:00:00",
    "title": "Thai Tech Innovation 2019"
  },
  {
    "id": 8,
    "roomId": "A101",
    "startTime": "2019-5-29 14:00:00",
    "endTime": "2019-10-30 11:00:00",
    "title": "Raimonland project"
  },
  {
    "id": 9,
    "roomId": "A102",
    "startTime": "2019-05-29 14:00:00",
    "endTime": "2019-10-30 11:00:00",
    "title": "Management Meeting"
  },
  {
    "id": 10,
    "roomId": "A101",
    "startTime": "2019-05-29 14:33:00",
    "endTime": "2019-10-30 11:00:00",
    "title": "3-day workshop Corgi costume"
  }
];
// ---------------------------- room number query and render function ------------------------------

const urlParams = window.location.search;
const myParam = urlParams.slice(6);
const roomNumberQuery = myParam.charAt(0).toUpperCase()+myParam.slice(1); 

renderRoomNumber = () => {
  const roomNumber = `<span>${roomNumberQuery}</span>`;
  const room = document.querySelector('.room-number');
  room.innerHTML = roomNumber;
}
renderRoomNumber();

// ---------------------- check available room function ------------------------
const checkAvailability = ( roomId, startTime, endTime ) => {

  let start = new Date(startTime);
  let end = new Date(endTime);

  // ---------------- use array filter method to check booking -------------------
  const inputRoom = bookingData.filter(booking => {
    if(booking.roomId == roomId) {
      let bookingStartTime = new Date(booking.startTime);
      let bookingEndTime = new Date(booking.endTime);

      if((bookingStartTime <= start && bookingEndTime >= start) || 
          (bookingStartTime <= end && bookingEndTime >= end) || 
          (bookingStartTime >= start && bookingEndTime <= end))
          {
            return booking;
          }
    }
  });
  return (inputRoom.length == 0) ? true : false; 
}

// --------------------------get current booking data function -----------------------------
const getBookingsForWeek = ( roomId ) => {
  let result = [];

  let todayForThisWeek = new Date();
  // -------------------------- this week calculation ----------------------------
  const firstDayOfThisWeek = new Date(todayForThisWeek.setDate(todayForThisWeek.getDate() - todayForThisWeek.getDay() + 1));
  const lastDayOfThisWeek = new Date(todayForThisWeek.setDate(todayForThisWeek.getDate() - todayForThisWeek.getDay() + 7));
  // -------------------------- next week calculation ----------------------------
  let todayForNextWeek = new Date();
  const firstDayOfNextWeek = new Date(todayForNextWeek.setDate(todayForNextWeek.getDate() - todayForNextWeek.getDay() + 8));
  const lastDayOfNextWeek = new Date(todayForNextWeek.setDate(todayForNextWeek.getDate() - todayForNextWeek.getDay() + 15));

  let todayForCurrent = new Date();
  bookingData.forEach(booking => {
    let bookingStartTime = new Date(booking.startTime);
    let bookingEndTime = new Date(booking.endTime);

    if(booking.roomId == roomId) {
      // --------------------------- check today booking -----------------------------
      if(todayForCurrent >= bookingStartTime && todayForCurrent <= bookingEndTime) {
        result.push(booking);
      } 
      // ------------------------- check this week booking ---------------------------
      else if((bookingStartTime <= firstDayOfThisWeek && bookingEndTime >= firstDayOfThisWeek) || 
              (bookingStartTime <= lastDayOfThisWeek && bookingEndTime >= lastDayOfThisWeek) || 
              (bookingStartTime >= firstDayOfThisWeek && bookingEndTime <= lastDayOfThisWeek)) {
        result.push(booking);
      } 
      // ------------------------- check next week booking ---------------------------
      else if((bookingStartTime <= firstDayOfNextWeek && bookingEndTime >= firstDayOfNextWeek) || 
              (bookingStartTime <= lastDayOfNextWeek && bookingEndTime >= lastDayOfNextWeek) || 
              (bookingStartTime >= firstDayOfNextWeek && bookingEndTime <= lastDayOfNextWeek)) {
        result.push(booking);
      }
    }
  })

  return result;
}
// ------------------ render function for upcoming booking ---------------------
const renderBookings = ( roomId ) => {
  const options = { month: 'long'};
  let upcomingMeetingBooking = '';
  let bookingRightSide = '';
  const bookingList = getBookingsForWeek(roomId);
  if(bookingList.length > 0 ) {
    const currentBooking = bookingList.shift();
    // ----------------------------- current booking of left side-------------------------------
    const upcomingDate = new Date(currentBooking.startTime);
    const currentMonth = new Intl.DateTimeFormat('en-US', options).format(upcomingDate);
    const currentDay = upcomingDate.toLocaleString("default", { weekday: "short" })
    const currentDayNumber = upcomingDate.getDate();
    const start = new Date(currentBooking.startTime);
    const end = new Date(currentBooking.endTime);
    const htmlCurrentBooking = `<p class="upcoming-text">Upcoming</p>
                                <p class="upcoming-day">${currentDay}</p>
                                <p class="upcoming-month">${currentDayNumber} ${currentMonth}</p>
                                <div class="current-booking">
                                  <p class="time">${start.getHours()+":"+start.getMinutes()} - ${end.getHours()+":"+end.getMinutes()}</p>
                                  <p class="title">${currentBooking.title}</p>
                                </div>`;
    // -------------------------- render recent booking ----------------------------
    const upcomingQuery = document.querySelector('.upcoming');
    upcomingQuery.innerHTML = htmlCurrentBooking;
  }

  // ---------------------------- upcoming Bookings of left side------------------------------
  if(bookingList.length > 0) {
    bookingList.forEach(meeting => {
      let meetingStart = new Date(meeting.startTime);
      let meetingEnd = new Date(meeting.endTime);
      let meetingHTML = `<div>
                            <p class="time">${meetingStart.getHours()+":"+meetingStart.getMinutes()} - ${meetingEnd.getHours()+":"+meetingEnd.getMinutes()}</p>
                            <p class="title">${meeting.title}</p>
                        </div>`
  
        upcomingMeetingBooking += meetingHTML;
    })
  }
  // ---------------------------- bookings for right side ------------------------------
  const bookingListForRightSide = getBookingsForWeek(roomId);
  if (bookingListForRightSide.length > 0 ) {
    bookingListForRightSide.forEach(booking => {
      let currentDate = new Date(booking.startTime);
      let currentMonth = new Intl.DateTimeFormat('en-US', options).format(currentDate);
      let currentDay = currentDate.toLocaleString("default", { weekday: "short" })
      let currentDayNumber = currentDate.getDate();
      let meetingStart = new Date(booking.startTime);
      let meetingEnd = new Date(booking.endTime);
      let html = `<div class="booking-date">
                        <p>${currentDay} ${currentDayNumber} - ${currentMonth}</p>
                    </div>
                    <div class="booking-time">
                        <p class="duration">${meetingStart.getHours()+":"+meetingStart.getMinutes()} - ${meetingEnd.getHours()+":"+meetingEnd.getMinutes()}</p>
                        <p class="title">${booking.title}</p>
                    </div>`;
        bookingRightSide +=html;
    })
  }
  // -------------------------- render next bookings -----------------------------
  const upcomingMeetingQuery = document.querySelector('.upcoming-meeting');
  upcomingMeetingQuery.innerHTML = upcomingMeetingBooking;
  // ------------------------ render left side booking ---------------------------
  const rightSideQuery = document.querySelector('.bookings');
  rightSideQuery.innerHTML = bookingRightSide;
}
renderBookings(roomNumberQuery);
// const result1 = checkAvailability("A101", "2019-09-28 14:00:00", "2019-09-28 15:00:00");
// console.log(result1);

//<------------------TimeSlot---------------------->
const TimeSlots = [
  { id: 1, time: '10AM - 11AM' },
  { id: 2, time: '11AM - 12PM' },
  { id: 3, time: '1PM  - 2PM ' },
  { id: 4, time: '2PM  - 3PM ' },
  { id: 5, time: '3PM  - 4PM ' },
  { id: 6, time: '4PM  - 5PM ' },
  { id: 7, time: '5PM  - 6PM ' },
  { id: 8, time: '6PM  - 7PM ' },
  { id: 9, time: '7PM  - 8PM ' },
  { id: 10,time: '8PM  - 9PM ' },
  { id: 11,time: '9PM  - 10PM' },
];

function getTimeSlot(id) {
  const listTimeSlots = {
    '1' : '10AM - 11AM',
    '2' : '11AM - 12PM',
    '3' : '1PM  - 2PM' ,
    '4' : '2PM  - 3PM' ,
    '5' : '3PM  - 4PM' ,
    '6' : '4PM  - 5PM' ,
    '7' : '5PM  - 6PM' ,
    '8' : '6PM  - 7PM' ,
    '9' : '7PM  - 8PM' ,
    '10': '8PM  - 9PM' ,
    '11': '9PM  - 10PM',
  };

  return listTimeSlots[id] || 'Unknown Time Slot';
};

export { TimeSlots, getTimeSlot };
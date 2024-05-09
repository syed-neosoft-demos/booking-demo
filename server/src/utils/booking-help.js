export const getReserveSeat = async (seat, booking) => {
  //GET RESERVED SEATS
  const reserveSeat = [];
  for (let i = 0; i < seat.length; i++) {
    for (let j = 0; j < booking.length; j++) {
      if (seat[i].seatNumber === booking[j].seatNumber) reserveSeat.push(seat[i]);
    }
  }
  return reserveSeat;
};

export const getAvailabeSeat = () => {
  const availableSeat = seat.filter(
    (item) => !reserveSeat.find((el) => el?.seat_number === item.seat_number)
  );
};

import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [seat, setSeat] = useState(0);
  const [loading, setLoading] = useState(false);
  const getSeat = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3002/booking/chart");
      setLoading(false);
      setData(res.data);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  useEffect(() => {
    getSeat();
  }, []);

  const handleBook = async () => {
    const res = await axios.post("http://localhost:3002/booking/booked", {
      numberOfSeats: seat,
    });
    console.log("res", res);
    getSeat();
  };

  return (
    <div className="App">
      <div className="input">
        <input
          type="number"
          name="seat"
          placeholder="enter number of seat"
          onChange={(e) => setSeat(e.target.value)}
          value={seat}
        />
        <input
          type="button"
          name="seat"
          value="Submit"
          placeholder="enter number of seat"
          onClick={handleBook}
        />
      </div>

      <h1>Seat Availability </h1>
      <div className="seat-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            {data?.map((el) => {
              return (
                <div className={`cell ${el?.status === "booked" && "red"}`}>
                  {el?.seatNumber}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

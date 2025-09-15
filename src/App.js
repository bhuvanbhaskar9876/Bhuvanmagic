import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("https://your-backend-url.com"); // yaha apne backend ka link daalna hai

function App() {
  const [room, setRoom] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [connected, setConnected] = useState(false);
  const [isMagician, setIsMagician] = useState(false);

  // Join room and setup listener
  const joinRoom = () => {
    socket.emit("join-room", room);
    setConnected(true);
    socket.on("search-result", (data) => {
      setResult(data);
    });
  };

  // Magician search
  const handleSearch = () => {
    if (isMagician) {
      socket.emit("search", { room, query });
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "60px" }}>
      <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png" alt="Google" style={{marginBottom: 30}} />
      <h2>BhuvanMagic Google</h2>

      {!connected ? (
        <div>
          <input
            type="text"
            placeholder="Room Code (e.g. 12345)"
            value={room}
            onChange={e => setRoom(e.target.value)}
            style={{ padding: '10px', fontSize: '16px' }}
          />
          <br/><br/>
          <button onClick={joinRoom} style={{ padding: '10px 20px', fontSize: '16px' }}>Connect</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setIsMagician(!isMagician)}>
            {isMagician ? "You are Magician" : "You are Audience"}
          </button>
          <br/><br/>
          <input
            type="text"
            placeholder="Search Google..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            disabled={!isMagician}
            style={{ padding: '10px', fontSize: '16px', width: '60%' }}
          />
          <button onClick={handleSearch} disabled={!isMagician} style={{ padding: '10px 20px', fontSize: '16px', marginLeft: 10 }}>Search</button>
          <br/><br/>
          <div style={{ border: '1px solid #eee', background: '#fafafa', padding: '20px', width: '70%', margin: 'auto', minHeight: '50px' }}>
            {result && (
              <div>
                <h3 style={{ color: '#1a73e8' }}>{query}</h3>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

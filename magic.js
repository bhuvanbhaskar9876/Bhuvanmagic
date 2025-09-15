let room = "";
let role = "";

function joinRoom() {
  room = document.getElementById("roomcode").value.trim();
  if (!room) {
    document.getElementById('status').innerText = "Room code daaliye!";
    return;
  }
  document.getElementById('status').innerText = "Room code set: " + room;
  document.getElementById('searchSection').style.display = "block";
  localStorage.setItem("room_bhuvanmagic", room);
}

function setRole(r) {
  role = r;
  document.getElementById('roleinfo').innerText = "Aapka role: " + (role === "magician" ? "Magician (control phone)" : "Audience (show phone)");
  localStorage.setItem("role_bhuvanmagic", role);
  document.getElementById('searchBtn').disabled = (role !== "magician");
  document.getElementById('query').disabled = (role !== "magician");
}

function doSearch() {
  if (role !== "magician") return;
  const query = document.getElementById('query').value.trim();
  if (!query) return;
  localStorage.setItem("search_" + room, query);
  showResult(query);
}

function showResult(q) {
  document.getElementById('result').innerHTML = "<b style='color:#1a73e8'>" + q + "</b><br><span style='color:#444'>Google result for \"" + q + "\" (magic!)</span>";
}

setInterval(() => {
  room = localStorage.getItem("room_bhuvanmagic") || "";
  role = localStorage.getItem("role_bhuvanmagic") || "";
  if (room && role === "audience") {
    const q = localStorage.getItem("search_" + room);
    if (q) showResult(q);
  }
}, 800);

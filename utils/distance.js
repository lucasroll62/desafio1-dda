export default function calcCrow(lat1p, lon1p, lat2p, lon2p) {
  const R = 6371; // km
  const dLat = toRad(lat2p - lat1p);
  const dLon = toRad(lon2p - lon1p);
  const lat1 = toRad(lat1p);
  const lat2 = toRad(lat2p);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
        + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function toRad(Value) {
  return Value * (Math.PI / 180);
}

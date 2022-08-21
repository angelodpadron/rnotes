export default function getTimeStamp() {
  let currentdate = new Date();
  let timestamp =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();

  return timestamp;
}

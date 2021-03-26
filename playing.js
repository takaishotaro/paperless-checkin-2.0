const today = new Date();
console.log(today.toLocaleString({ timeZone: 'Asia/Tokyo' }).split(' ')[0]);
console.log(today)
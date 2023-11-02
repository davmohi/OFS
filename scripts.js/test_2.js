const nats = iterate(0, n => n + 1);
const even = nats.filter(n => n % 2 === 0);
const evenLessThanEleven = even.filter(n => n > 10);
const onlyFiveAfterTen = evenLessThanEleven.cut(5);
onlyFiveAfterTen.map(n => console.log(n));
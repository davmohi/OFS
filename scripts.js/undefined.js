// Generated by OFS compiler v 0.0 2023-11-23 05:38:56
const printIt = it => console.log(it);
const parity_map_50 = iterate(0, n => n + 1).filter(n =>   ( n != 0 )? "odd" : "even").cut(50);
parity_map_50.map(printIt);


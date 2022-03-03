const readInt = (data : Array<number>) : number =>

{  
  const out = (data.map((num, index) => (num * 2 ** (8 * index)) )
  .reduce((sum, summand) => sum + summand, 0) << 32) >> 32;
  return out; }

export = readInt;

const readInt = (data : Array<number>) : number => 
(data.map((num, index) => (num * 2 ** (8 * index)) )
  .reduce((sum, summand) => sum + summand, 0) << 32) >> 32; 

export = readInt;

const read4ByteInteger = (data : Array<number>) : number =>
  data.map((num, index) => (num * 2 ** (8 * index)) )
      .reduce((sum, summand) => sum + summand, 0);

export = read4ByteInteger;

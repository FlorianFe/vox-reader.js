const read4ByteInteger = (data) =>
  data.map((num, index) => (num * 2 ** (8 * index)) )
      .reduce((sum, summand) => sum + summand, 0);

module.exports = read4ByteInteger;

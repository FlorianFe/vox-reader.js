
// see https://en.wikipedia.org/wiki/IEEE_754

const BYTE_SIZE = 8;

const flatten = (array) =>
  [].concat.apply([], array);

const binarifyByte = (byte) =>
{
  let bits = [];

  for(let i=1; i <= BYTE_SIZE; i++)
  {
    const divident = 2 ** (BYTE_SIZE - i);
    const bit = parseInt(byte / divident);

    bits.push(bit);

    byte = byte % divident;
  }

  return bits.reverse();
}

const getExponentValueOfBits = (bits) =>
  bits.reduce((sum, bit, index) =>
    (sum + ((bit) ? 2 ** (BYTE_SIZE - index - 1) : 0))
  , -127);

const getMantissaValueOfBits = (bits, denormalized) =>
  bits.reduce((sum, bit, index) =>
  {
    return sum + ((bit) ? 2 ** ((-1 * index) - 1) : 0)
  }, (denormalized ? 0 : 1));


const read4ByteFloat = (data) =>
{
  data = data.reverse();

  const deepBits = data.map(byte => binarifyByte(byte).reverse());
  const bits = flatten(deepBits);

  const sign = bits[0];

  let exponent = getExponentValueOfBits(bits.slice(1, 9));
  const denormalized = (exponent === -127);
  exponent += denormalized ? 1 : 0;

  const mantissa = getMantissaValueOfBits(bits.slice(9), denormalized);

  // potentes in JavaScript causes wrong result
  if(mantissa === 0) return 0;

  return ((sign) ? -1 : 1) * mantissa ** exponent;
}


module.exports = read4ByteFloat;

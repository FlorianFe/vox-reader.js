
const read4ByteString = (data) =>
  data.map(charCode => String.fromCharCode(charCode))
      .join('');

module.exports = read4ByteString;

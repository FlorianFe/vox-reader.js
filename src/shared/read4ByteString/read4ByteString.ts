
const read4ByteString = (data : Array<number>) : string =>
  data.map(charCode => String.fromCharCode(charCode))
      .join('');

export = read4ByteString;


const readString = (data : Array<number>) : string =>
  data.map(charCode => String.fromCharCode(charCode))
      .join('');

export = readString;

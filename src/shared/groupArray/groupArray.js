
const groupArray = (array, groupSize) =>
{
  return array.reduce((result, item, index) =>
  {
    const i1 = parseInt(index / groupSize);
    const i2 = index % groupSize;

    if(i2 == 0) result.push([]);

    result[i1].push(item);

    return result;
  }, []);
}

module.exports = groupArray;

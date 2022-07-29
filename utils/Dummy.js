const generatedData = {
  text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae fuga minus tempore esse corporis blanditiis obcaecati iste ea veritatis. Aut aspernatur iure consequuntur ad vel officia molestiae, explicabo ab repellendus.",
  key: 1,
};

const addDummyData = (array, times) => {
  for (let i = 0; i < times; i++) {
    generatedData.key += i;
    array.push(generatedData);
  }

  return array;
};

export default addDummyData;

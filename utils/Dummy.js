const largeLorem =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, sapiente! Consectetur et dolorem nam tempora cupiditate debitis impedit non eligendi nesciunt labore nobis est, aliquid voluptas dolore aliquam praesentium adipisci corporis unde sed dicta neque? Maiores, quidem, numquam omnis quod optio soluta enim odio eligendi dolores esse beatae laborum expedita?";

const addDummyData = (times) => {
  let array = [];

  for (let i = 0; i < times; i++) {
    array.push({
      title: "lorem title",
      text:
        Math.random() < 0.5
          ? largeLorem.slice(0, largeLorem.length / 2)
          : largeLorem,
      key: i + 1,
    });
  }

  return array;
};

export default addDummyData;

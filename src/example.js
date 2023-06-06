import Lister from './Lister'

export default function createExample() {
  const list = Lister();

  for (let i = 0; i < 4; i++) {
    if (i > 0) {
      list.createNewList();
      let currListName = `My List ${i + 1}`;
      list.deleteItem(currListName, 0);
      for (let j = 0; j < 5; j++) {
        list.addItem(currListName);
        list.updateItem(
          currListName,
          j,
          `My Title ${j + 1}`,
          `My Description ${j + 1}`,
          new Date(2023, 5, j + 6),
          false,
          false,
        );
      };
    };
  };

  list.updateItem(
    "My List 2",
    3,
    "Different Title",
    "Different Description",
    new Date(2023, 6, 6),
    true,
    true
  );
  list.updateItem(
    "My List 3",
    3,
    "Different Title",
    "Different Description",
    new Date(2023, 5, 6),
    true,
    true
  );

  return list;
};
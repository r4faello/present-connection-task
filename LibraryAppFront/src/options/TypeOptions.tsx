const TypeOptions = () => {
  const types = [
    "Fantasy",
    "Action",
    "Romance",
    "Thriller",
    "Comedy",
    "Scientific",
    "Fiction",
  ];
  const options = [];
  for (var i = 0; i < types.length; i++) {
    options.push(
      <option key={i} value={types[i].toLowerCase()}>
        {types[i]}
      </option>
    );
  }

  return options;
};

export default TypeOptions;

const YearOptions = () => {
  const options = [];
  for (var year = 1900; year <= 2024; year++) {
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  return options;
};

export default YearOptions;

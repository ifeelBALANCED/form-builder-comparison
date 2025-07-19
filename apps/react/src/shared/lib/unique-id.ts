export const uniqueId = (length = 16) => {
  return String(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', ''),
  );
};

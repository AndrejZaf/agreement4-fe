export const insertAtIndex = (
  str: string,
  element: string,
  index: number,
  lastIndex: number
) => {
  return str.slice(0, index) + element + str.slice(lastIndex);
};

export const toSentenceCase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

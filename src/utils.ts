export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return false;
  }
};

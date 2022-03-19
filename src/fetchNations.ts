import { Nations } from "./types";
const url = "https://flagcdn.com/it/codes.json";

const fetchNations = async (): Promise<Nations> => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export default fetchNations;

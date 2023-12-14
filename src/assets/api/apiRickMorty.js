import axios from "axios";
const url = "";

const getCharters = async (Page) => {
  const charters = await axios.get(`${url}?Page=${Page}`);
  return charters.data.results;
};
export default getCharters;
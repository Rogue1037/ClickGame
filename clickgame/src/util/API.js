import axios from "axios";

const BASEURL = "https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=4f82aad81edf09ddae1833aecf5099ac";


// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  search: function(query) {
    return axios.get(BASEURL);
  }
};
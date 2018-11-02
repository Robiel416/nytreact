var axios = require("axios");

// Exporting an object with methods for retrieving and posting data to our API
module.exports = {

    searchArticles: function(queryURL) {
        return axios.get(queryURL)
    },

    saveArticle: function(article) {
        return axios.post("/api/saved", article)
    },

    getSaved: function() {
        return axios.get("/api/saved")
    },

    deleteArticle: function(article) {
        return axios.delete("/api/saved/" + article._id)
    }
};
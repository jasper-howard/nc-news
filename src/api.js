import axios from "axios";

const fetchAllArticles = (topic) => {
  if (topic === "all") {
    return axios
      .get(`https://nc-be-news.herokuapp.com/api/articles`)
      .then((res) => {
        return res.data;
      });
  } else
    return axios
      .get(`https://nc-be-news.herokuapp.com/api/articles?topic=${topic}`)
      .then((res) => {
        return res.data;
      });
};

const fetchArticle = (article_id) => {
  return axios
    .get(`https://nc-be-news.herokuapp.com/api/articles/${article_id}`)
    .then((res) => {
      return res.data;
    });
};

export { fetchAllArticles, fetchArticle };

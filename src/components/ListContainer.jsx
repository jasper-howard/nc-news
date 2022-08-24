import { fetchAllArticles } from "../api.js";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ListItem from "./ListItem.jsx";
import { useParams, useSearchParams } from "react-router-dom";

const ListContainer = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryObj = Object.fromEntries([...searchParams]);
  const [sort_by, setSort_by] = useState(queryObj.sort_by);
  const [order, setOrder] = useState(queryObj.order);

  const queryAssignObj = {};

  if (sort_by) {
    queryAssignObj.sort_by = sort_by;
  }
  if (!sort_by) {
    delete queryAssignObj.sort_by;
  }
  if (order) {
    queryAssignObj.order = order;
  }
  if (!order) {
    delete queryAssignObj.order;
  }

  useEffect(() => {
    fetchAllArticles(topic, sort_by, order).then(({ articles }) => {
      setAllArticles(articles);
      setLoading(false);
      setSearchParams(queryAssignObj); /// wants this in dependencies but then it glitches
    });
  }, [topic, sort_by, order, setSearchParams]);

  const listItems = allArticles.map((article, index) => {
    return <ListItem article={article} unique={index} key={index} />;
  });

  return loading ? (
    <em>LOADING...ListContainer</em>
  ) : (
    <div>
      <section>
        <form>
          <label>SORT: </label>
          <select
            onChange={(event) => {
              setSort_by(event.target.value);
              // setSearchParams({ sort_by: event.target.value }); this feels like better place but it replaces other query
            }}
            className="Select"
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </form>
        <form>
          <label>ORDER: </label>
          <select
            onChange={(event) => {
              setOrder(event.target.value);
              // setSearchParams({ order: event.target.value });
            }}
            className="Select"
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Asending</option>
          </select>
        </form>
      </section>
      {listItems}
    </div>
  );
};

export default ListContainer;

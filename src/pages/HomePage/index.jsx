import queryString from "query-string";
import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";
import MagicBox from "./components/MagicBox";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Lam DACS 😉" },
    { id: 2, title: "Lam DACS 😁😁😎" },
    { id: 3, title: "Lam DACS 😁" },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requesttUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requesttUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch postlist..,", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handlePageChange(newPage) {
    console.log("new page: ", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  function handleTodoList(todo) {
    console.log(todo);
    const newTodoList = todoList.filter((x) => x.id !== todo.id);

    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log(formValues);
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFilterChange(newFilters) {
    console.log(newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerms,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      {/* <MagicBox /> */}
      {/* <h1>Hooks - API</h1> */}

      {/* <BetterClock />
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide CLock</button> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoList}/> */}
      {/* <PostFiltersForm onSubmit={handleFilterChange} />
      <PostList posts={postList}/>
      <Pagination 
        pagination={pagination} 
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import supabase from "./supabase";

import Loader from "./components/Loader";
import Header from "./components/Header";
import NewToolForm from "./components/NewToolForm";
import CategoryFilter from "./components/CategoryFilter";
import ToolList from "./components/ToolList";
import "./style.scss";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getTools() {
        setIsLoading(true);

        let query = supabase.from("tools").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: tools, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setTools(tools);
        else alert("There was a problem getting data");
        setIsLoading(false);
      }
      getTools();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewToolForm setTools={setTools} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <ToolList tools={tools} setTools={setTools} />
        )}
      </main>
    </>
  );
}

export default App;

import { useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "../data/categories";

function Tool({ tool, setTools }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    tool.votesInteresting + tool.votesMindblowing < tool.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedTool, error } = await supabase
      .from("tools")
      .update({ [columnName]: tool[columnName] + 1 })
      .eq("id", tool.id)
      .select();
    setIsUpdating(false);

    if (!error)
      setTools((tools) =>
        tools.map((f) => (f.id === tool.id ? updatedTool[0] : f))
      );
  }

  return (
    <li className="tool__list_item item">
      <p>
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}
        {tool.text}
        <a
          className="item-source"
          href={tool.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="item-tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === tool.category)
            .color,
        }}
      >
        {CATEGORIES.find((cat) => cat.name === tool.category).label}
      </span>
      <div className="item-votes">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {tool.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {tool.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {tool.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default Tool;

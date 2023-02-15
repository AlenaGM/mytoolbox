import { useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "../data/categories";

function NewToolForm({ setTools, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data is valid. If so, create a new tool
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Upload tool to Supabase and receive the new tool object
      setIsUploading(true);
      const { data: newTool, error } = await supabase
        .from("tools")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new tool to the UI: add the tool to state
      if (!error) setTools((tools) => [newTool[0], ...tools]);

      // 5. Reset input fields
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a tool or a good artcle..."
        value={text}
        maxLength={200}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Link..."
        maxLength={2000}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn__large" disabled={isUploading}>
        Send
      </button>
    </form>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

export default NewToolForm;

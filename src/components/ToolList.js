import Tool from "./Tool";

function ToolList({ tools, setTools }) {
  if (tools.length === 0)
    return (
      <p className="message">
        No tools for this category yet! Create the first one ✌️
      </p>
    );

  return (
    <section className="tool">
      <ul className="tool__list">
        {tools.map((tool) => (
          <Tool key={tool.id} tool={tool} setTools={setTools} />
        ))}
      </ul>
      <p>There are {tools.length} tools in the database. Add yours!</p>
    </section>
  );
}

export default ToolList;

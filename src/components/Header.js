function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="logo.png" alt="Today I Learned Logo" />
        <h1>My Tools & Tips</h1>
      </div>

      <button
        className="header__btn btn btn__large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a tool"}
      </button>
    </header>
  );
}

export default Header;

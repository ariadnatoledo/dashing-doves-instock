import "./PagesHeader.scss";

function DisplayHeader({ title }) {
  return (
    <div className="pages-header">
      <h2 className="pages-header__title">{ title }</h2>
      <div className="pages-header__search-and-add">
        <div className="pages-header__search">
          <input
            type="text"
            className="pages-header__search-input"
            placeholder="Search..."
          />
          <button className="pages-header__search-button">
            <img
              src="src/assets/Icons/search-24px.svg"
              alt="Search icon"
              className="pages-header__search-button-icon"
            />
          </button>
        </div>
          <button className="pages-header__button">+ Add New Warehouse</button>
      </div>
      
    </div>
  );
}

export default DisplayHeader;

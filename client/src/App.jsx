import { Link } from "react-router-dom";

function App() {
  const categories = ["landshaft", "animals", "sky", "natur"];

  return (
    <div className="container text-center mt-5">
      <h1>Categories</h1>

      <div className="d-flex justify-content-center gap-4 mt-4">
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat}`} className="btn btn-primary">
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;

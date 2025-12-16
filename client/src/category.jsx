import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, addData, deleteData, uploadImage } from "./api";

function Category() {
  const { name } = useParams(); 
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getData();
      setData(res.filter((item) => item.categorie === name));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadData();
  }, [name]);


  const handleAdd = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Fill all fields");

    try {
      const img = await uploadImage(file);
      await addData({
        title,
        categorie: name,
        img: img.filePath,
      });

      setTitle("");
      setFile(null);
      await loadData(); 
    } catch (err) {
      console.log(err.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      await loadData();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{name.toUpperCase()}</h2>

      {/* ADD */}
      <form
        onSubmit={handleAdd}
        className="mb-5 d-flex gap-2 align-items-center"
      >
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-success">Add photo</button>
      </form>

      {/* CARDS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex flex-wrap gap-4">
          {data.map((item) => (
            <div className="card" style={{ width: "18rem" }} key={item.id}>
              <img src={item.img} className="card-img-top" alt={item.title} />
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5>{item.title}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;

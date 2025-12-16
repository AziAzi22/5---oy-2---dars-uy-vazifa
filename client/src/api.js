const API = "http://localhost:4500";

export const getData = async () => {
  const res = await fetch(`${API}/get_data`);
  return res.json();
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API}/single_upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const addData = async (data) => {
  const res = await fetch(`${API}/add_data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteData = async (id) => {
  const res = await fetch(`${API}/delete_data/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

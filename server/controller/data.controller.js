const { v4 } = require("uuid");
const { read_file, write_file } = require("../manager/file-manager");

/// get data

const getData = async (req, res) => {
  try {
    const data = read_file("data.json");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/// add data

const addData = async (req, res) => {
  try {
    const data = read_file("data.json");
    const { categorie, title, img } = req.body;

    if (!title || !categorie || !img) {
      return res.status(400).json({
        message: "title, categorie and img is required",
      });
    }

    const newData = [...data, { id: v4(), categorie, title, img }];

    write_file("data.json", newData);
    res.status(201).json({
      message: "Data is added",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// delete data

const deleteData = async (req, res) => {
  try {
    const data = read_file("data.json");
    const newData = data.filter((item) => item.id !== req.params.id);
    write_file("data.json", newData);
    res.status(200).json({
      message: "Data is deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getData, addData, deleteData };

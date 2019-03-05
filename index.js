import express from "express";

const PORT = 3000;
const app = express();

app.get("/", (req, res) =>
  res.json({
    status: "OK MAN"
  })
);

app.listen(PORT, () => console.log(`Listening - Port${PORT}`));

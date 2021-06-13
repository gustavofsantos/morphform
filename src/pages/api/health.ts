import { NextApiHandler } from "next";

const handleHealth: NextApiHandler = (req, res) => {
  res.status(200);
  res.write("I'm alive");
  res.end();
};

export default handleHealth;

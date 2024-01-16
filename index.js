const axios = require("axios");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "results.txt");
const startUrl = "https://www.letsrevolutionizetesting.com/challenge.json";

clearFile = () => {
  fs.writeFileSync(filePath, "", { flag: "w+" });
};

const api = async (url) => {
  try {
    const res = await axios.get(url);
    fs.writeFileSync(filePath, JSON.stringify(res.data) + "\n", { flag: "a" });
    return res.data;
  } catch (err) {
    fs.writeFileSync(filePath, "error: " + JSON.stringify(err) + "\n", { flag: "a" });
  }
};

const challenge = async () => {
  let res;
  let url = startUrl;

  while (true) {
    res = await api(url);
    if (!res) break;

    url = res.follow;
    if (!url) break;

    url = url.replace("challenge", "challenge.json");
  }
};

const main = async () => {
  clearFile();
  await challenge();
  console.log("Finished the challenge, now open the file results.txt");
};

main();

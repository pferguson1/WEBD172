const { MongoClient } = require("mongodb");

async function run() {
  const imageMap = [
    { id: 1, file: "house_of_wax.jpg", name: "The House of Wax" },
    { id: 2, file: "tales_of_terror.jpg", name: "Tales of Terror" },
    { id: 3, file: "the_raven.jpg", name: "The Raven" },
    { id: 4, file: "the_tingler.jpg", name: "The Tingler" },
    { id: 5, file: "the_fly.jpg", name: "The Fly" },
    { id: 6, file: "the_bat.jpg", name: "The Bat" },
    { id: 7, file: "theatre_of_blood.jpg", name: "Theatre of Blood" },
    { id: 8, file: "madhouse.jpg", name: "MadHouse" },
  ];

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const moviesCollection = client.db("web172").collection("movies");

  let modified = 0;
  for (const movie of imageMap) {
    const image = `/images/${movie.file}`;
    const imageTag = `<img src="${image}" alt="${movie.name}" />`;

    const result = await moviesCollection.updateOne(
      { id: movie.id },
      { $set: { image, imageTag } }
    );

    modified += result.modifiedCount;
  }

  const sample = await moviesCollection
    .find({}, { projection: { _id: 0, id: 1, name: 1, image: 1, imageTag: 1 } })
    .sort({ id: 1 })
    .limit(3)
    .toArray();

  console.log(`Updated image fields on ${modified} document(s).`);
  console.log(JSON.stringify(sample, null, 2));

  await client.close();
}

run().catch((error) => {
  console.error("Failed to update movie images:", error);
  process.exit(1);
});

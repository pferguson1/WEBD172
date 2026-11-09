// WEBD 172 — Week 9 MongoDB CRUD Demo
// Run these examples one section at a time in mongosh.

// --------------------------------------------------
// 1. SELECT THE DATABASE
// --------------------------------------------------

db = db.getSiblingDB("webd172");

// --------------------------------------------------
// 2. CREATE — INSERT MOVIE DOCUMENTS
// --------------------------------------------------

db.movies.insertMany([
  {
    
    id: 1,
    name: "The House of Wax",
    year: 1953,
    description:
      "An obsessed pathologist discovers and captures a parasitic creature that grows when fear grips its host.",
    image: "theHouseOfWaxImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f05a'),
    id: 2,
    name: "Tales of Terror",
    year: 1962,
    description:
      "A horror movie star returns Three short sequences, based on the following Poe tales, are presented: 'Morella', 'The Black Cat', and 'The Facts in the Case of M. Valdemar.",
    image: "talesOfTerrorImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f05b'),
    id: 3,
    name: "The Raven",
    year: 1963,
    description:
      "A magician, who has been turned into a raven, turns to a former sorcerer for help.",
    image: "theRavenImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f05c'),
    id: 4,
    name: "The Tingler",
    year: 1959,
    description:
      "An obsessed pathologist discovers and captures a parasitic creature that grows when fear grips its host.",
    image: "theTinglerImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f05d'),
    id: 5,
    name: "The Fly",
    year: 1958,
    description:
      "A scientist's experiment to teleport a fly goes horribly wrong, merging the fly with his own DNA.",
    image: "theFlyImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f05e'),
    id: 6,
    name: "The Bat",
    year: 1958,
    description:
      "Cornelia Van Gorder goes on a hunting trip with her physician, Dr. Malcolm Wells. Fleming confesses to stealing over $1 million in negotiable securities from the bank. Wells shoots Fleming and covers up the murder.",
    image: "theBatImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f05f'),
    id: 7,
    name: "Theatre of Blood",
    year: 1958,
    description:
      "After being humiliated by members of the London Theatre Critics Guild, Vincent Price, Shakespearean actor is seen apparently committing suicide by diving into the Thames from a great height. He actually survives, however, and is rescued by a group of vagrants.",
    image: "theatreOfBloodImage.jpg",
    delivery: "Online",
  },
  {
    _id: ObjectId('6af1263191c9eecdd680f060'),
    id: 8,
    name: "MadHouse",
    year: 1958,
    description:
      "Paul Toombes is a successful horror actor whose trademark role is Dr. Death, a skull-faced serial killer. When Toombes' wife is murdered, he is accused of the crime and sent to an asylum. The real killer, however, is still at large.",
    image: "madHouseImage.jpg",
    delivery: "Online",
  },
]);

// --------------------------------------------------
// 3. READ — DISPLAY ALL MOVIES
// --------------------------------------------------

db.movies.find();

// --------------------------------------------------
// 4. READ — FIND ONE MOVIE
// --------------------------------------------------

db.movies.findOne({
  name: "The Bat",
});

// --------------------------------------------------
// 5. READ — FILTER THE COLLECTION
// --------------------------------------------------

db.movies.find({
  image: "madhouseImage",
});

db.movies.find({
  id: 3,
});

db.movies.find({
  delivery: "Online",
});

// --------------------------------------------------
// 6. UPDATE — CHANGE ONE MOVIE'S DELIVERY METHOD
// --------------------------------------------------

db.movies.updateOne(
  {
    name: "The Bat",
  },
  {
    $set: {
      delivery: "Fully Online",
    },
  },
);

// --------------------------------------------------
// 7. READ — CONFIRM THE UPDATE
// --------------------------------------------------

db.movies.findOne({
  name: "The Bat",
});

// --------------------------------------------------
// 8. CREATE — ADD A TEMPORARY MOVIE
// --------------------------------------------------

db.movies.insertOne({
  name: "Temporary Movie",
  image: "temporaryMovieImage",
  id: 9,
  delivery: "Online",
});

// --------------------------------------------------
// 9. DELETE — REMOVE THE TEMPORARY MOVIE
// --------------------------------------------------

db.movies.deleteOne({
  name: "Temporary Movie",
});

// --------------------------------------------------
// 10. READ — CONFIRM THE DELETE
// --------------------------------------------------

db.movies.find();

// --------------------------------------------------
// OPTIONAL CLEANUP
// --------------------------------------------------
// Uncomment only if you want to remove all documents
// and start the demonstration again.
//
// db.movies.deleteMany({});

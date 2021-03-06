const mongoose = require("mongoose");

const List = require("../models/List");
const Word = require("../models/Word");
const ListRelation = require("../models/ListRelation");
const WordsRelation = require("../models/WordsRelation");
const lists = require("./lists");
const words = require("./words");

mongoose.connect("mongodb://localhost:27017/brain-pocket", () => {
  console.log("Connected with MongoDB on port 27017 >>>");
});

const asyncFunc = async () => {
  await List.deleteMany({});
  await Word.deleteMany({});
  await ListRelation.deleteMany({});
  await WordsRelation.deleteMany({});

  const userId = "62a8be5ddc0ac9b2a042e5aa";

  await Promise.all(
    lists.map(async list => {
      list.userId = userId;
      list.active = true;

      list = await new List(list).save();

      return await new ListRelation({
        listId: list,
        userId,
        active: true
      }).save();
    })
  );

  await Promise.all(
    words.map(async word => {
      word.active = true;

      return await new Word(word).save();
    })
  );

  const fetchedWords = await Word.find({});

  for (let i = 0; i < fetchedWords.length; i += 3) {
    const wordsRelation = {
      firstWordId: fetchedWords[i],
      secondWordId: fetchedWords[i + 1],
      thirdWordId: fetchedWords[i + 2],
      userId,
      active: true
    };

    if (fetchedWords[i].columnTitle === "German") {
      wordsRelation.listRelationId = await ListRelation.findOne({
        listId: await List.findOne({ title: "German/English" })
      });

      await new WordsRelation(wordsRelation).save();
    } else if (fetchedWords[i].columnTitle === "Turkish") {
      wordsRelation.listRelationId = await ListRelation.findOne({
        listId: await List.findOne({ title: "Turkish/English" })
      });

      await new WordsRelation(wordsRelation).save();
    } else {
      wordsRelation.listRelationId = await ListRelation.findOne({
        listId: await List.findOne({ title: "Spanish/English" })
      });

      await new WordsRelation(wordsRelation).save();
    }
  }
};

asyncFunc();

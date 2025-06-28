import mongoose from "mongoose";

async function main() {
  await mongoose.connect("mongodb://localhost:27017/uiagent");
  const History = mongoose.model(
    "History",
    new mongoose.Schema({
      prompt: String,
      code: String,
      user: String,
      createdAt: { type: Date, default: Date.now }
    })
  );
  await History.create([
    {
      prompt: "Сгенерируй адаптивную шапку сайта на Material UI v7",
      code: "// Пример компонента шапки...",
      user: "testuser",
    },
    {
      prompt: "Создай форму логина с валидацией email",
      code: "// Пример компонента формы логина...",
      user: "testuser",
    }
  ]);
  console.log("Seed completed!");
  await mongoose.disconnect();
}
main();

import { exec } from "child_process";
import fs from "fs/promises"; // Using async-friendly file system operations

export const runCodeHandler = async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    const fileExt = {
      c: "c",
      cpp: "cpp",
      python: "py",
      javascript: "js",
      java: "java",
      php: "php",
      ruby: "rb",
      sql: "sql",
    }[language];

    if (!fileExt) {
      return res.status(400).json({ error: "Unsupported language" });
    }

    const tempFile = `temp.${fileExt}`;
    await fs.writeFile(tempFile, code);

    let command = "";
    switch (language) {
      case "c":
        command = `gcc ${tempFile} -o temp && ./temp`;
        break;
      case "cpp":
        command = `g++ ${tempFile} -o temp && ./temp`;
        break;
      case "python":
        command = `python ${tempFile}`;
        break;
      case "javascript":
        command = `node ${tempFile}`;
        break;
      case "java":
        await fs.writeFile("Main.java", code);
        command = `javac Main.java && java Main`;
        break;
      case "php":
        command = `php ${tempFile}`;
        break;
      case "ruby":
        command = `ruby ${tempFile}`;
        break;
      case "sql":
        command = `sqlite3 :memory: ".read ${tempFile}"`;
        break;
    }

    exec(command, async (error, stdout, stderr) => {
      await fs.unlink(tempFile).catch(() => {}); // Ensure file cleanup
      if (language === "java") await fs.unlink("Main.class").catch(() => {});

      if (error) {
        return res.status(500).json({ error: stderr || "Execution error." });
      }

      res.json({ response: stdout });
    });
  } catch (error) {
    console.error("Execution Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

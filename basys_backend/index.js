const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PSWD,
  port: process.env.DB_PORT,
});

// Login

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query =
      "SELECT id, username, password,role FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    if (result.rows.length === 0) {
      console.log("length:", result.rows.length);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = result.rows[0];
    console.log(user);
    const hashedPassword = user.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// addProvider
app.post("/addProvider", async (req, res) => {
  try {
    const { userName, passWord, ...providerData } = req.body;
    const hashedPassword = await bcrypt.hash(passWord, 10);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const userInsertQuery =
        "INSERT INTO users(username, password,role,status) VALUES($1, $2, $3, $4) RETURNING id";
      const userInsertValues = [
        userName,
        hashedPassword,
        "provider",
        "invite_sent",
      ];
      const {
        rows: [{ id: userId }],
      } = await client.query(userInsertQuery, userInsertValues);
      const providerInsertQuery = `
          INSERT INTO providerData(user_id, firstName, lastName, nickName, phoneNumber, email, gender, access, entity, licenseNumber, npiNumber, speciality, payerPlan, physical_address, billing_address)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        `;
      const providerInsertValues = [
        userId,
        providerData.firstName,
        providerData.lastName,
        providerData.nickName,
        providerData.phone,
        providerData.email,
        providerData.gender,
        providerData.access,
        providerData.entityName,
        providerData.licenseNumber,
        providerData.npiNumber,
        providerData.speciality,
        providerData.payerPlan,
        providerData.physical_address,
        providerData.billing_address,
      ];
      await client.query(providerInsertQuery, providerInsertValues);
      await client.query("COMMIT");

      res.status(200).json({ message: "Provider added successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error adding provider:", error);
    res.status(500).json({ message: "Error adding provider" });
  }
});

// getProvider

app.get("/getProviderData", async (req, res) => {
  try {
    const query = "SELECT * FROM providerData";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching providerData:", error);
    res.status(500).json({ error: "Error fetching providerData" });
  }
});

// addPayer
app.post("/addPayer", async (req, res) => {
  try {
    const { userName, passWord, ...providerData } = req.body;
    const hashedPassword = await bcrypt.hash(passWord, 10);
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const userInsertQuery =
        "INSERT INTO users(username, password,role,status) VALUES($1, $2, $3, $4) RETURNING id";
      const userInsertValues = [
        userName,
        hashedPassword,
        "payer",
        "invite_sent",
      ];
      const {
        rows: [{ id: userId }],
      } = await client.query(userInsertQuery, userInsertValues);

      const providerInsertQuery = `
              INSERT INTO payerData(user_id, firstName, lastName, nickName, phoneNumber, email, gender, access, entity, taxId, providerNetwork, physical_address, billing_address)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            `;
      const providerInsertValues = [
        userId,
        providerData.firstName,
        providerData.lastName,
        providerData.nickName,
        providerData.phone,
        providerData.email,
        providerData.gender,
        providerData.access,
        providerData.entityName,
        providerData.taxId,
        providerData.providerNetworks,
        providerData.physical_address,
        providerData.billing_address,
      ];
      await client.query(providerInsertQuery, providerInsertValues);

      await client.query("COMMIT");

      res.status(200).json({ message: "Provider added successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding payer" });
  }
});

// getPayer
app.get("/getPayerData", async (req, res) => {
  try {
    const query = "SELECT * FROM payerData";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching providerData:", error);
    res.status(500).json({ error: "Error fetching providerData" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

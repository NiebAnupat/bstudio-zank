import mysql from "mysql2";
export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const execute = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, values, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const getAll = async (table) => {
  return await execute(`SELECT * FROM ${table}`);
};

export const getOne = async (table, where, condition) => {
  return await execute(`SELECT * FROM ${table} WHERE ${where} = ?`, [
    condition,
  ]);
};

export const createOne = async (table, data) => {
  return await execute(`INSERT INTO ${table} SET ?`, [data]);
};

export const updateOne = async (table, data, where, condition) => {
  return await execute(`UPDATE ${table} SET ? WHERE ${where} = ?`, [
    data,
    condition,
  ]);
};

export const deleteOne = async (table, where, condition) => {
  return await execute(`DELETE FROM ${table} WHERE ${where} = ?`, [condition]);
};

export const getOneWithJoin = async (table, join, where, condition) => {
  return await execute(
    `SELECT * FROM ${table} INNER JOIN ${join} ON ${table}.${where} = ${join}.${where} WHERE ${table}.${where} = ?`,
    [condition]
  );
};

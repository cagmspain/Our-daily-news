"use strict";

const { getDB } = require("../../db/db");

const createNew = async (req, res, next) => {
	let connection;

	try {
		connection = await getDB();

		//leo del body los datos
		const { leadIn, newsText, topic } = req.body;
		if (!leadIn || !newsText || !topic) {
			const error = new Error("completa los campos obligatorios");
			error.httpStatus = 400;
			throw error;
		}

		//FIX ME req.headers.authorization
		const [result] = await connection.query(
			`
              INSERT INTO news (leadIn, newsText, topic, user_id)
              VALUES (?,?,?,?);
          `,
			[leadIn, newsText, topic, 1]
		);

		//console.log("result", result);

		res.send({
			status: "ok",
			message: "creo noticia",
			data: [],
		});
	} catch (error) {
		next(error);
	} finally {
		if (connection) connection.release();
	}
};

module.exports = createNew;

"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");

const deletedDate = require("../utils/deletedDate");
const deletedTime = require("../utils/deletedTime");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createOrder = (event, context, callback) => {
	const datetime = new Date().toISOString();
	const data = JSON.parse(event.body);

	if (
		typeof data.manufacturer !== "string" &&
		typeof data.model !== "string" &&
		typeof data.price !== "number"
	) {
		console.error("DataType error!");
		const response = {
			statusCode: 400,
			body: JSON.stringify({ message: "Check DataTypes!" }),
		};

		return;
	}

	const params = {
		TableName: "carOrder",
		Item: {
			id: uuid.v1(),
			manufacturer: data.manufacturer,
			model: data.model,
			price: data.price,
			expiredAt: deletedTime,
			createdAt: datetime,
			updatedAt: datetime,
			expiredDate: deletedDate,
		},
	};

	dynamoDb.put(params, (error, data) => {
		if (error) {
			console.error(error);
			callback(new Error(error));
			return;
		}

		const response = {
			statusCode: 201,
			body: JSON.stringify(data.Item),
		};

		callback(null, response);
	});
};

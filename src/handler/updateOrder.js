"use strict";

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateOrder = (event, context, callback) => {
	const datetime = new Date().toISOString();
	const data = JSON.parse(event.body);

	if (
		typeof data.manufacturer !== "string" &&
		typeof data.model !== "string" &&
		typeof data.price !== "number"
	) {
		console.error("Check DataTypes!");
		const response = {
			statusCode: 400,
			body: JSON.stringify({
				message: "Check DataTypes!",
			}),
		};

		return;
	}

	const params = {
		TableName: "carOrder",
		Key: {
			id: event.pathParameters.id,
		},
		ExpressionAttributeValues: {
			":m": data.manufacturer,
			":n": data.model,
			":p": data.price,
			":u": datetime,
		},
		UpdateExpression:
			"set manufacturer = :m, model = :n, price= :p, updatedAt = :u",
	};

	dynamoDb.update(params, (error, data) => {
		if (error) {
			console.error(error);
			callback(new Error(error));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify(data.Item),
		};

		callback(null, response);
	});
};

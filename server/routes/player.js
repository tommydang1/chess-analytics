const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-west-1",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "Players";

router.get("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      username: req.query.username,
    },
  };
  await dynamodb
    .get(params)
    .promise()
    .then(
      (response) => {
        res.json(response.Item);
      },
      (error) => {
        console.error("Error: ", error);
        res.status(500).send(error);
      }
    );
});

router.get("/all", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
  };
  try {
    const allUsernames = await scanDynamoRecords(params, []);
    const body = {
      usernames: allUsernames,
    };
    res.json(body);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Item: req.body,
  };
  await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: req.body,
        };
        res.json(body);
      },
      (error) => {
        console.error("Error: ", error);
        res.status(500).send(error);
      }
    );
});

router.patch("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      username: req.body.username,
    },
    UpdateExpression: `set ${req.body.updateKey} = :value`,
    ExpressionAttributeValues: {
      ":value": req.body.updateValue,
    },
    ReturnValues: "UPDATED_NEW",
  };
  await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          UpdatedAttributes: response,
        };
        res.json(body);
      },
      (error) => {
        console.error("Error: ", error);
        res.status(500).send(error);
      }
    );
});

router.delete("/", async (req, res) => {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      username: req.body.username,
    },
    ReturnValues: "ALL_OLD",
  };
  await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
        res.json(body);
      },
      (error) => {
        console.error("Error: ", error);
        res.status(500).send(error);
      }
    );
});

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = router;

import * as mongoDB from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const collections: {
  doTasks?: mongoDB.Collection;
  scheduleTasks?: mongoDB.Collection;
  delegateTasks?: mongoDB.Collection;
  deleteTasks?: mongoDB.Collection;
} = {};

const connectionString =
  (process.env.DB_CONN_STRING as string) + process.env.DB_NAME;

const connectToDatabase = async () => {
  try {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      connectionString
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const doTasksCollection: mongoDB.Collection = db.collection(
      process.env.TO_DO_COLLECTION_NAME as string
    );
    const scheduleTasksCollection: mongoDB.Collection = db.collection(
      process.env.TO_SCHEDULE_COLLECTION_NAME as string
    );
    const delegateTasksCollection: mongoDB.Collection = db.collection(
      process.env.TO_DELEGATE_COLLECTION_NAME as string
    );
    const deleteTasksCollection: mongoDB.Collection = db.collection(
      process.env.TO_DELETE_COLLECTION_NAME as string
    );

    collections.doTasks = doTasksCollection;
    collections.scheduleTasks = scheduleTasksCollection;
    collections.delegateTasks = delegateTasksCollection;
    collections.deleteTasks = deleteTasksCollection;

    console.log(`Successfully connected to database: ${db.databaseName}`);
  } catch (error) {
    console.error(`couldn't connect to database: ${process.env.DB_NAME}`);
  }
};

export { connectToDatabase, collections };

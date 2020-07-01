require('dotenv').config();
const moment = require('moment');

const { MongoClient } = require('mongodb');

const {v4: uuid} = require('uuid');
const fastify = require('fastify')({
  logger: true
});
const { INTERNAL_PORT = 5100, PORT = 5100, HOST = '0.0.0.0', DB_USER, DB_PASSWORD, DB_URL, SERVER_NAME = 'feature-request-rest-api', DB_NAME } = process.env;

const dbUrl = DB_URL.replace(/<dbuser>/, DB_USER).replace(/<dbpassword>/, DB_PASSWORD);

// reference to the database filled later (bad design but this is a simple test).
let db;

fastify.register(require('fastify-cors'), {});
fastify.register(require('fastify-healthcheck'));

/*
// String is shorthand for {type: String}
const featureRequestSchema = new Schema({
    id:  String,
    version: String,
    title: String,
    email: String,
    content:   String,
    comments: [{ body: String, date: Date, email: String }],
    createdAt: { type: Date, default: Date.now },
    lastUpdatedAt: { type: Date, default: Date.now },
    tags: [String],
    votes: [{score: Number, email: String}]
  });
*/

// TODO: manage the connection, we should use a pool and we should release the connection as soon as possible.
const client = new MongoClient(dbUrl);

async function fetchAll() {
  const collection = db.collection('feature-requests');
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((err, docs) => {
      if(err) {
        return reject(err);
      }
      return resolve(docs);
    });
  });
}

async function create(featureRequest) {
  // validation is made by the fastify definition
  // TODO: this should be made through kafka since we are respecting CQRS
  const collection = db.collection('feature-requests');
  if(!featureRequest.version) {
    featureRequest.version = uuid();
  }
  // TODO: ensure all consistency here
  const r = await collection.insertOne(featureRequest); // let the error bubbling here, log doesn't matter for now
}

async function save(featureRequest) {
  const collection = db.collection('feature-requests');
  const { id, version, title, lastUpdatedAt = moment().unix(), content, tags } = featureRequest;
  const newVersion = uuid;
  const r = await collection.findOneAndUpdate({id:featureRequest.id, version: featureRequest.version}, {$set: {title, content, version: newVersion, lastUpdatedAt, tags}}, {
    returnOriginal: false,
    upsert: true
  });
}

async function findById(id) {
  return {};
}

async function deleteById(id) {
  return 1;
}

fastify.get('/v1/feature-requests', async (request, reply) => {
  let requestId = request.headers['x-request-id'];
  request.log.info(`RequestId is : ${requestId}`);
  if (!requestId) {
    requestId = uuid();
  }
  request.log.info({requestId}, "Handle a request to fetch all users");
  try {
    const requests = await fetchAll();
    reply.status(200)
      .header('x-request-id', requestId)
      .header('x-server-info', SERVER_NAME)
      .header('Content-Type', 'application/vnd.feature-requests.v1+json')
      .send({etag: uuid(), items:requests});
  } catch (e) {
    reply.status(500).send();
  }
});

fastify.post('/v1/feature-requests', async (request, reply) => {
  let requestId = request.headers['x-request-id'];
  if (!requestId) {
    requestId = uuid();
  }
  request.log.info({requestId}, "Handle a request to create a new feature requests");
  try {
    const { body: featureRequest } = request;
    featureRequest.id = uuid();
    await create(featureRequest)
    reply.status(201)
      .header('x-request-id', requestId)
      .header('x-server-info', SERVER_NAME)
      .send();
      
  } catch(e) {
    reply.status(500).send();
  }
});

fastify.get('/v1/feature-requests/:featureRequestId', async (request, reply) => {
  let requestId = request.headers['x-request-id'];
  if (requestId === null) {
    requestId = uuid();
  }
  
  request.log.info({requestId}, "Handle a request to fetch feature requests by id");
  
  try {
    const { featureRequestId } = request.params;
    const featureRequest = await findById(featureRequestId);
    
    if(featureRequest) {
      reply.status(200)
        .header('x-request-id', requestId)
        .header('x-server-info', SERVER_NAME)
        .header('Content-Type', 'application/vnd.feature-requests.v1+json')
        .send(featureRequest);
    } else {
      reply.status(404)
        .header('x-request-id', requestId)
        .header('x-server-info', 'fr-001')
        .send();
    }
      
  } catch(e) {
    reply.status(500).send();
  }
});

fastify.patch('/v1/feature-requests/:featureRequestId', async (request, reply) => {
  let requestId = request.headers['x-request-id'];
  if (requestId === null) {
    requestId = uuid();
  }
  request.log.info({requestId}, "Handle a request to patch a feature requests");
  try {
    const { featureRequestId } = request.params;
    const { body } = request;
    try {
      reply.status(200)
          .header('x-request-id', requestId)
          .header('x-server-info', SERVER_NAME)
          .send();
    } catch(ex) {
      reply.status(500).send({code: 1, message: ex.message || ex});
    }
  } catch(ex) {
    reply.status(500).send({code: 1, message: ex.message || ex});
  }
});

fastify.put('/v1/feature-requests/:featureRequestId', async (request, reply) => {
  let requestId = request.headers['x-request-id'];
  if (requestId === null) {
    requestId = uuid();
  }
  request.log.info({requestId}, "Handle a request to fetch all feature requests");
  try {
    const { featureRequestId } = request.params;
    const featureRequest = await findById(featureRequestId);
    const { body: updatedFeatureRequest } = request;
    
    if(featureRequest) {
      try {
        save(updatedFeatureRequest);
        reply.status(205)
          .header('x-request-id', requestId)
          .header('x-server-info', 'fr-001')
          .send(updatedFeatureRequest);
      } catch(ex) {
        reply.status(500).send({code: 1, message: ex.message || ex});
      }
    } else {
      reply.status(404)
        .header('x-request-id', requestId)
        .header('x-server-info', 'fr-001')
        .send();
    }
      
  } catch(ex) {
    reply.status(500).send({code: 1, message: ex.message || ex});
  }
});

fastify.delete('/v1/feature-requests/:featureRequestId', async (request, reply) => {
  let requestId = request.headers['x-request-id'];
  if (requestId === null) {
    requestId = uuid();
  }
  request.log.info({requestId}, "Handle a request to delete a feature feature requests");
  try {
    const { featureRequestId } = request.params;
    const r = await deleteById(featureRequestId);
    
    if(r == 1) {
      try {
        reply.status(200)
          .header('x-request-id', requestId)
          .header('x-server-info', SERVER_NAME)
          .send();
      } catch(ex) {
        reply.status(500).send({code: 1, message: ex.message || ex});
      }
    } else {
      reply.status(404)
        .header('x-request-id', requestId)
        .header('x-server-info', SERVER_NAME)
        .send();
    }
      
  } catch(ex) {
    reply.status(500).send({code: 1, message: ex.message || ex});
  }
});

const start = async () => {
  try {
    await fastify.listen(INTERNAL_PORT, HOST)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};


// Use connect method to connect to the Server
client.connect(function(err) {
  if(err) {
    console.log(`The system is unable to start since an error occured ${err.message || err}`);
    process.exit(1);
  } else {
    console.log("Connected successfully to server");
    db = client.db(DB_NAME);
    start();
  }
});

fastify.addHook('onClose', async (instance, done) => {
  await client.close();
  done()
})

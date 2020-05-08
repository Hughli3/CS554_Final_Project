const taskRoutes = require('./tasks');

const constructorMethod = (app) => {
  let counter = {}

  const logRequestDetail = (req, res, next) => {
    if(Object.keys(req.body).length != 0) {
      console.log("Request body is", req.body);
    }
    console.log(`${req.method} ${req.originalUrl}`)

    next();
  }

  const logRequestCount = (req, res, next) => {
    if (counter[req.originalUrl]) {
      counter[req.originalUrl] = counter[req.originalUrl] + 1;
    } else {
      counter[req.originalUrl] = 1;
    }
    console.log(`URL: ${req.originalUrl} Requested Times: ${counter[req.originalUrl]}`)

    next();
  }

  app.use(logRequestDetail);

  app.use(logRequestCount);

  app.use('/api/tasks', taskRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;
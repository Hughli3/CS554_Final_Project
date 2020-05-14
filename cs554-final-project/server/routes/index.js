const propertyRoutes = require('./property');
const userRoutes = require('./user');
const imageRoutes = require('./image');
// const watchlistRoutes = require('./watchlist');

const constructorMethod = (app) => {

  const logRequestDetail = (req, res, next) => {
    if(Object.keys(req.body).length != 0) {
      console.log("Request body is", req.body);
    }
    console.log(`${req.method} ${req.originalUrl}`)

    next();
  }

  app.use(logRequestDetail);

  app.use('/api/property', propertyRoutes);
  app.use('/api/user', userRoutes);
  
<<<<<<< HEAD
  // app.use('/image', imageRoutes);
=======
  app.use('/api/image', imageRoutes);
>>>>>>> abc56bc65b4922ef5794c446bc698e967e031ede

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;

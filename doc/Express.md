#Getting started
Express application generator

Use the application generator tool, express-generator, to quickly create an application skeleton.

The express-generator package installs the express command-line tool. Use the following command to do so:

$ npm install express-generator -g


express

  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options

destination is not empty, continue? [y/N] n
aborting

Display the command options with the -h option:

$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
For example, the following creates an Express app named myapp. The app will be created in a folder named myapp in the current working directory and the view engine will be set to Pug:

$ express --view=pug myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
Then install dependencies:

$ cd myapp
$ npm install
On MacOS or Linux, run the app with this command:

$ DEBUG=myapp:* npm start
On Windows, use this command:

> set DEBUG=myapp:* & npm start
Then load http://localhost:3000/ in your browser to access the app.

The generated app has the following directory structure:

.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
The app structure created by the generator is just one of many ways to structure Express apps. Feel free to use this structure or modify it to best suit your needs.


##Serving static files in Express
To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

Pass the name of the directory that contains the static assets to the express.static middleware function to start serving the files directly. For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:

```js
  app.use(express.static('public'))  // app.use() ???  
```
Now, you can load the files that are in the public directory:

http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
To use multiple static assets directories, call the express.static middleware function multiple times:

app.use(express.static('public'))
app.use(express.static('files'))
*Express looks up the files in the order in which you set the static directories with the express.static middleware function.*

NOTE: For best results, use a reverse proxy cache to improve performance of serving static assets.

Use a reverse proxy
A reverse proxy sits in front of a web app and performs supporting operations on the requests, apart from directing requests to the app. It can handle error pages, compression, caching, serving files, and load balancing among other things.

Handing over tasks that do not require knowledge of application state to a reverse proxy frees up Express to perform specialized application tasks. For this reason, it is recommended to run Express behind a reverse proxy like Nginx or HAProxy in production.

To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function, specify a mount path for the static directory, as shown below:

app.use('/static', express.static('public'))
Now, you can load the files that are in the public directory from the /static path prefix.

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
However, the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:

app.use('/static', express.static(path.join(__ dirname, 'public')))



#Guide
##Routing
it refers to the definition of application end points(URIs) and how they respond to client requests.

###basic routing
routing
refers to
determining how an app responds to a client request to a particular endpoint, which is a URI(or path) and a specific http request method(get, post and so on)

each routes can have one or more handler functions, which are executed when the route is matched

Route  definition takes the following structure

*app.METHOD(PATH, HEANDLER)*

where:
- app is an instance of express.
- METHOD is an http request method, in lowercase
- PATH is a path on the server
- HEANDLER is the function executed when the route is matched

This tutorial assumes that an instance of express named app is created and the server is running. If you are not familiar with creating an app and starting it, see the Hello world example.

The req (request) and res (response) are the exact same objects that Node provides, so you can invoke req.pipe(), req.on('data', callback), and anything else you would do without Express involved.


```js
// Respond to POST request on the root route (/), the application’s home page:
app.post('/', function (req, res) {
  res.send('Got a POST request')
})


// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})


// Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})      
```
###route methods
a route method is derived from one of the http methods, and is attached to an instance of the express class
The following code is an example of routes that are defined for the get and post methods to the root of the app

// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

Express supports the following routing methods that correspond to HTTP methods: get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, and connect.

To route methods that translate to invalid JavaScript variable names, use the bracket notation. For example, app['m-search']('/', function ...
There is a special routing method, app.all(), which is not derived from any HTTP method. This method is used for loading middleware functions at a path for all request methods.

```js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})  
```
###route paths
Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.
###Response methods
The methods on the response object (res) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

Method	Description
res.download()	Prompt a file to be downloaded.
res.end()	End the response process.
res.json()	Send a JSON response.
res.jsonp()	Send a JSON response with JSONP support.
res.redirect()	Redirect a request.
res.render()	Render a view template.
res.send()	Send a response of various types.
res.sendFile()	Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string representation as the response body.

*To load the middleware function, call app.use(), specifying the middleware function. For example, the following code loads the myLogger middleware function before the route to the root path (/).*

##writing middleware for use in express apps
Configurable middleware
If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

File: my-middleware.js

module.exports = function(options) {
  return function(req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
The middleware can now be used as shown below.

var mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))

An Express application can use the following types of middleware:

###Application-level middleware
Router-level middleware
Error-handling middleware
Built-in middleware
Third-party middleware
You can load application-level and router-level middleware with an optional mount path. You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

how does middleware work well with different paths

Application-level middleware
Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions, where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

This example shows a middleware function mounted on the /user/:id path. The function is executed for any type of HTTP request on the /user/:id path.

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
This example shows a route and its handler function (middleware system). The function handles GET requests to the /user/:id path.

app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
Here is an example of loading a series of middleware functions at a mount point, with a mount path. It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the /user/:id path.

app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

###Error-handling middleware
Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.
Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature (err, req, res, next)):

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
For details about error-handling middleware, see: Error handling.

###Built-in middleware
Starting with version 4.x, Express no longer depends on Connect. With the exception of express.static, all of the middleware functions that were previously included with Express’ are now in separate modules. Please view the list of middleware functions.

The only built-in middleware function in Express is express.static. This function is based on serve-static, and is responsible for serving static assets such as HTML files, images, and so on.

The function signature is:

express.static(root, [options])
The root argument specifies the root directory from which to serve static assets.

For information on the options argument and more details on this middleware function, see express.static.

Here is an example of using the express.static middleware function with an elaborate options object:

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))

###Third-party middleware
Use third-party middleware to add functionality to Express apps.

Install the Node.js module for the required functionality, then load it in your app at the application level or at the router level.

The following example illustrates installing and loading the cookie-parsing middleware function cookie-parser.

$ npm install cookie-parser
var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
##Using template engines with Express
A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.

Some popular template engines that work with Express are Pug, Mustache, and EJS. The Express application generator uses Jade as its default, but it also supports several others.

See Template Engines (Express wiki) for a list of template engines you can use with Express. See also Comparing JavaScript Templating Engines: Jade, Mustache, Dust and More.

Note: Jade has been renamed to Pug. You can continue to use Jade in your app, and it will work just fine. However if you want the latest updates to the template engine, you must replace Jade with Pug in your app.

After the view engine is set, you don’t have to specify the engine or load the template engine module in your app; Express loads the module internally, as shown below (for the above example).

app.set('view engine', 'pug')
Create a Pug template file named index.pug in the views directory, with the following content:

html
  head
    title= title
  body
    h1= message
Then create a route to render the index.pug file. If the view engine property is not set, you must specify the extension of the view file. Otherwise, you can omit it.

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
When you make a request to the home page, the index.pug file will be rendered as HTML.

Note: The view engine cache does not cache the contents of the template’s output, only the underlying template itself. The view is still re-rendered with every request even with the cache is on.

To learn more about how template engines work in Express, see: “Developing template engines for Express”.

#API4.x

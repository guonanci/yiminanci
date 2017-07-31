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


#API4.x

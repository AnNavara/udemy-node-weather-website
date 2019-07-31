const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    pageTitle: 'Weather Application',
    title: 'Weather',
    name: 'Vyacheslav Serdyuk'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About me',
    title: 'About Me',
    name: 'Vyacheslav Serdyuk'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help page for weather application',
    title: 'Help me',
    message: 'I have no idea what should be on this page',
    name: 'Vyacheslav Serdyuk'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({error: 'No address provided'})
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })  


  
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  } 

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    pageTitle: 'My 404 Page',
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Vyacheslav Serdyuk'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    pageTitle: 'My 404 Page',
    title: '404',
    errorMessage: 'Page does not exist',
    name: 'Vyacheslav Serdyuk'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
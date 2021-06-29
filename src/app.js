const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')

const app = express()

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  setup handblars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Tempo',
        name: 'Alexandre Carneiro'
    })
})

app.get('/ajuda', (req, res) => {
    res.render('ajuda', {
        helpMessage: 'Ajuda para o seu app do tempo',
        title: 'Ajuda',
        name: 'Alexandre Carneiro'
    })
})

app.get('/sobre', (req, res) => {
    res.render('sobre', {
        title: 'Sobre',
        name: 'Alexandre Carneiro'
    })
})
app.get('/tempo', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Por favor, imforme uma localidade'
        })

    }

    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return  res.send({error})
        }
        
    
        forecast(latitude, longitude, (error, forecastData) => {
            
            if(error) {
                return res.send({error})
            }
            

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/ajuda/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alexandre Carneiro',
        errorMessage: 'Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alexandre Carneiro',
        errorMessage: 'Page Not Found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
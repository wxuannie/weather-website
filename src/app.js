import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import hbs from 'hbs';
import * as g from './utils/geocode.js';
import * as f from './utils/forecast.js';

// Define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nugget Low'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nugget Low'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nugget Low',
        helpText: 'This is a help message'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please enter location"
        })
    }

    g.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }    
        
        f.forecast(latitude, longitude, (error, {forecast, icon} = {}) => {
            if(error){
                return res.send({error});
            }

            console.log(location);    
            console.log('latitude: ' + latitude + ' latitude: ' + latitude);
            console.log('forecast: ' + forecast);

            res.send({
                address: req.query.address,
                forecast,
                latitude, 
                latitude,
                location,
                icon
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Nugget Low',
        errorText: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Nugget Low',
        errorText: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
}); 
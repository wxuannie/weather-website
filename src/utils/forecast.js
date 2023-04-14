import request from 'postman-request';

export const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=16444e49ffa94b5f3b55154eef95c6d4&query=' + lat + ',' + long + '&units=m';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined);
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined);
        }else {
            const current = body.current;
            console.log(current);
            callback(undefined, {
                forecast: current.weather_descriptions[0] + '. It is currenlty ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + ' degrees out. Humidity is at ' + current.humidity + "%.",
                icon: current.weather_icons[0]
            });
        }
    });

};
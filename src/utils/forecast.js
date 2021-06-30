const resquest = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6054caf34c54e7768151c4a840bbc90d&query='+ latitude +',' + longitude + '&units=m'

    resquest({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the service!', undefined)
        } else if (body.error){
            callback('The location does not exist!', undefined)
            
            
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. A temperatura agora esta ' + body.current.temperature + '°. Com sensação térmica de ' + body.current.feelslike + '°. Humidade do ar ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast
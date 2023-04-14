import request from 'postman-request';

export const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=63b6ba367d74a880864910c1f78b3630&query=' + address;

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service.', undefined);
        }else if(body.error){
            callback('Unable to find location. Try another search.', undefined);
        }else {
            //console.log(body.data[0]);
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            });
        }
    });

};
const Datastore = require('@google-cloud/datastore');

const VIEW_KIND = 'view';
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

const datastore = new Datastore({ projectId: 'utahkoopserver' });

exports.viewcounter = (request, response) => {
    // CORS headers
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Methods', 'GET');

    const referrer = request.get('referrer');
    console.log('referrer', referrer);

    if (!referrer) {
        response.status(BAD_REQUEST).json({
            message: 'referrer is undefined!'
        });
    }

    const key = datastore.key([VIEW_KIND, referrer]);

    datastore.get(key, (err, entity) => {
        if (entity) {
            entity.count++;

            datastore.save({
                key,
                data: { count: entity.count }
            }, (error) => {
                if (error) {
                    response.status(SERVER_ERROR).json({
                        message: 'error updating record',
                        error
                    });
                } else {
                    console.log('record updated successfully');
                    response.json({ count: entity.count });
                }
            });
        } else {
            const data = { count: 1 };
            datastore.save({
                key,
                data
            }, (error) => {
                if (error) {
                    response.status(SERVER_ERROR).json({
                        message: 'error creating record',
                        error
                    });
                } else {
                    console.log('record created successfully');
                    response.json(data);
                }
            });
        }
    });
};

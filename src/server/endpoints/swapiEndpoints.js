
const _isWookieeFormat = (req) => {
    if(req.query.format && req.query.format == 'wookiee'){
        return true;
    }
    return false;
}


const applySwapiEndpoints = (server, app) => {

    server.get('/hfswapi/test', async (req, res) => {
        const data = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        app.db.populateDB();
        try {
            const peopleId = req.params.id;
            const people = await app.db.swPeople.findByPk(peopleId,{
            attributes: ['name', 'mass','height','homeworld_name','homeworld_id'], 
              });
            if (!people) {
                return res.status(404).json({ error: 'People not found' });
            }
            return res.json(people);
        } catch (error) {
            console.error(error);
    return res.status(500).json({ error: 'server error' });
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        res.sendStatus(501);
    });

    server.get('/hfswapi/getLogs',async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

}

module.exports = applySwapiEndpoints;
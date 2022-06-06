import * as nodecgApiContext from './utils/nodecg-api-context'
const nodecg = nodecgApiContext.get()

const router = nodecg.Router();

const champSelectUpdateRep = nodecg.Replicant("champSelectUpdate")
const summonerNameRep = nodecg.Replicant("summonerName")

router.post('/champselect', (req, res) => {
    if (req.body.timer.phase === '') {
        champSelectUpdateRep.value = undefined
    } else {
        champSelectUpdateRep.value = req.body
    }
    res.send('OK!');
});

router.post('/summonernames', (req, res) => {
    summonerNameRep.value = req.body
    res.send('OK!');
});

nodecg.mount('/university', router);
module.exports = function (apiRoutes) {
    apiRoutes.post('/wx.do', function (req, res) {
        setTimeout(() => {
            res.json({
                result: {
                    code: 200,
                    msg: 'ok'
                },
                Data: require('../data/campuslist.json')
            })
        }, 500)
    })

    apiRoutes.get('/wx.do', function (req, res) {
        setTimeout(() => {
            res.json({
                result: {
                    code: 200,
                    msg: 'ok'
                },
                Data: require('../data/campuslist.json')
            })
        }, 500)
    })


    apiRoutes.post('/common/interface411', function (req, res) {
        setTimeout(() => {
            res.json({
                result: {
                    code: 411,
                    msg: 'ok'
                },
                Data: require('../data/campuslist.json')
            })
        }, 500)
    })

    apiRoutes.get('/common/interface411', function (req, res) {
        setTimeout(() => {
            res.json({
                result: {
                    code: 411,
                    msg: 'ok'
                },
                Data: require('../data/campuslist.json')
            })
        }, 500)
    })


    apiRoutes.post('/common/interface500', function (req, res) {
        setTimeout(() => {
            res.status(500).send({ error: 'something blew up' });
        }, 500)
    })

    apiRoutes.get('/common/interface500', function (req, res) {
        setTimeout(() => {
            res.status(500).send({ error: 'something blew up' });
        }, 500)
    })



    apiRoutes.post('/common/neterror', function (req, res) {
        setTimeout(() => {
            res.json({
                result: {
                    code: 200,
                    msg: 'ok'
                },
                Data: require('../data/campuslist.json')
            })
        }, 5000)
    })

    apiRoutes.get('/common/neterror', function (req, res) {
        setTimeout(() => {
            res.json({
                result: {
                    code: 200,
                    msg: 'ok'
                },
                Data: require('../data/campuslist.json')
            })
        }, 5000)
    })

}

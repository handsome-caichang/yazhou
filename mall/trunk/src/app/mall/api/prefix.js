export default function(s) {
    if (s == 'mock') {
        return 'http://10.0.0.30:8001/server/index.php?g=Web&c=Mock&o=mock&projectID=48&uri='
    } else if (s == 'json') {
        return '/static/data/'
    } else {
        return ''
    }
}
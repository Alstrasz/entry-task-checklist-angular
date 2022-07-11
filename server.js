function requireHTTPS ( req, res, next ) {
    // The 'x-forwarded-proto' check is for Heroku
    if ( !req.secure && req.get( 'x-forwarded-proto' ) !== 'https' ) {
        return res.redirect( 'https://' + req.get( 'host' ) + req.url );
    }
    next();
}

const express = require( 'express' );
const app = express();
// app.use( requireHTTPS );
app.use( express.static( './dist/entry-task-checklist' ) );
app.get( '/*', function ( req, res ) {
    res.sendFile( 'index.html', { root: 'dist/entry-task-checklist/' },
    );
} );
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';
app.listen( port, host, () => {
    console.log( `Application launched on http://${host}:${port}` );
} );

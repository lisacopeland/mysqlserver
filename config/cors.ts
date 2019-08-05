/** [CORS PROJECT CONFIGURATION] **/
const whitelist = [
    'http://localhost:4200',
    'http://localhost:3002'
];

export const corsOptionsDelegate = function (req: any, callback: any) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};
const fastify = require('fastify')();
const mjml = require('mjml');
const fs = require('fs');

fastify.get("/ping", (request, reply) => {
    reply.send("pong");
});

fastify.post('/', function (request, reply) {
    const { templateId, vars } = request.body;
    let mjmlContent = request.body.mjml;
    let result = {};

    try {
        if (typeof templateId === "undefined" || templateId === null) {
            throw "Invalid template ID";
        } else {
            const filepath = `templates/${templateId}.mjml`;

            // check if template exists
            try {
                fs.accessSync(filepath, fs.constants.R_OK);
            } catch (e) {
                throw "Template is not readable";
            }

            // load template content
            mjmlContent = fs.readFileSync(filepath, "utf-8");

            // insert vars
            Object.keys(vars).map(key => {
                const regex = new RegExp(`{{ ?${key} ?}}`, "gi")
                mjmlContent = mjmlContent.replace(regex, vars[key]);
            });
        }

        // convert mjml to html
        if (typeof mjmlContent !== "undefined") {
            result = mjml(mjmlContent);
        }
        
        if (Object.keys(result.errors).length) {
            Object.keys(result.errors).forEach((key) => {
                delete result.errors[key].formattedMessage;
            });
        }
    } catch (e) {
        result = {
            error: true,
            message: e
        };
    }
    
    reply.send(result)
});

// Run the server!
fastify.listen(3000, '127.0.0.1', function (err) {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`)
});
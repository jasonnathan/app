var prompt = require('prompt');
var optimist = require('optimist');
var YAML = require('json2yaml');
var exec = require('child_process').exec;
var fs = require('fs');
var prettyjson = require('prettyjson');

prompt.override = optimist.argv;


prompt.start();

prompt.get([
    {
        name: 'command',
        description: 'push or pull',
        type: 'string',
        required: true,
        pattern: /^(push|pull)+$/,
        default: 'pull'
    },
    {
        name: 'access_token',
        default: 'f147fed12f3587d1c7df4bf919acf858aa73c9df723bc72b41ff38ba80b00389' // pull access only
    }
], function (err, result) {

    var phraseAppConfigFile = "./.phraseapp.yml";

    var phraseAppConfiguration = YAML.stringify({
        phraseapp: {
            access_token: result.access_token.toString(),
            project_id: '731ddea47bd92115f07aa2ad462c4324',
            file_format: 'simple_json',
            push: {
                sources: [
                    {
                        file: 'app/public/locales/<locale_name>/phraseapp.json',
                        params: {
                            file_format: 'simple_json'
                        }
                    }
                ]
            },
            pull: {
                targets: [
                    {
                        file: 'app/public/locales/phraseapp.<locale_name>.i18n.json',
                        params: {
                            file_format: 'simple_json'
                        }
                    }
                ]
            }
        }
    });


    fs.writeFile(phraseAppConfigFile, phraseAppConfiguration, function (err) {
        if (err) {
            return console.log(err);
        }

        exec('phraseapp ' + result.command, function (err, stdout, stderr) {
            if (err) {
                return console.log(err);
            }

            if (stderr) {
                console.log(prettyjson.render(stderr));
            }

            console.log(prettyjson.render(stdout));

            fs.unlinkSync(phraseAppConfigFile);

        });
    });

});
/*


*/

const _ = require('lodash');
const promisify = require('tiny-promisify');
const pipelineRunner = promisify(require('../../core/workers/pipeline/parent'));
const cache = require('../state/cache');
const broadcast = cache.get('broadcast');
const importManager = cache.get('imports');
const base = require('./baseConfig');

// starts an import
// requires a post body with a config object
module.exports = function *() {
  let mode = 'importer';

  let config = {}

  _.merge(config, base, this.request.body);

  let importId = (Math.random() + '').slice(3);

  let errored = false;

  console.log('Import', importId, 'started');

  pipelineRunner(mode, config, (err, event) => {
    if(errored)
      return;

    if(err) {
      errored = true;
      console.error('RECEIVED ERROR IN IMPORT', importId);
      console.error(err);
      importManager.delete(importId);
      return broadcast({
        type: 'import_error',
        import_id: importId,
        error: err
      });
    }

    if(!event)
      return;

    // update local cache
    importManager.update(importId, {
      latest: event.latest,
      done: event.done
    });

    // emit update over ws
    let wsEvent = {
      type: 'import_update',
      import_id: importId,
      updates: {
        latest: event.latest,
        done: event.done
      }
    }
    broadcast(wsEvent);
  });

  let daterange = this.request.body.importer.daterange;

  const _import = {
    watch: config.watch,
    id: importId,
    latest: '',
    from: daterange.from,
    to: daterange.to
  }

  importManager.add(_import);
  this.body = _import;
}

/*
The MIT License (MIT)
Copyright (c) 2014-2017 Mike van Rossum mike@mvr.me
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

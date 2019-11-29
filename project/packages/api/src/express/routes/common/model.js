const Router = require('express-promise-router');

const {
  getCollection, get, post, patch, put, del,
} = require('../../../util/crud');
const authorize = require('../../middleware/authorize');
const { pagination } = require('../../constants');

const defaultOptions = {
  rolesRead: [],
  rolesCreate: [],
  rolesUpdate: [],
  rolesDelete: [],
};

/**
 * Generates and returns a router with all RESTful routes for a given model.
 *
 * @param model {Model} The model to generate the router for
 * @param options {object} Options for router
 * @param options.rolesRead {Array<string>} List of role names that are
 *        allowed to read/view roles/records
 * @param options.rolesCreate {Array<string>} List of role names that are
 *        allowed to create/insert rows/records
 * @param options.rolesUpdate {Array<string>} List of role names that are
 *        allowed to update/patch rows/records
 * @param options.rolesDelete {Array<string>} List of role names that are
 *        allowed to delete rows/records
 * @param options.subModelRoutes {Array<{ModelRoute}>} List of sub-models
 *        associated with this model.
 *        NOTE: This only creates read sub-routes under this router for each
 *              sub-model
 * @return {Router} Router with RESTful routes for the model
 */
module.exports = (model, options = {}) => {
  const opts = { ...defaultOptions, ...options };

  const router = Router();

  // GET (read) collection
  router.get('/', authorize(opts.rolesRead), async (req, res) => {
    const rows = await getCollection(
      model,
      undefined,
      req.query.page,
      req.query.perPage || pagination.perPage,
    );

    res.json(rows);
  });

  // GET (read) resource
  router.get('/:id', authorize(opts.rolesRead), async (req, res) => {
    const row = await get(model, req.params.id);

    res.json(row);
  });

  // POST (create) resource
  router.post('/', authorize(opts.rolesCreate), async (req, res) => {
    const row = await post(model, req.body);

    res.json(row);
  });

  // PATCH (partial update) resource
  router.patch('/:id', authorize(opts.rolesUpdate), async (req, res) => {
    const row = await patch(model, req.params.id, req.body);

    res.json(row);
  });

  // PUT (full update) resource
  router.put('/:id', authorize(opts.rolesUpdate), async (req, res) => {
    const row = await put(model, req.params.id, req.body);

    res.json(row);
  });

  // DELETE resource
  router.delete('/:id', authorize(opts.rolesDelete), async (req, res) => {
    await del(model, req.params.id);

    res.status(204).end();
  });

  return router;
};

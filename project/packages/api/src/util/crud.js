const { ValidationError } = require('objection');

// GET (read) collection
exports.getCollection = async (model, filter = {}, page = 0, perPage) => {
  const { results: items, total } = await model.query()
    .where(filter)
    .page(page, perPage);

  return {
    items,
    total,
    page,
    perPage,
  };
};

// GET (read) resource
exports.get = (model, id) => model.query()
  .findById(id)
  .throwIfNotFound();

// POST (create) resource
exports.post = async (model, payload) => {
  if (payload instanceof Array) {
    throw new ValidationError({
      type: 'ModelValidation',
      message: 'Cannot insert multiple rows in a batch',
    });
  }

  return model.query()
    .insertAndFetch(payload);
};

// PATCH (partial update) resource
exports.patch = async (model, id, payload) => {
  const row = await model.query()
    .findById(id)
    .throwIfNotFound();

  return row.$query()
    .patchAndFetch(payload);
};

// PUT (full update) resource
exports.put = async (model, id, payload) => {
  const row = await model.query()
    .findById(id)
    .throwIfNotFound();

  return row.$query()
    .updateAndFetch(payload);
};

// DELETE resource
exports.del = async (model, id) => {
  const row = await model.query()
    .findById(id)
    .throwIfNotFound();

  return row.$query().delete();
};

const Router = require('express-promise-router');

const User = require('../../models/User');
const HttpError = require('../../errors/HttpError');
const authorize = require('../middleware/authorize');
const pagination = require('../constants/pagination');

const router = Router();

// GET (read) current user
router.get('/profile', (req, res) => {
  res.json(req.user);
});

// GET (read) collection
router.get('/', async (req, res) => {
  const page = req.query.page || 0;
  const perPage = req.query.perPage || pagination.perPage;

  const users = await User.query()
    .page(page, perPage);

  res.json({
    ...users,
    page,
    perPage,
  });
});

// GET (read) resource
router.get('/:id', async (req, res) => {
  const user = await User.query()
    .eager('role')
    .findById(req.params.id)
    .throwIfNotFound();

  res.json(user);
});

// POST (create) resource
router.post('/', authorize(['admin']), async (req, res) => {
  if (req.body instanceof Array) {
    throw new HttpError(400, 'Cannot insert multiple records in a batch');
  }

  const user = await User.query().insertAndFetch(req.body);

  res.json(user);
});

// PATCH (partial update) resource
router.patch('/:id', authorize(['admin']), async (req, res) => {
  const user = await User.query().findById(req.params.id).throwIfNotFound();

  res.json(await user.$query().patchAndFetch(req.body));
});

// PUT (full update) resource
router.put('/:id', authorize(['admin']), async (req, res) => {
  const user = await User.query().findById(req.params.id).throwIfNotFound();

  res.json(await user.$query().updateAndFetch(req.body));
});

// DELETE resource
router.delete('/:id', authorize(['admin']), async (req, res) => {
  const user = await User.query().findById(req.params.id).throwIfNotFound();

  await user.$query().delete();

  res.status(204).end();
});

module.exports = router;

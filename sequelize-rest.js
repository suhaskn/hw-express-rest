const express = require('express')
const bodyParser = require('body-parser')
const { Router } = express

const app = express()
const port = 3000
const router = new Router()

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres');

app.use(bodyParser.json())

const Movies = sequelize.define('movie',
  {
    title: { type: Sequelize.TEXT },
    yearOfRelease: { type: Sequelize.INTEGER },
    synopsis: { type: Sequelize.TEXT }
  });

app.use(router)

sequelize.sync()
  .then(() => console.log('Database connected'))
  .then(() => Promise.all([
    Movies.create({ title: `Premaloka`, yearOfRelease: 1986, synopsis: 'Love story' }),
    Movies.create({ title: `Ranadheera`, yearOfRelease: 1987, synopsis: 'Action' }),
    Movies.create({ title: `Drishya`, yearOfRelease: 2014, synopsis: 'Suspence thriller' })]))
  .catch(err => console.error(err))

router.post('/movies', (req, res, next) => {
  Movies
    .create(req.body)
    .then(movie => res.send(movie))
    .catch(next)
})

router.get('/movies', (req, res) => {
  Movies.findAll()
    .then(movie => res.json(movie))
})

router.get('/movies/:id', (req, res, next) => {
  Movies.findByPk(req.params.id)
    .then(movie => res.json(movie))
    .catch(next)
})

router.put('/movies/:id', (req, res, next) => {
  Movies.findByPk(req.params.id)
    .then(movie => {
      movie.update(req.body)
    })
    .then(res.json())
    .catch(next)
})

router.delete('/movies/:id', (req, res, next) => {
  Movies.destroy({ where: { id: req.params.id } })
    .then(num => res.json(num))
    .catch(next)
})

app.listen(port, () => console.log(`Listning on port ${port}`))
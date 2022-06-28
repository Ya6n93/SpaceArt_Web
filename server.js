const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/profil/:id', (req, res) => {
      const actualPage = '/profil'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/home/:id', (req,res) => {
      const actual = '/home'
      const queryParams = { id : req.params.id }
      app.render(req, res, actual, queryParams)
    })

    server.get("/casting/:id", (req, res) => {
      const actualPage = '/casting'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get("/test/:id", (req, res) => {
      const actualPage = '/test'
      const queryParams = { id: req.params.id}
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.get("/profil/:id", (req, res) => {
      return app.render(req, res, "/profil", { id: req.params.id })
    })

    server.get("/casting/:id", (req, res) => {
      return app.render(req, res, "/casting", { id: req.params.id })
    })

    server.get("/test/:id", (req, res) => {
      return app.render(req, res, "/test", { id: req.params.id })
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
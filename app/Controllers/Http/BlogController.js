'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Blog = use('App/Models/Blog')

/**
 * Resourceful controller for interacting with blogs
 */
class BlogController {
  /**
   * Show a list of all blogs.
   * GET blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const blogs = await Blog.query().with('user').fetch()

    return blogs

  }

  /**
   * Create/save a new blog.
   * POST blogs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {

    const data = request.all()

    const blog = await Blog.create({ user_id: auth.user.id, ...data })

    return blog

  }

  /**
   * Display a single blog.
   * GET blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const blog = await Blog.findOrFail(params.id)

    return blog

  }

  /**
   * Update blog details.
   * PUT or PATCH blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const blog = await Blog.findOrFail(params.id)
    const data = request.all()
    
    blog.merge({...data})
    blog.save()

    return blog

  }

  /**
   * Delete a blog with id.
   * DELETE blogs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const blog = await Blog.findOrFail(params.id)

    if(auth.user.id != blog.user_id){
      return response.status(401)
    }

    await blog.delete()

  }
}

module.exports = BlogController

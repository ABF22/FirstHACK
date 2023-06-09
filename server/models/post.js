const db = require('../database/connect');

class Post {

    constructor({ post_id, title, post_date, content }) {
        this.id = post_id;
        this.title = title;
        this.post_date = post_date;
        this.content = content;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM post ORDER BY post_date");
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM post WHERE post_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }
    
    static async update(id,data) {
        const { title, content } = data;
        const response = await db.query("UPDATE post SET  title = $2 || content = $3 WHERE post_id = $1 RETURNING *;",[id, title, content])
        if (response.rows.length != 1) {
            throw new Error("Unable to update post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const { title,post_date, content } = data;
        let response = await db.query("INSERT INTO post (title, post_date, content) VALUES ($1, $2, $3) RETURNING post_id;",
            [title,post_date, content]);
        const newId = response.rows[0].post_id;
        const newPost = await Post.getOneById(newId);
        return newPost;
    }

    async destroy() {
        let response = await db.query("DELETE FROM post WHERE post_id = $1 RETURNING *;", [this.id]);
        return new Post(response.rows[0]);
    }

}

module.exports = Post;

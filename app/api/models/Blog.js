import { model, models, Schema } from "mongoose";

const BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: String,
    images: {
      type: Array,
      require: false,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    commu: { type: mongoose.Types.ObjectId, ref: "commu" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);

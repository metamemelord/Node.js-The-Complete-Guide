exports.getPosts = (req, res, next) => {
  res.json({
    posts: [{ title: "First post", content: "This is a post, lol" }]
  });
};

exports.postPosts = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Post created!",
    post: {
      id: new Date().getTime(),
      title,
      content
    }
  });
};

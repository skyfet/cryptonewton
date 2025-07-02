exports.searchUsers = async (req, res) => {
  const { q } = req.query;
  // Placeholder: search logic should go here
  res.json([{ id: 1, username: q }]);
};

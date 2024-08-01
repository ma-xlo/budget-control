import User from '../models/user.js'

export async function createUser (req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export async function deleteUser(req, res){
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    await user.destroy();
    res.status(200).json({message: "ok"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}
// Outros métodos para CRUD
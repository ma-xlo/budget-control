import Category from '../models/category.js'


export async function getAllCategories (req, res) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export async function getCategory(req, res){
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if(!category) {
      return res.status(404).json({message: "Not found"})
    }

    return res.status(200).json(category)

  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

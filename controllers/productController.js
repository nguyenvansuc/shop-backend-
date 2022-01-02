import ProductModel from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    let { category, title, sale } = req?.query;
    let filters = {};
    if (category) {
      filters.category = category;
    }
    if (title) {
      filters.title = { $regex: title, $options: 'i' };
    }
    if (sale === 'sale') {
      filters.sale = { $gte: 1 };
    }
    console.log(filters);
    const allProducts = await ProductModel.find(filters);
    // console.log(allProducts);
    res
      .status(200)
      .json({ products: allProducts, message: 'getAllProductsSuccess' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const checkAdmin = req.checkAdmin;
    if (!checkAdmin) {
      return res.status(401);
    }
    const idProduct = req.params.idProduct;
    await ProductModel.findByIdAndDelete(idProduct);
    return res.status(200).json({ message: 'deleteSuccess !' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getDetailsProduct = async (req, res) => {
  try {
    const idProduct = req.params.idProduct;
    const product = await ProductModel.findById(idProduct);
    return res
      .status(200)
      .json({ product, message: 'getDetailsProductSuccess' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addNewProduct =async (req, res) => {
  try {
      const newProduct = req.body
    //   console.log(newProduct)
      const addNewProduct = new ProductModel(newProduct);
      const result= await addNewProduct.save();
    //   console.log(result);
    res.status(200).json({message:`Add ${newProduct.title} success !`})
  } catch (error) {
    res.status(500).json(error);
  }
};

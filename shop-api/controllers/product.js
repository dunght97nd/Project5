import Product from "../models/Product.js";
import ProductDetail from "../models/ProductDetail.js";

//Create
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

//Update
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ).populate("productDetail");
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

//Delete
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {}
};

//Get Product
export const findProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "productDetail"
    );
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

//Get all product
export const getProduct = async (req, res, next) => {
  // const q = req.query.q;
  // const qCategory = req.query.category;
  // try {
  //   let products;
  //   if (q) {
  //     products = await Product.find({
  //       title: {
  //         $regex: q,
  //         $options: "i",
  //       },
  //     }).populate("productDetail");
  //   } else if (qCategory) {
  //     products = await Product.find({
  //       categories: {
  //         $in: qCategory,
  //       },
  //     });
  //   } else {
  //     products = await Product.find()
  //       .populate("productDetail")
  //       .sort({ createdAt: -1 });
  //   }

  //   res.status(200).json(products);
  //----------------------------------------------------------------
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";
    let sort = req.query.sort || "createdAt";
    let cat = req.query.cat || "All";
    let color = req.query.color || "All";
    let size = req.query.size || "All";

    const catOptions = ["shirts", "pants", "jeans", "coat", "sweater", "shirt"];
    const colorOptions = ["white", "black", "red", "blue", "yellow", "green"];
    const sizeOptions = {
      sizeShirt: ["s", "m", "l", "xl"],
      sizePants: ["28", "29", "30", "31", "32", "33", "34"],
    };

    cat === "All" ? (cat = [...catOptions]) : (cat = req.query.cat.split(","));
    color === "All"
      ? (color = [...colorOptions])
      : (color = req.query.color.split(","));
    size === "All"
      ? (size = [...sizeOptions.sizeShirt, ...sizeOptions.sizePants])
      : (size = req.query.size.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "desc"; //-1
    }
    // console.log(sortBy);

    const products = await Product.find({
      title: { $regex: search, $options: "i" },
    })
      .where("categories")
      .in([...cat])
      .where("color")
      .in([...color])
      .where("size")
      .in([...size])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit)
      .populate("productDetail");

    const total = await Product.countDocuments({
      categories: { $in: [...cat] },
      color: { $in: [...color] },
      size: { $in: [...size] },

      title: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      cat: catOptions,
      color: colorOptions,
      size: sizeOptions,

      products,
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//Search
export const searchProduct = async (req, res, next) => {
  const query = req.query.q;
  try {
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    }).limit(8);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

//Get ProductDetails
export const getProductDetail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const list = await Promise.all(
      product.productDetail.map((detail) => {
        return ProductDetail.findById(detail);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//----------------------------------------------------------------
//Get Product stats
export const getProductStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Product.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastYear,
          },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]).sort({ _id: 1 });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

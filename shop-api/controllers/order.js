import Order from "../models/Order.js";

//Create
export const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    next(err);
  }
};

//Update
export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

//Delete
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    next(err);
  }
};

//Get User Orders
export const findOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

//Get all Order
export const getOrder = async (req, res, next) => {
  const query = req.query.search;
  try {
    const orders = query
      ? await Order.find({
          userName: {
            $regex: query,
          },
        })
      : await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

//Get Monthly Order
export const getOrderInCome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() + 12));
  console.log(lastMonth);
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $lte: lastMonth }, status: "delivered" } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]).sort({ _id: 1 });
    res.status(200).json(income);
  } catch (err) {
    next(err);
  }
};

//Get Order stats
export const getOrderStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Order.aggregate([
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

export const getOrderDaily = async (req, res, next) => {
  // const date = new Date();
  // const lastDay = new Date(date.setDate(date.getDate()));
  // const prevDay = new Date(date.setDate(date.getDate() - 365));
  const { startDate, endDate } = req.query;

  const start = new Date(startDate);
  const end = new Date(endDate);

  console.log(start, end);
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: "delivered",
        },
      },
      {
        $project: {
          day: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          // day: { $dayOfMonth: "$createdAt" },
          // year: { $year: "$createdAt" },
          // month: { $month: "$createdAt" },

          sales: "$total",
        },
      },
      {
        $group: {
          _id: { $toDate: "$day" },
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    next(err);
  }
};

export const getOrderMonthly = async (req, res, next) => {
  // const date = new Date();
  // const lastDay = new Date(date.setDate(date.getDate()));
  // const prevDay = new Date(date.setDate(date.getDate() - 365));
  const { startDate, endDate } = req.query;

  const start = new Date(startDate);
  const end = new Date(endDate);

  console.log(start, end);
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          status: "delivered",
        },
      },
      {
        $project: {
          date: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$date",
          total: { $sum: "$sales" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    next(err);
  }
};

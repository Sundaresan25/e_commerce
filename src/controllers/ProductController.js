const User = require("../models/User");

const { Category, Product } = require("../models/Products");

const upload = require("../middleware/Upload");

// Show the list of Employees

const generateUniqueID = (name) => {
  // Replace spaces in the name with underscores
  const sanitizedName = name.replace(/\s+/g, "_");

  // Get the current timestamp
  const timestamp = Date.now();

  // Combine the name and timestamp to create the unique ID
  const uniqueID = `${sanitizedName}_${timestamp}`;

  return uniqueID;
};

const getCategories = (req, res, next) => {
  Category.find()
    .then((response) => {
      res.json({
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

// add an Category
const addCategory = (req, res, next) => {
  const { id } = req.params;
  const category = new Category({
    name: req.body.name,
    status: req.body.status,
    categoryId: generateUniqueID(req.body.name),
  });

  User.findById(id)
    .then((user) => {
      if (!user) {
        // User with the specified ID was not found
        res.json({
          error: "User not found",
        });
        return;
      }

      // User found
      if (user.role === "admin") {
        category
          .save()
          .then((respnse) => {
            res.json({
              message: "Category Added Successfully",
            });
          })
          .catch((error) => {
            res.json({
              message: "An error Occured!",
            });
          });
      } else {
        res.json({
          error: "unAuthorized ",
        });
      }
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

// upadate an employee
const updateCategory = (req, res, next) => {
  const { id } = req.params;
  const updatedData = {
    name: req.body.name,
    status: req.body.status,
    categoryId: req.body.categoryId,
  };

  User.findById(id)
    .then((user) => {
      if (!user) {
        // User with the specified ID was not found
        res.json({
          error: "User not found",
        });
        return;
      }

      // User found
      if (user.role === "admin") {
        Category.findByIdAndUpdate(req.body.id, { $set: updatedData })
          .then(() => {
            res.json({
              message: "Emplyee updated successfuly!",
            });
          })
          .catch((error) => {
            res.json({
              message: "An error Occured!",
            });
          });
      } else {
        res.json({
          error: "unAuthorized ",
        });
      }
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

// delete an employee

const deleteCategory = (req, res, next) => {
  const id = req.body.id;
  Category.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: "Category deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

const getProducts = (req, res, next) => {
  Product.find()
    .then((response) => {
      res.json({
        data: response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

const addProducts = (req, res, next) => {
  const { id } = req.params;
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId,
    quantity: req.body.quantity,
    price: req.body.price,
    status: req.body.status,
  });

  User.findById(id)
    .then((user) => {
      if (!user) {
        // User with the specified ID was not found
        res.json({
          error: "User not found",
        });
        return;
      }

      if (user.role === "admin") {
        upload.single("thumbnail")(req, res, (err) => {
          if (err) {
            // Error occurred during file upload
            res.json({
              message: "Error uploading the image",
            });
            return;
          }

          // File upload succeeded
          if (req.file) {
            // Access the uploaded file information
            const imageUrl = req.file.path;
            // Update the product's thumbnail with the image URL
            product.thumbnail = imageUrl;
            product.name = req.body.name;
            product.description = req.body.description;
            product.categoryId = req.body.categoryId;
            product.quantity = req.body.quantity;
            product.price = req.body.price;
            product.status = req.body.status;
          }

          product
            .save()
            .then((response) => {
              res.json({
                message: "Product Added Successfully",
              });
            })
            .catch((error) => {
              res.json({
                error: error,
              });
            });
        });
      } else {
        res.json({
          error: "unAuthorized ",
        });
      }
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

const updateProducts = (req, res, next) => {
  const { id } = req.params;
  const { name, description, categoryId, status, quantity, price } = req.body;

  // Prepare the updated data object
  const updatedData = {
    name,
    description,
    categoryId,
    status,
    quantity,
    price,
  };

  User.findById(id)
    .then((user) => {
      if (!user) {
        // User with the specified ID was not found
        res.json({
          error: "User not found",
        });
        return;
      }

      // User found
      if (user.role === "admin") {
        // Check if a new thumbnail image was uploaded
        if (req.file) {
          upload.single("thumbnail")(req, res, (err) => {
            if (err) {
              // Error occurred during file upload
              res.json({
                message: "Error uploading the image",
              });
              return;
            }

            // File upload succeeded
            const imageUrl = req.file.path;
            updatedData.thumbnail = imageUrl;

            // Update the product with the new data including the thumbnail
            Product.findByIdAndUpdate(req.body.id, { $set: updatedData })
              .then(() => {
                res.json({
                  message: "Product updated successfully!",
                });
              })
              .catch((error) => {
                res.json({
                  message: "An error occurred!",
                });
              });
          });
        } else {
          Product.findByIdAndUpdate(req.body.id, { $set: updatedData })
            .then(() => {
              res.json({
                message: "Product updated successfully!",
              });
            })
            .catch((error) => {
              res.json({
                message: "An error occurred!",
              });
            });
        }
      } else {
        res.json({
          error: "Unauthorized",
        });
      }
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

const deleteProducts = (req, res, next) => {
  const id = req.body.id;
  Product.findByIdAndRemove(id)
    .then(() => {
      res.json({
        message: "Product deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
};

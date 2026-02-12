 import Cart from "../model/Cart.js";


 // Create Cart with products and category

 export const createCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [] });

    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }

    await cart.save();

    cart = await cart.populate({
      path: "items.productId",
      populate: {
        path: "category",
        select: "name",
      },
    });

    res.status(201).json({
      success: true,
      items: cart.items.map((i) => ({
        product: i.productId,
        qty: i.qty,
      })),
    });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

 // Get cart with products and categories
  
 export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne()
      .populate({
        path: "items.productId",
        populate: {
          path: "category",
          select: "name"
        }
      });

    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    const items = cart.items.map((item) => ({
      product: item.productId,
      qty: item.qty,
    }));

    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error getting cart:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update cart
export const updateCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );
    if (index === -1)
      return res.status(404).json({ message: "Product not in cart" });

    cart.items[index].qty = qty;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      populate: { path: "category", select: "name" },
    });

    res.json({
      success: true,
      items: cart.items.map((i) => ({
        product: i.productId,
        qty: i.qty,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete cart 

export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );
    await cart.save();

    await cart.populate({
      path: "items.productId",
      populate: { path: "category", select: "name" },
    });

    res.json({
      success: true,
      items: cart.items.map((i) => ({
        product: i.productId,
        qty: i.qty,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = []; // remove all items
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      items: [],
    });
  } catch (error) {
    console.error("Error clearing cart:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// import Product from "../model/Product.js";

// // Get the cart with product details
// export const getCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne();
//     if (!cart) {
//       cart = new Cart({ items: [] });
//       await cart.save();
//     }

//     // Fetch product details directly
//     const itemsWithProduct = await Promise.all(
//       cart.items.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         return {
//           product,
//           qty: item.qty,
//         };
//       })
//     );

//     res.status(200).json({ success: true, cart: { items: itemsWithProduct } });
//   } catch (error) {
//     console.error("Error getting cart:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Add or update items in the cart
// export const createCart = async (req, res) => {
//   try {
//     const { items } = req.body; // [{ productId, qty }]
//     if (!items || items.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart items required" });
//     }

//     let cart = await Cart.findOne();
//     if (!cart) cart = new Cart({ items: [] });

//     items.forEach((item) => {
//       const index = cart.items.findIndex((i) => i.productId.toString() === item.productId);
//       if (index > -1) {
//         cart.items[index].qty += item.qty;
//       } else {
//         cart.items.push(item);
//       }
//     });

//     await cart.save();

//     // Get updated product info directly
//     const itemsWithProduct = await Promise.all(
//       cart.items.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         return { product, qty: item.qty };
//       })
//     );

//     res.status(201).json({ success: true, cart: { items: itemsWithProduct } });
//   } catch (error) {
//     console.error("Error adding to cart:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Update cart item qty
// export const updateCart = async (req, res) => {
//   try {
//     const { productId, qty } = req.body;
//     if (!productId || qty == null)
//       return res.status(400).json({ success: false, message: "ProductId and qty required" });

//     const cart = await Cart.findOne();
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     const index = cart.items.findIndex((i) => i.productId.toString() === productId);
//     if (index === -1) return res.status(404).json({ success: false, message: "Product not in cart" });

//     cart.items[index].qty = qty;
//     await cart.save();

//     const itemsWithProduct = await Promise.all(
//       cart.items.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         return { product, qty: item.qty };
//       })
//     );

//     res.status(200).json({ success: true, cart: { items: itemsWithProduct } });
//   } catch (error) {
//     console.error("Error updating cart:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Delete cart item
// export const deleteCartItem = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     if (!productId) return res.status(400).json({ success: false, message: "ProductId required" });

//     const cart = await Cart.findOne();
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
//     await cart.save();

//     const itemsWithProduct = await Promise.all(
//       cart.items.map(async (item) => {
//         const product = await Product.findById(item.productId);
//         return { product, qty: item.qty };
//       })
//     );

//     res.status(200).json({ success: true, cart: { items: itemsWithProduct }, message: "Item removed" });
//   } catch (error) {
//     console.error("Error deleting cart item:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // Clear cart
// export const clearCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne();
//     if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

//     cart.items = [];
//     await cart.save();

//     res.status(200).json({ success: true, message: "Cart cleared" });
//   } catch (error) {
//     console.error("Error clearing cart:", error.message);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

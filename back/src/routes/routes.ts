import { Router } from 'express';
import passport from 'passport';

import VariantController from '../controllers/VariantController'; 
import ColorController from '../controllers/ColorController';
import SizeController from '../controllers/SizeController';
import OfferController from '../controllers/OfferController';
import { ProductController } from '../controllers/ProductController';
import { WishlistController } from '../controllers/WishlistController';
import { OrderController } from '../controllers/OrderController';
import { UserController } from "../controllers/UserController";
import { CategoryController } from "../controllers/CategoryController"; 

import { photoUpload } from '../config/uploader';

import { validateSignup, validateLogin, validateUserIdParam, validateUserUpdateBody } from '../middlewares/userValidation';
import { validateProductCreateBody, validateProductUpdateBody, validateProductIdParam } from '../middlewares/productValidation';
import { validateOfferCreateBody, validateOfferUpdateBody, validateOfferIdParam } from '../middlewares/offerValidation';

const router = Router();
const auth = passport.authenticate("jwt", { session: false });

// Rotas de Wishlist
router.post('/wishlist', WishlistController.createWishlist);
router.get('/wishlist/user/:userId', WishlistController.getWishlistByUser);
router.delete('/wishlist/:userId', WishlistController.deleteWishlist);

// Rotas de Itens da Wishlist
router.post('/wishlist/items', WishlistController.addItemToWishlist);
router.get('/wishlist/:userId/items', WishlistController.getWishlistItems);
router.delete('/wishlist/:userId/items/:product_id', WishlistController.removeItemFromWishlist);
router.get('/wishlist/:userId/items/:product_id/check', WishlistController.checkProductInWishlist);

// Rotas de Order
router.post('/orders', OrderController.createOrder);
router.get('/orders/user/:userId', OrderController.getOrdersByUser);
router.get('/orders/:orderId', OrderController.getOrderById);
router.put('/orders/:orderId/status', OrderController.updateOrderStatus);
router.post('/orders/:orderId/products', OrderController.addProductToOrder);
router.delete('/orders/:orderId/products/:product_id', OrderController.removeProductFromOrder);
router.get('/orders', OrderController.getAllOrders);

// --- Rotas de Variantes ---
router.post("/variant", VariantController.createVariant);
router.get("/variant/:id", VariantController.readVariant);
router.get("/variant", VariantController.readAllVariants);
router.put("/variant/:id", VariantController.updateVariant);
router.delete("/variant/:id", VariantController.deleteVariant);

// --- Rotas de Cores ---
router.post("/color", ColorController.createColor);
router.get("/color/:id", ColorController.readColor);
router.get("/color", ColorController.readAllColors);
router.put("/color/:id", ColorController.updateColor);
router.delete("/color/:id", ColorController.deleteColor);

// --- Rotas de Tamanhos ---
router.post("/size", SizeController.createSize);
router.get("/size/:id", SizeController.readSize);
router.get("/size", SizeController.readAllSizes);
router.put("/size/:id", SizeController.updateSize);
router.delete("/size/:id", SizeController.deleteSize);

// --- Rotas de Ofertas ---
router.post("/offer", validateOfferCreateBody, OfferController.createOffer);
router.get("/offer/:id", validateOfferIdParam, OfferController.readOffer);
router.get("/offer", OfferController.readAllOffers);
router.put("/offer/:id", validateOfferIdParam, validateOfferUpdateBody, OfferController.updateOffer);
router.delete("/offer/:id", validateOfferIdParam, OfferController.deleteOffer);

// ======= Product =======
router.post("/product", validateProductCreateBody, ProductController.create);
router.get("/product", ProductController.readAll);
router.get("/product/:productId", validateProductIdParam, ProductController.readProduct);
router.put("/product/:productId", validateProductIdParam, validateProductUpdateBody, ProductController.update);
router.post("product/:produtoId/image", photoUpload.single("image"), ProductController.uploadImage);

// ======= Category =======
router.post("/category", CategoryController.create);
router.get("/category/:id", CategoryController.read);
router.get("/category", CategoryController.readAll);
router.put("/category/:id", CategoryController.update);
router.delete("/category/:id", CategoryController.delete);
router.post("/category/populate", CategoryController.populateDefaults);
router.post("/category/products", CategoryController.getProductsByCategories); 

// ======= User =======
router.post("/signup", validateSignup, UserController.signup);
router.post("/login", validateLogin, UserController.login);
router.get("/user/:userId", auth, validateUserIdParam, UserController.readUser);
router.put("/user/:userId", auth, validateUserIdParam, validateUserUpdateBody, UserController.updateUser);
router.delete("/user/:userId", auth, validateUserIdParam, UserController.deleteUser);
router.get("/me", auth, validateUserIdParam, UserController.readMe);

// Rota de teste para pegar os IDs
router.get("/users", UserController.readAllUsers);

export default router;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './product.js';
import User from './user.js';

// const Cart = sequelize.define('Cart', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   userId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: User,
//       key: 'id',
//     },
//   },
//   productId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: Product,
//       key: 'id',
//     },
//   },
// });

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
});


Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

export default Cart;

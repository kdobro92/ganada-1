"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chatRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chatRooms.hasMany(models.chatContents);
      models.chatRooms.belongsTo(models.boards);
      models.chatRooms.belongsTo(models.users);
    }
  }
  chatRooms.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      receiverId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "cascade",
      },
      boardId: {
        type: DataTypes.INTEGER,
        references: {
          model: "boards",
          key: "id",
        },
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "chatRooms",
    }
  );
  return chatRooms;
};

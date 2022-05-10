"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_chatrooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
      },
      chatroomId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "cascade",
        // onUpdate: "cascade",
      },
      boardId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_chatrooms");
  },
};

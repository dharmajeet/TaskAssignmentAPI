module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "userId",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "name",
    },
    designation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "designation",
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "userName",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password",
    },
    phone: {
      type: DataTypes.BIGINT(11),
      allowNull: true,
      field: "phone",
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "User",
      field: "role",
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      field: "active",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updatedAt",
    },
  });

  return Users;
};

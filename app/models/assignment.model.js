module.exports = (sequelize, DataTypes) => {
  const Assignments = sequelize.define("assignment", {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    assignmentId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "assignmentId",
    },
    assignTo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "assignTo",
    },
    assignToUserId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "assignToUserId",
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "subject",
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "description",
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "comment",
    },
    satisfied: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: "satisfied",
    },
    satisfiedUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "satisfiedUpdate",
    },
    updatedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "updatedBy",
    },
    followUpDate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "followUpDate",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updatedAt",
    },
  });

  return Assignments;
};

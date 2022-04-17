module.exports = (sequelize, DataTypes) => {
  


    const officersAssignments = sequelize.define("officerAssignment", {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
   
      assignTo: {
        type: DataTypes.JSON,
        allowNull: false,
        field: "assignTo",
      },
     
    
      description: {
        type: DataTypes.STRING(2255),
        allowNull: false,
        field: "description",
      },
    
      // place: {
      //   type: DataTypes.STRING(255),
      //   allowNull: true,
      //   field: "place",
      // },
     
     
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
  
    return officersAssignments;
  };
  
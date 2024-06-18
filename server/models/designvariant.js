"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DesignVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DesignVariant.belongsTo(models.Design, { foreignKey: "designId" });
      DesignVariant.hasMany(models.Like, { foreignKey: "designVariantId" });
    }
  }
  DesignVariant.init(
    {
      designId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      alt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DesignVariant",
    }
  );
  return DesignVariant;
};

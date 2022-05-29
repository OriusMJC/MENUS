const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING(3000) 
    },
    tipoDePlato:{
      type: DataTypes.STRING
    },
    resumenDePlato:{
      type: DataTypes.STRING(1000)
    },
    nivelSalubre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pasos: {
      type: DataTypes.ARRAY(DataTypes.STRING(5000))
    }
  },{
    timestamps: false
  });
};

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING 
    },
    tipoDePlato:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    resumenDePlato:{
      type: DataTypes.STRING,
      allowNull: false
    },
    puntuacion: {
      type: DataTypes.INTEGER,
    },
    nivelSalubre: {
      type: DataTypes.INTEGER
    },
    pasos: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },{
    timestamps: false
  });
};

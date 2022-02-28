const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo`1
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT ,
      allowNull: true,
    },
    backgroundimage: {
      type: DataTypes.STRING,
    },
    plataforma: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createdVideoGame: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    }
  });
};

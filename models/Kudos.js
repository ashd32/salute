module.exports = function (sequelize, DataTypes) {
    const Kudos = sequelize.define("Kudos", {
        name: DataTypes.STRING,
        showAddress: DataTypes.BOOLEAN,
        Kudosname: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Kudos;
};


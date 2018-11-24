module.exports = function (sequelize, DataTypes) {
    const Kudos = sequelize.define("Kudos", {
        objectID: DataTypes.INTEGER,
        KudosText: DataTypes.STRING
    });
    Kudos.associate=function(models){
        Kudos.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Kudos;
};
module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define("Users", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING
    });
    Users.associate=function(models){
        Users.hasMany(models.Kudos, {
            onDelete: 'cascade'
        });
    };
    return Users;
};


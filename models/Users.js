module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define("Users", {
        objectID: DataTypes.INTEGER,
        name: DataTypes.STRING
    });
    Users.associate=function(models){
        Users.hasMany(models.Kudos, {
            onDelete: 'cascade'
        });
    };
    return Users;
};


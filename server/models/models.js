const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const TableModel = sequelize.define('tableModel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    distance: {type: DataTypes.INTEGER, allowNull: false}
})

module.exports = {
    TableModel
}
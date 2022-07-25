module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("weather", {
    identifier:{
      type:Sequelize.STRING
    },
    city:{
      type:Sequelize.STRING
    },
    weather:{
      type:Sequelize.STRING
    },
    temperature:{
      type:Sequelize.STRING
    },
    uvIndex:{
      type:Sequelize.STRING
    },
  });
  return Tutorial;
};
const {DataTypes}=require('sequelize');
const sequelize=require('../db/connection');

const Employee=sequelize.define('employee',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    job_title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone_number:{
        type:DataTypes.STRING,
        allowNull:false,

        validate:{
            isNumeric:true,
            len:[10,10]
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,

        validate:{
            isEmail:true
        }
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    }
);

const Contacts=
sequelize.define('contacts',{
    primary_name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    primary_phone_number:{
        type:DataTypes.STRING,
        allowNull:false,
   
        validate:{
            isNumeric:true,
            len:[10,10]
        }
    },
    primary_relationship:{
        type:DataTypes.STRING,
        allowNull:false
    },
    secondary_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    secondary_phone_number:{
        type:DataTypes.STRING,
        allowNull:false,
  
        validate:{
            isNumeric:true,
            len:[10,10]
        }
    },
    secondary_relationship:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    }
);
Employee.hasMany(Contacts,{as:"contacts",foreignKey:"employeeId",onDelete:'cascade'});
Contacts.belongsTo(Employee,{as:"employee"});

sequelize.sync({alter:true})

module.exports={Employee,Contacts}; 


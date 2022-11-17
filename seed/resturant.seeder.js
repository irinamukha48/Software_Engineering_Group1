const Resturant = require('../models/Resturant');

let resturants = [

    // Test Resutrant
    new Resturant ({
        name: "ECE-Resturant",
    
        address:{
            building:11,
            street: "XYZ street",
            state: "NJ",
            country: "USA",
            zip_code: 12345
        }
    
    
    }),

    // Test Resutrant
    new Resturant ({
        name: "ECE-Resturant-example2",
    
        address:{
            street: "XYZ street w/ no building",
            state: "NJ",
            country: "USA",
            zip_code: 12346
        }
    
    }),

    // Test Resutrant
    new Resturant ({
        name: "ECE-Resturant-example3",
    
        address:{
            street: "XYZ street w/ no building",
            state: "NJ",
            country: "USA",
            zip_code: 12346
        }
    
    }),
    

]

seed(Resturant, resturants)

async function seed (model, resturants_array){


    for (var i = 0; i < resturants_array.length; i++)
    {   
        var result = await model.exists({name: resturants_array[i].name, address: resturants_array[i].address, item: resturants_array[i].item})
        if(!result)
        {
            resturants_array[i].save()
        }
    }
}

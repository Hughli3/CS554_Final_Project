const dbConnection = require('../config/connection');
const userData = require("../data/user");
const propertyData = require("../data/property")
const ObjectId = require('mongodb').ObjectID;

//  ==================== User and Property data ====================
const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    let user1 = {
        id: "bCWDxwln7cMUYLvofdBRiaT5sZh1",
        email:"seedseed1@gmail.com",
        password:"password1",
        photo:null,
        phone:"1029784458"
    }
    await userData.add(user1.id, user1.email)
    await userData.updateUser(user1.id, user1.phone, user1.photo);
    console.log("user1 created");
     
    property1 = {
        title:"1 Bd/1Ba - Prime Hoboken Area - $100 Application Fee",
        description:"The Jordan in Hoboken, NJ offers condo style one- and two-bedroom apartments with six different floor plans to choose from. From the soaring 9 foot ceilings with expansive Pella Architect Series windows, to the natural oak hardwood floors and the Frigidaire washer/dryer set, your apartment offers plenty to love. Your home comes with 7-ft solid, wood doors and controlled central heating and air conditioning with programmable thermostats. In the gourmet style kitchen, you will notice Dal Torreon porcelain tiled floors with Nemo Metro gloss tiled backsplash, walnut cabinetry with soft-close features, Kohler chrome fixtures, and Caesarstone countertops. ",
        price:3059,
        zipcode:"07030",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: "2020-04-17"
    }
    
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property1)
    console.log("property1 created")

    // ------------------------------------------------------------
    user2 = {
        id: "gGGZfLVBFuTzVFY74cNJ0uRHYr02",
        password:"password2",
        photo:null,
        phone:"1538649479",
        email:"seedseed2@gmail.com"
    }

    await userData.add(user2.id, user2.email)
    await userData.updateUser(user2.id, user2.phone, user2.photo);
    console.log("user2 created");

    property2 = {
        ownerid:"gGGZfLVBFuTzVFY74cNJ0uRHYr02",
        title:"3/4 Bedroom house for rent",
        description:"3/4 Bedroom Dutch Colonial. Very large master bedroom, pets ok, all hardwood and tile floors. 1.5 BATH. Formal Dining room , Full walk out Basement, New Central Air and Heat with Blue Tooth controls, new roof ,windows ,siding, bathrooms and more. Optional Private beach. Available Immediately.",
        zipcode:"07849",
        price:2400,
        date:"2020-04-24",
        bedroom:3,
        bath:1,
        type: "house"
    }

    await propertyData.add("gGGZfLVBFuTzVFY74cNJ0uRHYr02", property2)
    console.log("property2 created")

    // ------------------------------------------------------------
    user3 = {
        id: "gba8X9WshQPpYWyr5kzag18kfL73",
        password:"password3",
        photo:null,
        phone:"8489798468",
        email:"seedseed1@gmail.com"
    }

    await userData.add(user3.id, user3.email)
    await userData.updateUser(user3.id, user3.phone, user3.photo);
    console.log("user3 created");

    property3 = {
        ownerid:"gba8X9WshQPpYWyr5kzag18kfL73",
        title:"AWESOME 3 BEDROOM APT (FRANKLIN,NJ)",
        description:"HUGE 3 BEDROOM APT..2200 sq ft \n ONLY 1 APT ABOVE A STORE . \n HARDWOOD FLOORS THROUGHOUT \n HUGE DECK OFF YOUR BACK DOOR \n WASHER & DRYER HOOKUP IN APT \n 3 ZONES OF HEATING \n YOUR OWN GAS FED BOILER \n CEILING FANS IN EVERY ROOM \n CENTRAL AIR \n HUGE FAMILY ROOM PLUS LIVING ROOM",
        zipcode:"07416",
        price:1850,
        date:"2020-03-04",
        bedroom:3,
        bath:1,
        type: "house"
    }

    await propertyData.add("gba8X9WshQPpYWyr5kzag18kfL73", property3)
    console.log("property3 created")

    // ------------------------------------------------------------
    user4 = {
        id: "EBf4QO4DNqSCrYg2Sye5ae2Bft22",
        password:"password4",
        photo:null,
        phone:"6458859931",
        email:"seedseed4@gmail.com"
    }

    await userData.add(user4.id, user4.email)
    await userData.updateUser(user4.id, user4.phone, user4.photo);
    console.log("user4 created")

    property4 = {
        ownerid:"EBf4QO4DNqSCrYg2Sye5ae2Bft22",
        title:"Journal Square Luxury 2 Bedroom. No fees (Journal Square, Jersey City)",
        description:"New Premium Rentals in Journal Square, Jersey City \n Studio, 1 to 3 bdrm units available for immediate move-in. Move-in costs covered by us. \n Sleek 16-story premium rental is intelligently designed, complemented by in-demand smart home features and unparalleled amenities. \n Exclusive indoor, outdoor and fitness amenities are paired with the luxuriously comfortable interiors in these exceptionally crafted apartments. \n Journal Square will entice you with its restaurants nightlife, shopping, and proximity to Manhattan. This charming community has a long history as the cultural center of Hudson County.",
        zipcode:"07047",
        price:2950,
        date:"2020-05-161",
        bedroom:2,
        bath:1,
        type: "house"
    }

    await propertyData.add("EBf4QO4DNqSCrYg2Sye5ae2Bft22", property4)
    console.log("property4 created")

    // ------------------------------------------------------------
    user5 = {
        id: "6T4h2MaNfzbtKxojCQn5dMAhsoq2",
        password:"password5",
        photo:null,
        phone:"1147895642",
        email:"seedseed5@gmail.com"
    }

    await userData.add(user5.id, user5.email)
    await userData.updateUser(user5.id, user5.phone, user5.photo);
    console.log("user4 created")

    property5 = {
        ownerid:"6T4h2MaNfzbtKxojCQn5dMAhsoq2",
        title:"BEAUTIFUL, SUNNY, LG 4 BR!* LNDRY, ELEV, PETS OK!",
        description:"This large, 4 bedroom apartment features a huge, separate windowed kitchen with dishwasher, a large, windowed bathroom, high ceilings, gorgeous hardwood floors, closets and more! This is an elevator building with a laundry room, video intercom and is only two short blocks to the 1 train. Pets are welcome. Heat and water included. This is a beautiful, prewar building. The super lives on the premises. Perfect as a share or for a family. A must see! \n Fabulous location! Just steps to Riverside Park, Columbia University, shopping and transportation. Please call/text Ruth at (917) 592-3145 to schedule an appointment. Move-in date is flexible. **ONE MONTH FREE!** \n do NOT contact me with unsolicited services or offers",
        zipcode:"07030",
        price:2970,
        date:"2019-06-29",
        bedroom:3,
        bath:1,
        type: "apartment"
    }
    await propertyData.add("6T4h2MaNfzbtKxojCQn5dMAhsoq2", property5)
    console.log("property5 created")

    await db.serverConfig.close();
}

main().catch(console.log);
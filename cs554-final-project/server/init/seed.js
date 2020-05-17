const dbConnection = require('../config/connection');
const userData = require("../data/user");
const propertyData = require("../data/property")
const imageData = require("../data/img")
const fs = require('fs');


//  ==================== User and Property data ====================
const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();
    let oldUDis = "./public/user/"
    let oldPDis = "./public/property/"
    let newDis = "./public/img/"
    
    let user1 = {
        id: "BXLknbeyvYX200Ewj8fsQUqarzi1",
        email: "seedseed1@gmail.com",
        password:"password1",
        photo: "user_1.jpg",
        phone:"1029784458"
    }

    let userOne = await imageData.createGridFS(user1.photo, "avatar", "./public/user/"+user1.photo);
    await userData.add(user1.id, user1.email)
    await userData.updateUser(user1.id, user1.phone, userOne);
    console.log("user1 created");
     
    property1 = {
        title:"1 Bd/1Ba - Prime Hoboken Area - $100 Application Fee",
        description:"The Jordan in Hoboken, NJ offers condo style one- and two-bedroom apartments with six different floor plans to choose from. From the soaring 9 foot ceilings with expansive Pella Architect Series windows, to the natural oak hardwood floors and the Frigidaire washer/dryer set, your apartment offers plenty to love. Your home comes with 7-ft solid, wood doors and controlled central heating and air conditioning with programmable thermostats. In the gourmet style kitchen, you will notice Dal Torreon porcelain tiled floors with Nemo Metro gloss tiled backsplash, walnut cabinetry with soft-close features, Kohler chrome fixtures, and Caesarstone countertops. ",
        price:3059,
        zipcode:"07030",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1587154999
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property1)
    console.log("property1 created")

    property6 = {
        title:"Wharton, NJ (22 Huff St #A,)",
        description:"WOW!! LARGE FENCED IN YARD! 3 SEASON SUNROOM. SPACIOUS RANCH HOME LOCATED ON DESIRABLE DEAD END STREET IN CONVENIENT LOCATION OF WHARTON. LOADED WITH UPDATES, NEWER KITCHEN W/ GRANITE, CABS, S/S APPL UPDATED BATHS, HW FLOORS, WINDOWS. FINISHED BASEMENT OFFERS 4TH BED OPTION OR OFFICE SPACE. FENCED IN YARD. NICE LEVEL PROPERTY. ",
        price:1000,
        zipcode:"07086",
        type: "house",
        bedroom:3,
        bath:2,
        date: 1588578388
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property6)
    console.log("property6 created")

    property7 = {
        title:"Pitman, NJ (344 Edsam Ave #2,)",
        description:"Nice 1 bedroom apartment on the 2nd Floor in Pitman near the lake. Modern kitchen with tiled back splash and built-in dishwasher. Energy Efficient Heating & A/C. Private drive - parking for 1 car with assigned parking.",
        price:600,
        zipcode:"07317",
        type: "house",
        bedroom:1,
        bath:1,
        date: 1588200928
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property7)
    console.log("property7 created")

    property8 = {
        title:"BBQ & Fire Pit Lounge, Pool, Fitness Center-*NO FEES (Montclair)",
        description:"Nestled in a serene area just 40 minutes from New York City is Montclair Residences at Bay St. Station. These high-end lodgings provide the safe, quiet neighborhood you crave with the excitement of the Big Apple close at hand. Relax and burn off steam at the building’s fitness center, dive into the clear waters of the heated pool, or lounge in the business center while completing your next assignment.",
        price:2185,
        zipcode:"07042",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1587784342
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property8)
    console.log("property8 created")

    property9 = {
        title:"Brand New One Bedroom - Immediate Move-In",
        description:"Experience the difference at The Grande at Metropark! Our luxury residential apartments in the heart of Woodbridge, NJ — and convenient to Iselin and Edison — offer contemporary style, a wealth of resident amenities, an extensive resident activity program, and unparalleled conveniences, which are only the beginning. Magnificent modern living starts here!",
        price:2075,
        zipcode:"08830",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1589687942
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property9)
    console.log("property9 created")

    property10 = {
        title:"NICE!!!! (NORTH NEWARK)",
        description:"2.5 bedroom apartment for rent\nEat in kitchen\nNice size rooms\nNear public transportation\nPublic schools",
        price:1550,
        zipcode:"07104",
        type: "apartment",
        bedroom:2,
        bath:1,
        date: 1589646134
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property10)
    console.log("property10 created")

    property11 = {
        title:"3 bd/1 ba Hoboken $3500 1300sq ft (Hoboken)",
        description:"3 bedroom / 1 bathroom 1300sq ft Hoboken apartment available for rent July 1 or 15. $3500. Full floor apartment on top floor of three unit walk up building at 6th and Adams St. Big closets and dishwasher. Laundry in building. Student and family friendly. 2 blocks to grocery store and 126 bus stop to Port Authority.",
        price:3500,
        zipcode:"07030",
        type: "apartment",
        bedroom:3,
        bath:1,
        date: 1587145064
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property11)
    console.log("property11 created")

    property12 = {
        title:"1 Bd/1Ba - Prime Hoboken Area - $100 Application Fee",
        description:"The Jordan in Hoboken, NJ offers condo style one- and two-bedroom apartments with six different floor plans to choose from. From the soaring 9 foot ceilings with expansive Pella Architect Series windows, to the natural oak hardwood floors and the Frigidaire washer/dryer set, your apartment offers plenty to love. Your home comes with 7-ft solid, wood doors and controlled central heating and air conditioning with programmable thermostats. In the gourmet style kitchen, you will notice Dal Torreon porcelain tiled floors with Nemo Metro gloss tiled backsplash, walnut cabinetry with soft-close features, Kohler chrome fixtures, and Caesarstone countertops. ",
        price:3059,
        zipcode:"07030",
        type: "apartment",
        bedroom:3,
        bath:1,
        date: 1589502719
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property12)
    console.log("property12 created")

    property13 = {
        title:"Luxury 1 bedroom, Pet friendly community, 24 hr gym, yoga room, + Pool",
        description:"Welcome home to The Highlands at Westwood! Newly renovated one, two bedroom and two bedroom with den luxury apartment homes, The Highlands at Westwood is a picturesque apartment community. In a suburban setting, our community has a neighborhood feeling, allwith a close proximity to Manhattan that makes it the perfect placeto live! Luxury features await you, including individual patios orbalconies, granite countertops and stainless steel appliances. Amenities include state of the art fitness center, clubroom, yoga room, computer stations, BBQ and picnic area, canine country club & beautifully landscaped courtyards.",
        price:2363,
        zipcode:"07675",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1585387207
    }
    
    await propertyData.add("BXLknbeyvYX200Ewj8fsQUqarzi1", property13)
    console.log("property13 created")
    

// ------------------------------------------------------------
user2 = {
    id: "lPaabnTW4VbDuTQ3KURLn5DjtgY2",
    password:"password2",
    photo: "user_2.jpg", //TODO
    phone:"1538649479",
    email: "seedseed2@gmail.com"
    }   

    let userTwo = await imageData.createGridFS(user2.photo, "avatar", "./public/user/"+user2.photo);
    await userData.add(user2.id, user2.email)
    await userData.updateUser(user2.id, user2.phone, userTwo);
    console.log("user2 created");

    

    property2 = {
        ownerid:"lPaabnTW4VbDuTQ3KURLn5DjtgY2",
        title:"3/4 Bedroom house for rent",
        description:"3/4 Bedroom Dutch Colonial. Very large master bedroom, pets ok, all hardwood and tile floors. 1.5 BATH. Formal Dining room , Full walk out Basement, New Central Air and Heat with Blue Tooth controls, new roof ,windows ,siding, bathrooms and more. Optional Private beach. Available Immediately.",
        zipcode:"07849",
        price:2400,
        date:1587758628,
        bedroom:3,
        bath:1,
        type: "house"
    }

    await propertyData.add("lPaabnTW4VbDuTQ3KURLn5DjtgY2", property2)
    console.log("property2 created")

// ------------------------------------------------------------
user3 = {
    id: "0s2C7Gdl6AZl7Jz6UeHSMZZCCK33",
    password:"password3",
    photo:"user_3.jpg", //TODO
    phone:"8489798468",
    email: "seedseed3@gmail.com"
    }

    let userThree = await imageData.createGridFS(user3.photo, "avatar", "./public/user/"+user3.photo);
    await userData.add(user3.id, user3.email)
    await userData.updateUser(user3.id, user3.phone, userThree);
    console.log("user3 created");

    property3 = {
        ownerid:"0s2C7Gdl6AZl7Jz6UeHSMZZCCK33",
        title:"AWESOME 3 BEDROOM APT (FRANKLIN,NJ)",
        description:"HUGE 3 BEDROOM APT..2200 sq ft \n ONLY 1 APT ABOVE A STORE . \n HARDWOOD FLOORS THROUGHOUT \n HUGE DECK OFF YOUR BACK DOOR \n WASHER & DRYER HOOKUP IN APT \n 3 ZONES OF HEATING \n YOUR OWN GAS FED BOILER \n CEILING FANS IN EVERY ROOM \n CENTRAL AIR \n HUGE FAMILY ROOM PLUS LIVING ROOM",
        zipcode:"07416",
        price:1850,
        date:1583363547,
        bedroom:3,
        bath:1,
        type: "house"
    }

    await propertyData.add("0s2C7Gdl6AZl7Jz6UeHSMZZCCK33", property3)
    console.log("property3 created")

// ------------------------------------------------------------
user4 = {
    id: "W35jI2trL3h4j0l8OUuOqGjT7hv1",
    password:"password4",
    photo:"user_4.jpg", //TODO
    phone:"6458859931",
    email: "seedseed4@gmail.com"
}   
    let userFour = await imageData.createGridFS(user4.photo, "avatar", "./public/user/"+user4.photo);
    await userData.add(user4.id, user4.email)
    await userData.updateUser(user4.id, user4.phone, userFour);
    console.log("user4 created")

    property4 = {
        ownerid:"W35jI2trL3h4j0l8OUuOqGjT7hv1",
        title:"Journal Square Luxury 2 Bedroom. No fees (Journal Square, Jersey City)",
        description:"New Premium Rentals in Journal Square, Jersey City \n Studio, 1 to 3 bdrm units available for immediate move-in. Move-in costs covered by us. \n Sleek 16-story premium rental is intelligently designed, complemented by in-demand smart home features and unparalleled amenities. \n Exclusive indoor, outdoor and fitness amenities are paired with the luxuriously comfortable interiors in these exceptionally crafted apartments. \n Journal Square will entice you with its restaurants nightlife, shopping, and proximity to Manhattan. This charming community has a long history as the cultural center of Hudson County.",
        zipcode:"07047",
        price:2950,
        date:1589691682,
        bedroom:2,
        bath:1,
        type: "house"
    }

    await propertyData.add("W35jI2trL3h4j0l8OUuOqGjT7hv1", property4)
    console.log("property4 created")

// ------------------------------------------------------------
user5 = {
    id: "m17QqRBX2eTQOyRg3nnZneBFDxp2",
    password:"password5",
    photo:"user_5.jpg", //TODO
    phone:"1147895642",
    email: "seedseed5@gmail.com"
}
    let userFive = await imageData.createGridFS(user5.photo, "avatar", "./public/user/"+user5.photo);
    await userData.add(user5.id, user5.email)
    await userData.updateUser(user5.id, user5.phone, userFive);
    console.log("user5 created")

    property5 = {
        ownerid:"m17QqRBX2eTQOyRg3nnZneBFDxp2",
        title:"BEAUTIFUL, SUNNY, LG 4 BR!* LNDRY, ELEV, PETS OK!",
        description:"This large, 4 bedroom apartment features a huge, separate windowed kitchen with dishwasher, a large, windowed bathroom, high ceilings, gorgeous hardwood floors, closets and more! This is an elevator building with a laundry room, video intercom and is only two short blocks to the 1 train. Pets are welcome. Heat and water included. This is a beautiful, prewar building. The super lives on the premises. Perfect as a share or for a family. A must see! \n Fabulous location! Just steps to Riverside Park, Columbia University, shopping and transportation. Please call/text Ruth at (917) 592-3145 to schedule an appointment. Move-in date is flexible. **ONE MONTH FREE!** \n do NOT contact me with unsolicited services or offers",
        zipcode:"07030",
        price:2970,
        date:1574886102,
        bedroom:3,
        bath:1,
        type: "apartment"
    }
    await propertyData.add("m17QqRBX2eTQOyRg3nnZneBFDxp2", property5)
    console.log("property5 created")

    await db.serverConfig.close();
}

main().catch(console.log);
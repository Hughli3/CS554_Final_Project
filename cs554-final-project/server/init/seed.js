const dbConnection = require('../config/connection');
const userData = require("../data/user");

//  ==================== User and Property data ====================
const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

let user1 = {
    id: "bCWDxwln7cMUYLvofdBRiaT5sZh1",
    email:"seedseed1@gmail.com",
    password:"password1",
    photo:"../public/user/user_1.png", //TODO
    phone:"1029784458"
}
await userData.add(user1.id, user1.email)
await userData.updateUser(user1.id, user1.phone, user1.photo);
console.log("user1 created");

// property1 = {
//     ownerid:"bCWDxwln7cMUYLvofdBRiaT5sZh1",
//     title:"1 Bd/1Ba - Prime Hoboken Area - $100 Application Fee",
//     decsription:"The Jordan in Hoboken, NJ offers condo style one- and two-bedroom apartments with six different floor plans to choose from. From the soaring 9 foot ceilings with expansive Pella Architect Series windows, to the natural oak hardwood floors and the Frigidaire washer/dryer set, your apartment offers plenty to love. Your home comes with 7-ft solid, wood doors and controlled central heating and air conditioning with programmable thermostats. In the gourmet style kitchen, you will notice Dal Torreon porcelain tiled floors with Nemo Metro gloss tiled backsplash, walnut cabinetry with soft-close features, Kohler chrome fixtures, andCaesarstone countertops. ",
//     postcode:"07030",
//     price:3059,
//     deposit:3600,
//     publishedDate:"2020-04-17",
//     bedroom:1,
//     baths:1,
//     type: "apartment"
// }
// // ------------------------------------------------------------
// user2 = {
//     _id: "gGGZfLVBFuTzVFY74cNJ0uRHYr02",
//     password:"password2",
//     photo:"../public/user/user_2.png", //TODO
//     phone:"1538649479",
//     email:"seedseed2@gmail.com"
// }

// property2 = {
//     ownerid:"gGGZfLVBFuTzVFY74cNJ0uRHYr02",
//     title:"3/4 Bedroom house for rent",
//     decsription:"3/4 Bedroom Dutch Colonial. Very large master bedroom, pets ok, all hardwood and tile floors. 1.5 BATH. Formal Dining room , Full walk out Basement, New Central Air and Heat with Blue Tooth controls, new roof ,windows ,siding, bathrooms and more. Optional Private beach. Available Immediately.",
//     zipcode:"07849",
//     price:2400,
//     date:"2020-04-24",
//     bedroom:3,
//     bath:1,
//     type: "house"
// }

// // ------------------------------------------------------------
// user3 = {
//     _id: "gba8X9WshQPpYWyr5kzag18kfL73",
//     password:"password3",
//     photo:"../public/user/user_3.png", //TODO
//     phone:"8489798468",
//     email:"seedseed1@gmail.com"
// }

// property3 = {
//     ownerid:"gba8X9WshQPpYWyr5kzag18kfL73",
//     title:"AWESOME 3 BEDROOM APT (FRANKLIN,NJ)",
//     decsription:"HUGE 3 BEDROOM APT..2200 sq ft \n ONLY 1 APT ABOVE A STORE . \n HARDWOOD FLOORS THROUGHOUT \n HUGE DECK OFF YOUR BACK DOOR \n WASHER & DRYER HOOKUP IN APT \n 3 ZONES OF HEATING \n YOUR OWN GAS FED BOILER \n CEILING FANS IN EVERY ROOM \n CENTRAL AIR \n HUGE FAMILY ROOM PLUS LIVING ROOM",
//     zipcode:"07416",
//     price:1850,
//     date:"2020-03-04",
//     bedroom:3,
//     bath:1,
//     type: "house"
// }
// // ------------------------------------------------------------
// user4 = {
//     _id: "EBf4QO4DNqSCrYg2Sye5ae2Bft22",
//     password:"../public/user/user_4.png",
//     photo:"../img/", //TODO
//     phone:"6458859931",
//     email:"seedseed4@gmail.com"
// }

// property4 = {
//     ownerid:null,
//     title:"Journal Square Luxury 2 Bedroom. No fees (Journal Square, Jersey City)",
//     decsription:"New Premium Rentals in Journal Square, Jersey City \n Studio, 1 to 3 bdrm units available for immediate move-in. Move-in costs covered by us. \n Sleek 16-story premium rental is intelligently designed, complemented by in-demand smart home features and unparalleled amenities. \n Exclusive indoor, outdoor and fitness amenities are paired with the luxuriously comfortable interiors in these exceptionally crafted apartments. \n Journal Square will entice you with its restaurants nightlife, shopping, and proximity to Manhattan. This charming community has a long history as the cultural center of Hudson County.",
//     zipcode:"07047",
//     price:2950,
//     date:"2020-05-161",
//     bedroom:2,
//     bath:1,
//     type: "house"
// }
// // ------------------------------------------------------------
// user5 = {
//     _id: "6T4h2MaNfzbtKxojCQn5dMAhsoq2",
//     password:"password5",
//     photo:"../public/user/user_5.png", //TODO
//     phone:"1147895642",
//     email:"seedseed5@gmail.com"
// }

// property5 = {
//     ownerid:"6T4h2MaNfzbtKxojCQn5dMAhsoq2",
//     title:"BEAUTIFUL, SUNNY, LG 4 BR!* LNDRY, ELEV, PETS OK! Off B’way/120th St (Upper West Side)",
//     decsription:"This large, 4 bedroom apartment features a huge, separate windowed kitchen with dishwasher, a large, windowed bathroom, high ceilings, gorgeous hardwood floors, closets and more! This is an elevator building with a laundry room, video intercom and is only two short blocks to the 1 train. Pets are welcome. Heat and water included. This is a beautiful, prewar building. The super lives on the premises. Perfect as a share or for a family. A must see! \n Fabulous location! Just steps to Riverside Park, Columbia University, shopping and transportation. Please call/text Ruth at (917) 592-3145 to schedule an appointment. Move-in date is flexible. **ONE MONTH FREE!** \n do NOT contact me with unsolicited services or offers",
//     postcode:"07030",
//     price:2970,
//     publishedDate:"2019-06-29",
//     bedroom:3,
//     bath:1,
//     type: "apartment"
// }
await db.serverConfig.close();
}

main().catch(console.log);
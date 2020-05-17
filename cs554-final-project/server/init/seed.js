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
    imagesInfo1 = ["property1-1.jpg"]
    imagesInfo2 = ["property2-1.jpg"]
    imagesInfo3 = ["property3-1.jpg"]
    imagesInfo4 = ["property4-1.jpg", "property4-2.jpg", "property4-3.jpg", "property4-4.jpg", "property4-5.jpg", "property4-6.jpg", "property4-7.jpg", "property4-8.jpg", "property4-9.jpg", "property4-10.jpg", "property4-11.jpg"]
    imagesInfo5 = ["property5-1.jpg", "property5-2.jpg", "property5-3.jpg", "property5-4.jpg", "property5-5.jpg", "property5-6.jpg", "property5-7.jpg"]
    imagesInfo6 = ["property6-1.jpg", "property6-2.jpg", "property6-3.jpg", "property6-4.jpg", "property6-5.jpg"]
    imagesInfo7 = ["property7-1.jpg", "property7-2.jpg", "property7-3.jpg"]
    imagesInfo8 = ["property8-1.jpg", "property8-2.jpg", "property8-3.jpg", "property8-4.jpg", "property8-5.jpg"]
    imagesInfo9 = ["property9-1.jpg", "property9-2.jpg", "property9-3.jpg", "property9-4.jpg", "property9-5.jpg"]
    imagesInfo10 = ["property10-1.jpg", "property10-2.jpg", "property10-3.jpg", "property10-4.jpg", "property10-5.jpg"]
    imagesInfo11 = ["property11-1.jpg", "property11-2.jpg", "property11-3.jpg", "property11-4.jpg", "property11-5.jpg", "property11-6.jpg"]
    imagesInfo12 = ["property12-1.jpg", "property12-2.jpg", "property12-3.jpg", "property12-4.jpg", "property12-5.jpg", "property12-6.jpg", "property12-7.jpg" ]
    imagesInfo13 = ["property13-1.jpg", "property13-2.jpg", "property13-3.jpg", "property13-4.jpg", "property13-5.jpg", "property13-6.jpg"]



    let user1 = {
        id: "bCWDxwln7cMUYLvofdBRiaT5sZh1",
        email:"seedseed1@gmail.com",
        password:"password1",
        photo: "user_1.jpg",
        phone:"1029784458"
    }

    let userOne = await imageData.createGridFS(user1.photo, "avatar", "./public/user/"+user1.photo);
    await userData.add(user1.id, user1.email)
    await userData.updateUser(user1.id, user1.phone, userOne);
    console.log("user1 created");
     
    property1 = {
        title:"A PERFECT budget friendly starter home alternative with LOW taxes",
        description:"A PERFECT budget friendly starter home alternative with LOW taxes AND HOA fees. This 3 bed 2.5 bath light and airy townhome features updated kitchens and baths - one of the full baths being in the master bedroom. Move in ready so all you need to do is unpack and move right in! Utilities are an amazing shape so maintenance will be a breeze! Townhome is also located next to shops, restaurants, public transportation, and places of worship.",
        price:1575,
        zipcode:"07017",
        type: "apartment",
        bedroom:3,
        bath:3,
        date: 1588291640000,
        album: []
    }
    
    for (let i = 0; i < imagesInfo1.length; i++) {
        let id = await imageData.createGridFS(imagesInfo1[i], "album", "./public/property/1/"+imagesInfo1[i]);
        property1.album.push(id);
    }
    
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property1)
    console.log("property1 created")

    property2 = {
        title:"Wharton, NJ (22 Huff St #A,)",
        description:"WOW!! LARGE FENCED IN YARD! 3 SEASON SUNROOM. SPACIOUS RANCH HOME LOCATED ON DESIRABLE DEAD END STREET IN CONVENIENT LOCATION OF WHARTON. LOADED WITH UPDATES, NEWER KITCHEN W/ GRANITE, CABS, S/S APPL UPDATED BATHS, HW FLOORS, WINDOWS. FINISHED BASEMENT OFFERS 4TH BED OPTION OR OFFICE SPACE. FENCED IN YARD. NICE LEVEL PROPERTY. ",
        price:1000,
        zipcode:"07086",
        type: "house",
        bedroom:3,
        bath:2,
        date: 1588578388387,
        album: []
    }
    
    for (let i = 0; i < imagesInfo2.length; i++) {
        let id = await imageData.createGridFS(imagesInfo2[i], "album", "./public/property/2/"+imagesInfo2[i]);
        property2.album.push(id);
    }
    
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property2)
    console.log("property2 created")

    property3 = {
        title:"Pitman, NJ (344 Edsam Ave #2,)",
        description:"Nice 1 bedroom apartment on the 2nd Floor in Pitman near the lake. Modern kitchen with tiled back splash and built-in dishwasher. Energy Efficient Heating & A/C. Private drive - parking for 1 car with assigned parking.",
        price:600,
        zipcode:"07317",
        type: "house",
        bedroom:1,
        bath:1,
        date: 1588200928841,
        album: []
    }
    for (let i = 0; i < imagesInfo3.length; i++) {
        let id = await imageData.createGridFS(imagesInfo3[i], "album", "./public/property/3/"+imagesInfo3[i]);
        property3.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property3)
    console.log("property3 created")

    property4 = {
        title:"BBQ & Fire Pit Lounge, Pool, Fitness Center-*NO FEES (Montclair)",
        description:"Nestled in a serene area just 40 minutes from New York City is Montclair Residences at Bay St. Station. These high-end lodgings provide the safe, quiet neighborhood you crave with the excitement of the Big Apple close at hand. Relax and burn off steam at the building’s fitness center, dive into the clear waters of the heated pool, or lounge in the business center while completing your next assignment.",
        price:2185,
        zipcode:"07042",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1587784342374,
        album: []
    }
    for (let i = 0; i < imagesInfo4.length; i++) {
        let id = await imageData.createGridFS(imagesInfo4[i], "album", "./public/property/4/"+imagesInfo4[i]);
        property4.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property4)
    console.log("property4 created")

    property5 = {
        title:"Brand New One Bedroom - Immediate Move-In",
        description:"Experience the difference at The Grande at Metropark! Our luxury residential apartments in the heart of Woodbridge, NJ — and convenient to Iselin and Edison — offer contemporary style, a wealth of resident amenities, an extensive resident activity program, and unparalleled conveniences, which are only the beginning. Magnificent modern living starts here!",
        price:2075,
        zipcode:"08830",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1589687942111,
        album: []
    }
    for (let i = 0; i < imagesInfo5.length; i++) {
        let id = await imageData.createGridFS(imagesInfo5[i], "album", "./public/property/5/"+imagesInfo5[i]);
        property5.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property5)
    console.log("property5 created")

    property6 = {
        title:"NICE!!!! (NORTH NEWARK)",
        description:"2.5 bedroom apartment for rent\nEat in kitchen\nNice size rooms\nNear public transportation\nPublic schools",
        price:1550,
        zipcode:"07104",
        type: "apartment",
        bedroom:2,
        bath:1,
        date: 1589646134199,
        album: []
    }
    for (let i = 0; i < imagesInfo6.length; i++) {
        let id = await imageData.createGridFS(imagesInfo6[i], "album", "./public/property/6/"+imagesInfo6[i]);
        property6.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property6)
    console.log("property6 created")

    property7 = {
        title:"3 bd/1 ba Hoboken $3500 1300sq ft (Hoboken)",
        description:"3 bedroom / 1 bathroom 1300sq ft Hoboken apartment available for rent July 1 or 15. $3500. Full floor apartment on top floor of three unit walk up building at 6th and Adams St. Big closets and dishwasher. Laundry in building. Student and family friendly. 2 blocks to grocery store and 126 bus stop to Port Authority.",
        price:3500,
        zipcode:"07030",
        type: "apartment",
        bedroom:3,
        bath:1,
        date: 1587145064491,
        album: []
    }
    for (let i = 0; i < imagesInfo7.length; i++) {
        let id = await imageData.createGridFS(imagesInfo7[i], "album", "./public/property/7/"+imagesInfo7[i]);
        property7.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property7)
    console.log("property7 created")

    property8 = {
        title:"One bedroom lake walk out apartment for rent (Lake Hopatcong)",
        description:"One bedroom walk out Lake house apartment for rent Furnished or unfurnished basic cable included all utilities included washer and dryer included off street parking included No Smoking no Pets, professional single adult only must pass background check. Must send Background history, renting, work... Leave your phone number with background history thank you",
        price:1200,
        zipcode:"07885",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1589146280000,
        album: []
    }
    for (let i = 0; i < imagesInfo8.length; i++) {
        let id = await imageData.createGridFS(imagesInfo8[i], "album", "./public/property/8/"+imagesInfo8[i]);
        property8.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property8)
    console.log("property8 created")

    property9 = {
        title:"Luxury 1 bedroom, Pet friendly community, 24 hr gym, yoga room, + Pool",
        description:"Welcome home to The Highlands at Westwood! Newly renovated one, two bedroom and two bedroom with den luxury apartment homes, The Highlands at Westwood is a picturesque apartment community. In a suburban setting, our community has a neighborhood feeling, allwith a close proximity to Manhattan that makes it the perfect placeto live! Luxury features await you, including individual patios orbalconies, granite countertops and stainless steel appliances. Amenities include state of the art fitness center, clubroom, yoga room, computer stations, BBQ and picnic area, canine country club & beautifully landscaped courtyards.",
        price:2363,
        zipcode:"07675",
        type: "apartment",
        bedroom:1,
        bath:1,
        date: 1585387207100,
        album: []
    }
    for (let i = 0; i < imagesInfo9.length; i++) {
        let id = await imageData.createGridFS(imagesInfo9[i], "album", "./public/property/9/"+imagesInfo9[i]);
        property9.album.push(id);}
    await propertyData.add("bCWDxwln7cMUYLvofdBRiaT5sZh1", property9)
    console.log("property9 created")
    

// ------------------------------------------------------------
user2 = {
    id: "gGGZfLVBFuTzVFY74cNJ0uRHYr02",
    password:"password2",
    photo: "user_2.jpg", //TODO
    phone:"1538649479",
    email:"seedseed2@gmail.com"
    }   

    let userTwo = await imageData.createGridFS(user2.photo, "avatar", "./public/user/"+user2.photo);
    await userData.add(user2.id, user2.email)
    await userData.updateUser(user2.id, user2.phone, userTwo);
    console.log("user2 created");

    

    property10 = {
        ownerid:"gGGZfLVBFuTzVFY74cNJ0uRHYr02",
        title:"3/4 Bedroom house for rent",
        description:"3/4 Bedroom Dutch Colonial. Very large master bedroom, pets ok, all hardwood and tile floors. 1.5 BATH. Formal Dining room , Full walk out Basement, New Central Air and Heat with Blue Tooth controls, new roof ,windows ,siding, bathrooms and more. Optional Private beach. Available Immediately.",
        zipcode:"07849",
        price:2400,
        date:1587758628562,
        bedroom:3,
        bath:1,
        type: "house",
        album: []
    }
    for (let i = 0; i < imagesInfo10.length; i++) {
        let id = await imageData.createGridFS(imagesInfo10[i], "album", "./public/property/10/"+imagesInfo10[i]);
        property10.album.push(id);}
    await propertyData.add("gGGZfLVBFuTzVFY74cNJ0uRHYr02", property10)
    console.log("property10 created")

// ------------------------------------------------------------
user3 = {
    id: "gba8X9WshQPpYWyr5kzag18kfL73",
    password:"password3",
    photo:"user_3.jpg", //TODO
    phone:"8489798468",
    email:"seedseed3@gmail.com"
    }

    let userThree = await imageData.createGridFS(user3.photo, "avatar", "./public/user/"+user3.photo);
    await userData.add(user3.id, user3.email)
    await userData.updateUser(user3.id, user3.phone, userThree);
    console.log("user3 created");

    property11 = {
        ownerid:"gba8X9WshQPpYWyr5kzag18kfL73",
        title:"AWESOME 3 BEDROOM APT (FRANKLIN,NJ)",
        description:"HUGE 3 BEDROOM APT..2200 sq ft \n ONLY 1 APT ABOVE A STORE . \n HARDWOOD FLOORS THROUGHOUT \n HUGE DECK OFF YOUR BACK DOOR \n WASHER & DRYER HOOKUP IN APT \n 3 ZONES OF HEATING \n YOUR OWN GAS FED BOILER \n CEILING FANS IN EVERY ROOM \n CENTRAL AIR \n HUGE FAMILY ROOM PLUS LIVING ROOM",
        zipcode:"07416",
        price:1850,
        date:1583363547084,
        bedroom:3,
        bath:1,
        type: "house",
        album: []
    }
    for (let i = 0; i < imagesInfo11.length; i++) {
        let id = await imageData.createGridFS(imagesInfo11[i], "album", "./public/property/11/"+imagesInfo11[i]);
        property11.album.push(id);}
    await propertyData.add("gba8X9WshQPpYWyr5kzag18kfL73", property11)
    console.log("property11 created")

// ------------------------------------------------------------
user4 = {
    id: "EBf4QO4DNqSCrYg2Sye5ae2Bft22",
    password:"password4",
    photo:"user_4.jpg", //TODO
    phone:"6458859931",
    email:"seedseed4@gmail.com"
}   
    let userFour = await imageData.createGridFS(user4.photo, "avatar", "./public/user/"+user4.photo);
    await userData.add(user4.id, user4.email)
    await userData.updateUser(user4.id, user4.phone, userFour);
    console.log("user4 created")

    property12 = {
        ownerid:"EBf4QO4DNqSCrYg2Sye5ae2Bft22",
        title:"Journal Square Luxury 2 Bedroom. No fees (Journal Square, Jersey City)",
        description:"New Premium Rentals in Journal Square, Jersey City \n Studio, 1 to 3 bdrm units available for immediate move-in. Move-in costs covered by us. \n Sleek 16-story premium rental is intelligently designed, complemented by in-demand smart home features and unparalleled amenities. \n Exclusive indoor, outdoor and fitness amenities are paired with the luxuriously comfortable interiors in these exceptionally crafted apartments. \n Journal Square will entice you with its restaurants nightlife, shopping, and proximity to Manhattan. This charming community has a long history as the cultural center of Hudson County.",
        zipcode:"07047",
        price:2950,
        date:1589691682715,
        bedroom:2,
        bath:1,
        type: "house",
        album: []
    }
    for (let i = 0; i < imagesInfo12.length; i++) {
        let id = await imageData.createGridFS(imagesInfo12[i], "album", "./public/property/12/"+imagesInfo12[i]);
        property12.album.push(id);}
    await propertyData.add("EBf4QO4DNqSCrYg2Sye5ae2Bft22", property12)
    console.log("property12 created")

// ------------------------------------------------------------
user5 = {
    id: "6T4h2MaNfzbtKxojCQn5dMAhsoq2",
    password:"password5",
    photo:"user_5.jpg", //TODO
    phone:"1147895642",
    email:"seedseed5@gmail.com"
}
    let userFive = await imageData.createGridFS(user5.photo, "avatar", "./public/user/"+user5.photo);
    await userData.add(user5.id, user5.email)
    await userData.updateUser(user5.id, user5.phone, userFive);
    console.log("user5 created")

    property13 = {
        ownerid:"6T4h2MaNfzbtKxojCQn5dMAhsoq2",
        title:"BEAUTIFUL, SUNNY, LG 4 BR!* LNDRY, ELEV, PETS OK!",
        description:"This large, 4 bedroom apartment features a huge, separate windowed kitchen with dishwasher, a large, windowed bathroom, high ceilings, gorgeous hardwood floors, closets and more! This is an elevator building with a laundry room, video intercom and is only two short blocks to the 1 train. Pets are welcome. Heat and water included. This is a beautiful, prewar building. The super lives on the premises. Perfect as a share or for a family. A must see! \n Fabulous location! Just steps to Riverside Park, Columbia University, shopping and transportation. Please call/text Ruth at (917) 592-3145 to schedule an appointment. Move-in date is flexible. **ONE MONTH FREE!** \n do NOT contact me with unsolicited services or offers",
        zipcode:"07030",
        price:2970,
        date:1574886102819,
        bedroom:3,
        bath:1,
        type: "apartment",
        album: []
    }
    for (let i = 0; i < imagesInfo13.length; i++) {
        let id = await imageData.createGridFS(imagesInfo13[i], "album", "./public/property/13/"+imagesInfo13[i]);
        property13.album.push(id);}
    await propertyData.add("6T4h2MaNfzbtKxojCQn5dMAhsoq2", property13)
    console.log("property13 created")

    await db.serverConfig.close();
    console.log("closed")
}

main().catch(console.log);
import fetch from 'node-fetch'
import { AugmentMetadataWithUserData, user_data_defaults } from '$lib/UserDataTools.js'
const response = await fetch('http://localhost:3300/json/admin.manga_metadata.json')
const a = await response.json()
const response1 = await fetch('http://localhost:3300/json/admin.manga_data.json')
const b = await response1.json()
const response2 = await fetch('http://localhost:3300/json/ratings.json')
const c = await response2.json()

let user_data;

try {
    const response3 = await fetch('http://localhost:3300/json/user_data.json')
    user_data = await response3.json()
} catch (error) {
    user_data = user_data_defaults;
    console.log("No user_data.json was found. Reverting to default settings: " + JSON.stringify(user_data));
}
    
const AugmentMetadataWithRatings = (db) => {
    let manga_titles = db['manga_metadata']['0'].manga_titles;
    let ratings = db['ratings'];
    console.log("Augment manga_metadata with " + Object.keys(ratings).length + " ratings");

    manga_titles.forEach(element => {
        let id = element.enid;

        if (id in ratings) {
            element["rating_data"] = ratings[id]
        } else {
            element["rating_data"] = { "url":"http://mangaupdates.com", "rating":"N/A", "votes": 0, "last_updated":"N/A"}
        }
    });
};

const admin={"manga_metadata":a,"manga_data":b,"ratings":c,"user_data":user_data}

AugmentMetadataWithUserData(admin);
AugmentMetadataWithRatings(admin);

export default admin;

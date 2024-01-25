import { json } from '@sveltejs/kit';
import db from "$lib/db";
import { AugmentMetadataWithUserData, saveUserData } from "$lib/UserDataTools.js";

const toggleFavourite = (manga_id) => {
    let favourite = false;
    if (db['user_data'].favourites.includes(manga_id)) {
        console.log(db['user_data'].favourites);
        db['user_data'].favourites = db['user_data'].favourites.filter((id) => {id != manga_id});
    } else {
        db['user_data'].favourites.push(manga_id);
        favourite = true;
    }
	saveUserData(db);
	AugmentMetadataWithUserData(db);
	return favourite;
}

export async function POST({ request }) {
	const data = await request.json();
	console.log("POST /user_data: " + JSON.stringify(data) );
	let ret = { success : false};
	if (data.func == 'toggle_favourite') {
        ret= {
            success : true,
            'favourite' : toggleFavourite(data.manga_id)
        };
	}
	console.log("POST /user_data return: " + JSON.stringify(ret));
	return json(ret);
}
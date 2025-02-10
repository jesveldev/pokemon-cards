"use strict";

var pokemons = [];

function findCoincidences(array,coincidence){
	for(let i = 0; i < array.length; i++){
		if(coincidence===array[i]) return true;
		else continue;
	}

	return false;
}

async function fetchData(url){
	const data = await fetch(url).then(res=>res.json()).catch(e=>{
		return e;
	});

	return [
		data.name,
		data.sprites.front_default,
		data.sprites.back_default
	];
}

async function buildCard(pokemon){

	if(pokemon.value == ''){
		alert("Escribe el nombre de un Pokemon");
		return null;
	}

	let renderElement = document.createDocumentFragment(),
		pokemonCard = document.createElement("div"),
		pokemonCardElements = [
		document.createElement("h3"),
		document.createElement("img"),
		document.createElement("img")
		],
		pokemonCardInfo = document.createDocumentFragment();

	try{

		if(findCoincidences(pokemons,pokemon.value)){
			throw Error(`${pokemon.value} ya ha sido buscado`);
		}

		let attributes = await fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemon.value.toLowerCase()=='giratina'?'giratina-altered':pokemon.value}`);
		console.log(attributes);

		pokemonCard.setAttribute("class","pokemon-card");

		pokemonCardElements[0].textContent=attributes[0]
		.toLowerCase()=='giratina-altered'?'giratina':attributes[0];

		pokemonCardElements[1].setAttribute("src",attributes[1]);
		pokemonCardElements[2].setAttribute("src",attributes[2]);

		for(let j = 0; j<3; j++){
			pokemonCard.appendChild(pokemonCardElements[j]);
		}

		pokemonCardInfo.appendChild(pokemonCard);

		pokemons.push(pokemon.value);
		document.getElementById("pkmn-list").appendChild(pokemonCardInfo);
			
	}catch(e){
		console.log(e);
	}
}

document.getElementById("submit").addEventListener("click",(e)=>{
	e.preventDefault();
	buildCard(document.getElementById("search-bar"));
});
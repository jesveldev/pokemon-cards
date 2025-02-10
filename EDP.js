"use strict";

var pokemons = [];

async function fetchData(url){
	const data = await fetch(url).then(res=>res.json()).catch(e=>console.error(e));

	return [
		data.name,
		data.sprites.front_default,
		data.sprites.back_default
	];
}

async function buildCards(){
	let firstGenPokemon = [],
		renderElement = document.createDocumentFragment(),
		resultados = prompt("¿Cuántos pokemones quieres ver?");

	for(let i = 1; i <= resultados; i++){

		let pokemonCard = document.createElement("div"),
			pokemonCardElements = [
			document.createElement("h3"),
			document.createElement("img"),
			document.createElement("img")
			],
			pokemonCardInfo = document.createDocumentFragment();

		let attributes = await fetchData(`https://pokeapi.co/api/v2/pokemon/${i}`);

		console.log(attributes);

		pokemonCardElements[0].textContent=attributes[0];
		pokemonCardElements[1].setAttribute("src",attributes[1]);
		pokemonCardElements[2].setAttribute("src",attributes[2]);

		for(let j = 0; j<3; j++){
			pokemonCard.appendChild(pokemonCardElements[j]);
		}

		pokemonCardInfo.appendChild(pokemonCard);

		firstGenPokemon.push(pokemonCardInfo)
	}

	for (let i = 0; i < firstGenPokemon.length; i++) renderElement.appendChild(firstGenPokemon[i]);

	pokemons.push(renderElement);
	document.body.appendChild(renderElement);
}

buildCards();
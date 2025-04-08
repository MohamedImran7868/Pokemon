var searchBtn = document.getElementById("search-button");
var pNameField = document.getElementById("pokemon-name");
var pIdField = document.getElementById("pokemon-id");
var weightField = document.getElementById("weight");
var heightField = document.getElementById("height");
var pokemonImage = document.getElementById("image");
var typesField = document.getElementById("types");
var hpField = document.getElementById("hp");
var attackField = document.getElementById("attack");
var defenseField = document.getElementById("defense");
var sAttField = document.getElementById("special-attack");
var sDefField = document.getElementById("special-defense");
var speedField = document.getElementById("speed");

var searchPokemon = () => {
  var searchInput = document.getElementById("search-input").value.toLowerCase();

  pNameField.innerHTML = "";
  pIdField.innerHTML = "";
  weightField.innerHTML = "";
  heightField.innerHTML = "";
  typesField.innerHTML = "";
  pokemonImage.innerHTML = "";
  hpField.innerHTML = "";
  attackField.innerHTML = "";
  defenseField.innerHTML = "";
  sAttField.innerHTML = "";
  sDefField.innerHTML = "";
  speedField.innerHTML = "";

  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
    .then((res) => {
      if (!res.ok) throw new Error("Pokémon not found");
      return res.json();
    })
    .then((data) => {
      pNameField.innerHTML = data.name.toUpperCase();
      pIdField.innerHTML = `#${data.id}`;
      weightField.innerHTML = `Weight: ${data.weight}`;
      heightField.innerHTML = `Height: ${data.height}`;
      hpField.innerHTML = data.stats.find(stat => stat.stat.name === "hp").base_stat;
      attackField.innerHTML = data.stats.find(stat => stat.stat.name === "attack").base_stat;
      defenseField.innerHTML = data.stats.find(stat => stat.stat.name === "defense").base_stat;
      sAttField.innerHTML = data.stats.find(stat => stat.stat.name === "special-attack").base_stat;
      sDefField.innerHTML = data.stats.find(stat => stat.stat.name === "special-defense").base_stat;
      speedField.innerHTML = data.stats.find(stat => stat.stat.name === "speed").base_stat;

      pokemonImage.innerHTML = `
      <img id="sprite" class="sprite" src="${data.sprites.front_default}" alt="${data.name} front">
      <img id="sprite" class="sprite" src="${data.sprites.back_default}" alt="${data.name} back">
    `;

      var types = data.types.map(type => type.type.name);
      types.forEach(type => {
        var typeSpan = document.createElement('span');
        typeSpan.textContent = type.toUpperCase();

        typeSpan.classList.add('type', `type-${type.toLowerCase()}`);

        typesField.appendChild(typeSpan);
      });

    })
    .catch(() => {
      alert("Pokémon not found");
    });
};

searchBtn.addEventListener("click", searchPokemon);

//console.log("Hola Poke API");

// Notesé que también en este caso `min` será incluido y `max` excluido
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

getRandomInt(1, 151);
//console.log(getRandomInt(1, 151));

document.addEventListener("DOMContentLoaded", () => {
  const random = getRandomInt(1, 151);
  //console.log(random)
  fetchData(random);
});

//le pasamos un id como parametro
const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    //crear una constante que se llame pokemon, y que sea de tipo objeto
    const pokemon = {
        img: data.sprites.other.dream_world.front_default,
        nombre: data.species.name,
        id: data.id,
        exp: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        def: data.stats[2].base_stat, 
        esp: data.stats[3].base_stat
    };
    //pintar la card con la data que traemos de la info
    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

//fetchData();


//Pintando en el template
const pintarCard = (pokemon) => {
    console.log(pokemon);
    const flex = document.querySelector('.flex');

    const template = document.querySelector('#template-card').content;

    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    
    clone.querySelector('.card-body-img')
    .setAttribute('src', pokemon.img);
    
    clone.querySelector('.card-body-title')
    .innerHTML = `${pokemon.id} ${pokemon.nombre} <hr><span><center>${pokemon.hp} hp </center></span>`  
   
    clone.querySelector('.card-body-text').textContent = pokemon.exp + ' exp';

    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.esp + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.def + 'K';

    fragment.appendChild(clone);
    flex.appendChild(fragment);

}

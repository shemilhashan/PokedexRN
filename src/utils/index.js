import * as Colors from '../styles/colors';

export function getCardColor(pokemonType) {
  switch (pokemonType) {
    case 'Grass':
      return Colors.grass;

    case 'Fire':
      return Colors.fire;

    case 'Water':
      return Colors.water;

    case 'Electric':
      return Colors.electric;

    case 'Normal':
      return Colors.normal;

    case 'Ice':
      return Colors.ice;

    case 'Fighting':
      return Colors.fighting;

    case 'Poison':
      return Colors.poison;

    case 'Ground':
      return Colors.ground;

    case 'Flying':
      return Colors.flying;

    case 'Psychic':
      return Colors.psychic;

    case 'Bug':
      return Colors.bug;

    case 'Rock':
      return Colors.rock;

    case 'Ghost':
      return Colors.ghost;

    case 'Dragon':
      return Colors.dragon;

    case 'Dark':
      return Colors.dark;

    case 'Steel':
      return Colors.steel;

    case 'Fairy':
      return Colors.fairy;

    default:
      return Colors.grass;
  }
}
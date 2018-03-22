Character.create!([
  {name: "Fiora", character_class_id: 1, hp: 18, loyalty: "player", status: "normal"},
  {name: "Fiorina", character_class_id: 1, hp: 17, loyalty: "player", status: "normal"},
  {name: "Roland", character_class_id: 2, hp: 22, loyalty: "enemy", status: "normal"}
])
CharacterClass.create!([
  {name: "Fighter", can_use_sword: false, can_use_lance: false, can_use_axe: true, can_use_bow: false, can_use_anima: false, can_use_dark_magic: false, can_use_light_magic: false, can_use_staves: false, movement: 6, flying: false},
  {name: "Pegasus Knight", can_use_sword: false, can_use_lance: true, can_use_axe: false, can_use_bow: false, can_use_anima: false, can_use_dark_magic: false, can_use_light_magic: false, can_use_staves: false, movement: 8, flying: true}
])
CharacterStat.create!([
  {character_id: 1, max_hp: 18},
  {character_id: 2, max_hp: 17},
  {character_id: 3, max_hp: 22}
])
TerrainType.create!([
  {name: "water", movement_multiplier: 1, water_tile: true},
  {name: "forest", movement_multiplier: 2, water_tile: false},
  {name: "plains", movement_multiplier: 1, water_tile: false}
])

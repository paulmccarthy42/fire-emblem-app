# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


t = TerrainType.new
t.name = 'plains'
t.water_tile = false
t.movement_multiplier = 1
t.save

t = TerrainType.new
t.name = 'forest'
t.water_tile = false
t.movement_multiplier = 2
t.save

t = TerrainType.new
t.name = 'water'
t.water_tile = true
t.movement_multiplier = 1
t.save
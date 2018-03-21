# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

names = ['plains', 'forest', 'water']

3.times do |x|
  t = TerrainType.new
  t.name = names[x]
  t.water_tile = names[x] == 'water'
  t.movement_multiplier = 1
  t.movement_multiplier *= 2 if names[x] == 'forest'
  t.save
end

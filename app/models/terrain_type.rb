class TerrainType < ApplicationRecord
  has_many :tiles
  
  def as_json
    {
      id: id,
      name: name,
      movement_multiplier: movement_multiplier,
      water_tile: water_tile
      }
  end
end
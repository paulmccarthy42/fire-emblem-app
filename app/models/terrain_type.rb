class TerrainType < ApplicationRecord
  def as_json
    {
      id: id,
      name: name,
      movement_multiplier: movement_multiplier,
      water_tile: water_tile
      }
  end
end
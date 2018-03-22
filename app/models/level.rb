class Level < ApplicationRecord
  has_many :tiles

  def map_layout
    map = []
    tiles.each do |tile|
      map[tile.x_coordinate] = [] if not map[tile.x_coordinate]
      map[tile.x_coordinate][tile.y_coordinate] = tile
    end
    map
  end

  def as_json
    {
      map: map_layout.as_json,
      level: name,
      number: number
    }
  end
end

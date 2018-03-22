class Tile < ApplicationRecord
  belongs_to :terrain_type
  belongs_to :level

  def character
    Character.find_by(id: character_id)
  end

  def as_json
    {
      id: id,
      level_id: level_id,
      x_coordinate: x_coordinate,
      y_coordinate: y_coordinate,
      character: character.as_json,
      terrain: terrain_type.name
    }
  end
end

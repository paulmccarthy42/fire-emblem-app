class Tile < ApplicationRecord
  belongs_to :terrain_type
  belongs_to :level

  def character
    Character.find_by(id: character_id)
  end
end

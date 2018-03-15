class Character < ApplicationRecord
  belongs_to :character_class

  def as_json
    {
      id: id,
      name: name,
      class: character_class.name,
      hp: hp
    }
  end
end

class Character < ApplicationRecord
  belongs_to :character_class
  has_one :character_stat

  def as_json
    {
      id: id,
      name: name,
      class: character_class.name,
      hp: hp,
      max_hp: character_stat.max_hp,
      loyalty: loyalty,
      status: status
    }
  end
end



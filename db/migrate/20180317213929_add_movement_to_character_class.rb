class AddMovementToCharacterClass < ActiveRecord::Migration[5.1]
  def change
    add_column :character_classes, :movement, :integer
    add_column :character_classes, :flying, :boolean
  end
end

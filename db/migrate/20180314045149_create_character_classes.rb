class CreateCharacterClasses < ActiveRecord::Migration[5.1]
  def change
    create_table :character_classes do |t|
      t.string :name
      t.boolean :can_use_sword
      t.boolean :can_use_lance
      t.boolean :can_use_axe
      t.boolean :can_use_bow
      t.boolean :can_use_anima
      t.boolean :can_use_dark_magic
      t.boolean :can_use_light_magic
      t.boolean :can_use_staves
      t.timestamps
    end
  end
end

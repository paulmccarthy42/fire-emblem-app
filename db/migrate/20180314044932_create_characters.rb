class CreateCharacters < ActiveRecord::Migration[5.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :character_class_id
      t.integer :hp
      t.timestamps
    end
  end
end

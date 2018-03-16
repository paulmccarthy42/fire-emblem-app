class CreateCharacterStats < ActiveRecord::Migration[5.1]
  def change
    create_table :character_stats do |t|
      t.integer :character_id
      t.integer :max_hp

      t.timestamps
    end
  end
end

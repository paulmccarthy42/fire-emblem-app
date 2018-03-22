class CreateTiles < ActiveRecord::Migration[5.1]
  def change
    create_table :tiles do |t|
      t.integer :level_id
      t.integer :x_coordinate
      t.integer :y_coordinate
      t.integer :character_id
      t.integer :terrain_type_id

      t.timestamps
    end
  end
end

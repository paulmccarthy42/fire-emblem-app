class CreateTerrainTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :terrain_types do |t|
      t.string :name
      t.integer :movement_multiplier
      t.boolean :water_tile

      t.timestamps
    end
  end
end

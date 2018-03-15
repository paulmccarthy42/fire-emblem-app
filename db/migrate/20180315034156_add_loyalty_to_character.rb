class AddLoyaltyToCharacter < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :loyalty, :string
    add_column :characters, :status, :string
  end
end

class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.string :name, null: false
      t.json :config, null: false
      
      t.timestamps
    end
    
    add_index :profiles, :name, unique: true
  end
end

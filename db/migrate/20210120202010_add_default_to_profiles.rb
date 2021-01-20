class AddDefaultToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :default, :boolean, default: false
    
    add_index :profiles, :default
  end
end

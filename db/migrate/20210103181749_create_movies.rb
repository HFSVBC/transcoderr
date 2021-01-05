class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.integer :radarr_id
      t.string :name, null: false
      t.string :file_location, null: false
      t.integer :profile_id, null: false
      t.json :metadata, null: false
      t.string :poster

      t.timestamps
    end

    add_index :movies, :radarr_id, unique: true
    add_index :movies, :name
    add_foreign_key :movies, :profiles
  end
end

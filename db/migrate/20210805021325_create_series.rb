class CreateSeries < ActiveRecord::Migration[6.1]
  def change
    create_table :series do |t|
      t.integer :sonarr_id
      t.string :name, null: false
      t.string :file_location, null: false
      t.integer :profile_id, null: false
      t.string :poster

      t.timestamps
    end

    add_index :series, :sonarr_id, unique: true
    add_index :series, :name
    add_foreign_key :series, :profiles
  end
end

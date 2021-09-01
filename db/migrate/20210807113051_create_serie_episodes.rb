class CreateSerieEpisodes < ActiveRecord::Migration[6.1]
  def change
    create_table :serie_episodes do |t|
      t.integer :series_id, null: false
      t.integer :sonarr_id
      t.string :name, null: false
      t.string :file_location, null: false
      t.json :metadata, null: false, default: {}

      t.timestamps
    end

    add_index :serie_episodes, :sonarr_id, unique: true
    add_index :serie_episodes, :name

    add_foreign_key :serie_episodes, :series
  end
end

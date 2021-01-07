class CreateActivities < ActiveRecord::Migration[6.1]
  def change
    create_table :activities do |t|
      t.integer :trackable_id, null: false
      t.string :trackable_type, null: false
      t.string :action, null: false
      t.timestamp :finished_at
      t.json :metadata, null: false, default: {}

      t.timestamps
    end

    add_index :activities, [:trackable_type, :trackable_id]
    add_index :activities, [:trackable_type, :trackable_id, :action]
  end
end

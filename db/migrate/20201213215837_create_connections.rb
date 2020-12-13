class CreateConnections < ActiveRecord::Migration[6.0]
  def change
    create_table :connections do |t|
      t.string :name, null: false
      t.string :provider, null: false
      t.string :host, null: false
      t.integer :port, null: false
      t.string :api_key, null: false
      t.boolean :ssl, null: false, default: true

      t.timestamps
    end

    add_index :connections, :name, unique: true
    add_index :connections, :provider
  end
end

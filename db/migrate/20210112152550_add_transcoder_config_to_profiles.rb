class AddTranscoderConfigToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :transcoder_config, :json, null: false, default: {}
  end
end

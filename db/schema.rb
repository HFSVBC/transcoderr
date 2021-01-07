# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_06_230740) do

  create_table "activities", force: :cascade do |t|
    t.integer "trackable_id", null: false
    t.string "trackable_type", null: false
    t.string "action", null: false
    t.datetime "finished_at"
    t.json "metadata", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["trackable_type", "trackable_id", "action"], name: "index_activities_on_trackable_type_and_trackable_id_and_action"
    t.index ["trackable_type", "trackable_id"], name: "index_activities_on_trackable_type_and_trackable_id"
  end

  create_table "connections", force: :cascade do |t|
    t.string "name", null: false
    t.string "provider", null: false
    t.string "host", null: false
    t.integer "port", null: false
    t.string "api_key", null: false
    t.boolean "ssl", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_connections_on_name", unique: true
    t.index ["provider"], name: "index_connections_on_provider", unique: true
  end

  create_table "movies", force: :cascade do |t|
    t.integer "radarr_id"
    t.string "name", null: false
    t.string "file_location", null: false
    t.integer "profile_id", null: false
    t.json "metadata", default: "\"{}\"", null: false
    t.string "poster"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_movies_on_name"
    t.index ["radarr_id"], name: "index_movies_on_radarr_id", unique: true
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name", null: false
    t.json "config", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_profiles_on_name", unique: true
  end

  add_foreign_key "movies", "profiles"
end

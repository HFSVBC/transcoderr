# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_13_215837) do

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
    t.index ["provider"], name: "index_connections_on_provider"
  end

end

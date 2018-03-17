# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180317213929) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_classes", force: :cascade do |t|
    t.string "name"
    t.boolean "can_use_sword"
    t.boolean "can_use_lance"
    t.boolean "can_use_axe"
    t.boolean "can_use_bow"
    t.boolean "can_use_anima"
    t.boolean "can_use_dark_magic"
    t.boolean "can_use_light_magic"
    t.boolean "can_use_staves"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "movement"
    t.boolean "flying"
  end

  create_table "character_stats", force: :cascade do |t|
    t.integer "character_id"
    t.integer "max_hp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.integer "character_class_id"
    t.integer "hp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "loyalty"
    t.string "status"
  end

end

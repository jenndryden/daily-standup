class CreateStandupCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :standup_characters do |t|
      t.string :name, null: false
      t.text :descriptions, null: false
      t.text :instruction, null: false
      t.string :image, default: 'https://i.pinimg.com/originals/a2/aa/29/a2aa2943f28fc91dc8e488fae5c190ca.png'
      t.timestamps
    end
  end
end

class StandupCharacter < ApplicationRecord
  validates :name, presence: true
  validates :descriptions, presence: true
  validates :instruction, presence: true
end

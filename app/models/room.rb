# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :bookings, dependent: :destroy

  validates :name, presence: true, length: { maximum: 255 }
  validates :description, :size, presence: true
end

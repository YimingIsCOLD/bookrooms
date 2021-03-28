# frozen_string_literal: true

class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :user_id, :room_id, presence: true
  validates :date, :start_time, :end_time, presence: true
end

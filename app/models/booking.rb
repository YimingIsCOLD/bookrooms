# frozen_string_literal: true

class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :user_id, :room_id, presence: true
  validates :date, :start_time, :end_time, presence: true

  def as_json(options = nil)
    super(options).merge({
                           start_time: start_time.strftime('%H:%M'),
                           end_time: end_time.strftime('%H:%M')
                         })
  end
end

# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :bookings, dependent: :destroy

  validates :name, presence: true, length: { maximum: 255 }
  validates :description, :seats, presence: true

  def self.available_rooms(params)
    @date = params[:date]
    @start_time = params[:start_time]
    @seats = params[:seats]
    @rooms = Room.select(Room.attribute_names - %w[created_at updated_at]).where(['seats >= ?', @seats])
    @booked_rooms = Room.joins(:bookings).where([
                                                  'bookings.date = ? AND bookings.start_time <= ? AND bookings.end_time >= ?',
                                                  @date, @start_time, @start_time
                                                ]).pluck(:id)
    @rooms.reject { |r| @booked_rooms.include?(r.id) }
  end
end

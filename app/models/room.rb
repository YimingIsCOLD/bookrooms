# frozen_string_literal: true

class Room < ApplicationRecord
  has_many :bookings, dependent: :destroy

  validates :name, presence: true, length: { maximum: 255 }
  validates :description, :seats, presence: true

  def self.available_rooms(params)
    @rooms = Room.select(Room.attribute_names - %w[created_at updated_at]).where(['seats >= ?', params[:seats]])
    @booked_rooms = Room.joins(:bookings).where(bookings: { date: params[:date] }).pluck(:id)
    @rooms.reject { |r| @booked_rooms.include?(r) }
  end
end

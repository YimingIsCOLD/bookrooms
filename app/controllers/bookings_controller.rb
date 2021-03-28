# frozen_string_literal: true

class BookingsController < ApplicationController
  respond_to :json

  def index
    head :ok
  end

  def create
    @booking = Booking.new(booking_params)
    @booking[:user_id] = current_user.id
    @booking.save!
    head :no_content
  end

  private

  def booking_params
    params.require(:booking).permit(:date, :start_time, :end_time, :room_id)
  end
end

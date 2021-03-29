# frozen_string_literal: true

class BookingsController < ApplicationController
  respond_to :json

  def index
    render json: current_user.bookings.where('date >= ?', DateTime.now).includes(:room).to_json(include: [:room],
                                                                                                except: [:room_id])
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
